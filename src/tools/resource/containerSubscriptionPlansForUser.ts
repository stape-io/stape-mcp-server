import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { ContainerPlanOptionModel } from "../../models/ContainerPlanOptionModel";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const containerSubscriptionPlansForUser = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_resource_container_subscription_plans_for_user",
    "Gets list of container subscription plans for the user",
    {
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier"),
    },
    async ({ userWorkspaceIdentifier }): Promise<CallToolResult> => {
      log(
        `Running tool: stape_resource_container_subscription_plans_for_user for account ${userWorkspaceIdentifier}`,
      );

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const response = await httpClient.get<ContainerPlanOptionModel>(
          "/resources/container-subscription-plans-for-user",
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
          "Failed to get resource_container_subscription_plans_for_user tool data",
          error,
        );
      }
    },
  );
};
