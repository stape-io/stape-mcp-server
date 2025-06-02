import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { API_APP_STAPE_IO } from "../../constants/api";
import { GatewayPlanOptionModel } from "../../models/GatewayPlanOptionModel";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const getCapiGatewaySubscriptionPlans = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_resource_get_capi_gateway_subscription_plans",
    "Gets CAPI gateway subscription plans.",
    {},
    async (): Promise<CallToolResult> => {
      log("Running tool: stape_resource_get_capi_gateway_subscription_plans");

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const response = await httpClient.get<GatewayPlanOptionModel[]>(
          "/resources/capi-gateway-subscription-plans",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get CAPI gateway subscription plans",
          error,
        );
      }
    },
  );
};
