import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getContainerPaddlePaymentMethodTransactions = (
  server: McpServer,
): void =>
  server.tool(
    "containers_resources_get_paddle_payment_method_transactions",
    "Get transaction to change payment method",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
    },
    async ({ identifier, userWorkspaceIdentifier }) => {
      log(
        `Running tool: containers_resources_get_paddle_payment_method_transactions for identifier ${identifier}`,
      );

      try {
        const response = await httpClient.get<unknown>(
          `/containers/${encodeURIComponent(identifier)}/paddle/payment-method-transactions`,
          {
            headers: userWorkspaceIdentifier
              ? { "X-WORKSPACE": userWorkspaceIdentifier }
              : undefined,
          },
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get Paddle payment method transactions (containers_resources_get_paddle_payment_method_transactions)",
          error,
        );
      }
    },
  );
