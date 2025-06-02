import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { ContainerSubscriptionChangePlanFormTypeSchema } from "../../models/ContainerSubscriptionChangePlanFormTypeSchema";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const createContainerPaddleTransaction = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_containers_resources_create_paddle_transaction",
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
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
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
};
