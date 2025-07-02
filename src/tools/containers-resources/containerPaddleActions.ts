import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { ContainerSubscriptionChangePlanFormTypeSchema } from "../../models/ContainerSubscriptionChangePlanFormTypeSchema";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const containerPaddleActions = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_container_paddle_actions",
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
      completeTransactionsConfig: z
        .object({
          transactionIds: z
            .array(z.string())
            .describe("Array of transaction IDs to complete."),
        })
        .optional()
        .describe(
          "Complete transactions configuration. Required when action is 'complete_transactions'.",
        ),
      retryChargeConfig: z
        .object({
          transactionId: z.string().describe("Transaction ID to retry."),
        })
        .optional()
        .describe(
          "Retry charge configuration. Required when action is 'retry_charge'.",
        ),
    },
    async ({
      action,
      identifier,
      userWorkspaceIdentifier,
      transactionConfig,
      completeTransactionsConfig,
      retryChargeConfig,
    }): Promise<CallToolResult> => {
      log(`Running tool: container_paddle_manager - action: ${action}`);

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
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
            if (!completeTransactionsConfig) {
              throw new Error(
                `completeTransactionsConfig is required for ${action} action`,
              );
            }

            const response = await httpClient.post<unknown>(
              `/containers/${encodeURIComponent(identifier)}/paddle/complete-transactions`,
              JSON.stringify({
                transactionIds: completeTransactionsConfig.transactionIds,
              }),
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
            if (!retryChargeConfig) {
              throw new Error(
                `retryChargeConfig is required for ${action} action`,
              );
            }

            const response = await httpClient.post<unknown>(
              `/containers/${encodeURIComponent(identifier)}/retry-charge`,
              JSON.stringify({
                transactionId: retryChargeConfig.transactionId,
              }),
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
