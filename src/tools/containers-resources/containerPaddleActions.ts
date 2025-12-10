import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { ContainerSubscriptionChangePlanFormTypeSchema } from "../../schemas/ContainerSubscriptionChangePlanFormTypeSchema";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const containerPaddleActions = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_container_paddle",
    "Comprehensive tool for managing Paddle transactions for containers. Supports creating Paddle transactions, completing transactions, getting payment method transactions, and retrying charges. Use the 'action' parameter to specify the operation.",
    {
      action: z
        .enum([
          "create_transaction",
          "complete_transactions",
          "get_payment_method_transactions",
          "retry_charge",
        ])
        .describe(
          "The action to perform: 'create_transaction' to create a new Paddle transaction, 'complete_transactions' to complete Paddle transactions, 'get_payment_method_transactions' to get payment method transactions, or 'retry_charge' to retry a charge.",
        ),
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The unique user workspace identifier."),
      transactionConfig:
        ContainerSubscriptionChangePlanFormTypeSchema.optional().describe(
          "Transaction configuration. Required when action is 'create_transaction'.",
        ),
    },
    async ({
      action,
      identifier,
      userWorkspaceIdentifier,
      transactionConfig,
    }): Promise<CallToolResult> => {
      log(`Running tool: stape_container_paddle - action: ${action}`);

      try {
        const httpClient = new HttpClient(props.apiBaseUrl, props.apiKey);
        const headers = userWorkspaceIdentifier
          ? { "X-WORKSPACE": userWorkspaceIdentifier }
          : undefined;

        switch (action) {
          case "create_transaction": {
            if (!transactionConfig) {
              throw new Error(
                "transactionConfig is required for create_transaction action",
              );
            }

            const response = await httpClient.post<unknown>(
              `/containers/${encodeURIComponent(identifier)}/paddle/transactions`,
              JSON.stringify(transactionConfig),
              { headers },
            );

            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }

          case "complete_transactions": {
            const response = await httpClient.post<unknown>(
              `/containers/${encodeURIComponent(identifier)}/paddle/complete-transactions`,
              undefined,
              { headers },
            );

            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }

          case "get_payment_method_transactions": {
            const response = await httpClient.get<unknown>(
              `/containers/${encodeURIComponent(identifier)}/paddle/payment-method-transactions`,
              { headers },
            );

            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }

          case "retry_charge": {
            const response = await httpClient.post<unknown>(
              `/containers/${encodeURIComponent(identifier)}/retry-charge`,
              undefined,
              { headers },
            );

            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }

          default:
            throw new Error(`Unknown action: ${action}`);
        }
      } catch (error) {
        return createErrorResponse(
          `Failed to perform container Paddle operation: ${action}`,
          error,
        );
      }
    },
  );
};
