import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { API_APP_STAPE_IO } from "../../constants/api";
import { ContainerPlanOptionModel } from "../../models/ContainerPlanOptionModel";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const getContainerSubscriptionPlans = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_resource_get_container_subscription_plans",
    "Gets container subscription plans.",
    {},
    async (): Promise<CallToolResult> => {
      log("Running tool: stape_resource_get_container_subscription_plans");

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const response = await httpClient.get<ContainerPlanOptionModel[]>(
          "/resources/container-subscription-plans",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get container subscription plans",
          error,
        );
      }
    },
  );
};
