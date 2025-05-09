import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ContainerSubscriptionChangePlanFormTypeSchema } from "../../models/ContainerSubscriptionChangePlanFormTypeSchema";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const createContainerPaddleTransaction = (server: McpServer): void =>
  server.tool(
    "containers_resources_create_paddle_transaction",
    "Creates a new Paddle transaction for a container subscription. Use this endpoint to change the plan, period, promo code, or auto-upgrade status for a container. The parameters must specify the desired plan, period, optional promo code, and autoUpgrade flag. Useful for managing subscription changes and upgrades for containers.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
      ...ContainerSubscriptionChangePlanFormTypeSchema.shape,
    },
    async ({ identifier, userWorkspaceIdentifier, ...body }) => {
      log(
        `Running tool: containers_resources_create_paddle_transaction for identifier ${identifier}`,
      );
      try {
        const response = await httpClient.post<unknown>(
          `/containers/${encodeURIComponent(identifier)}/paddle/transactions`,
          JSON.stringify(body),
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
          "Failed to create Paddle transaction (containers_resources_create_paddle_transaction)",
          error,
        );
      }
    },
  );
