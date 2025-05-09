import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { GatewayPlanOptionModel } from "../../models/GatewayPlanOptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getTiktokGatewaySubscriptionPlans = (server: McpServer): void =>
  server.tool(
    "resource_get_tiktok_gateway_subscription_plans",
    "Gets tiktok gateway subscription plans as options.",
    {},
    async () => {
      log("Running tool: resource_get_tiktok_gateway_subscription_plans");

      try {
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
