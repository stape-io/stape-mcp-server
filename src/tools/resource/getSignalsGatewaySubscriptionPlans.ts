import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { API_APP_STAPE_IO } from "../../constants/api";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { SignalsGatewayPlanOptionModel } from "../../models/SignalsGatewayPlanOptionModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const getSignalsGatewaySubscriptionPlans = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_resource_get_signals_gateway_subscription_plans",
    "Gets signals gateway subscription plans as options.",
    {},
    async () => {
      log("Running tool: stape_resource_get_signals_gateway_subscription_plans");

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const response = await httpClient.get<SignalsGatewayPlanOptionModel[]>(
          "/resources/signals-gateway-subscription-plans",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get signals gateway subscription plans",
          error,
        );
      }
    },
  );
};
