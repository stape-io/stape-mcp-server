import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { Container2Model } from "../../models/Container2Model";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { SubscriptionCancelReasonSchema } from "../../models/SubscriptionCancelReasonSchema";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const updateContainerCancelSubscription = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_containers_resources_update_cancel_subscription",
    "Update (cancel) a container subscription. Use this endpoint to cancel a container's subscription by providing detailed cancellation reasons and context in the request body.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
      ...SubscriptionCancelReasonSchema.shape,
    },
    async ({ identifier, userWorkspaceIdentifier, ...body }) => {
      log(
        `Running tool: containers_resources_update_cancel_subscription for identifier ${identifier}`,
      );

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const response = await httpClient.put<Container2Model>(
          `/containers/${encodeURIComponent(identifier)}/cancel-subscription`,
          JSON.stringify({ cancelReason: body }),
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
          "Failed to cancel container subscription (containers_resources_update_cancel_subscription)",
          error,
        );
      }
    },
  );
};
