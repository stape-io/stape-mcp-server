import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const createContainerPaddleCompleteTransactions = (
  server: McpServer,
): void =>
  server.tool(
    "containers_resources_create_paddle_complete_transactions",
    "Completes pending Paddle transactions for a container. Use this endpoint to finalize payment transactions for the specified container, typically after a payment method change or approval.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
    },
    async ({ identifier, userWorkspaceIdentifier }) => {
      log(
        `Running tool: containers_resources_create_paddle_complete_transactions for identifier ${identifier}`,
      );

      try {
        const response = await httpClient.post<unknown>(
          `/containers/${encodeURIComponent(identifier)}/paddle/complete-transactions`,
          undefined,
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
          "Failed to complete Paddle transactions (containers_resources_create_paddle_complete_transactions)",
          error,
        );
      }
    },
  );
