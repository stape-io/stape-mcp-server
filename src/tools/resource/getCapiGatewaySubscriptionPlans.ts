import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { GatewayPlanOptionModel } from "../../models/GatewayPlanOptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getCapiGatewaySubscriptionPlans = (server: McpServer): void =>
  server.tool(
    "resource_get_capi_gateway_subscription_plans",
    "Gets CAPI gateway subscription plans.",
    {},
    async (): Promise<CallToolResult> => {
      log("Running tool: resource_get_capi_gateway_subscription_plans");

      try {
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
