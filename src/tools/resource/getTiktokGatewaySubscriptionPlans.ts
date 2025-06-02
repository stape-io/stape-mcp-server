import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { API_APP_STAPE_IO } from "../../constants/api";
import { GatewayPlanOptionModel } from "../../models/GatewayPlanOptionModel";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const getTiktokGatewaySubscriptionPlans = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_resource_get_tiktok_gateway_subscription_plans",
    "Gets tiktok gateway subscription plans as options.",
    {},
    async () => {
      log("Running tool: stape_resource_get_tiktok_gateway_subscription_plans");

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const response = await httpClient.get<GatewayPlanOptionModel[]>(
          "/resources/tiktok-gateway-subscription-plans",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get tiktok gateway subscription plans",
          error,
        );
      }
    },
  );
};
