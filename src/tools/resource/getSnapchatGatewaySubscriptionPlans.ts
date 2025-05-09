import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { GatewayPlanOptionModel } from "../../models/GatewayPlanOptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getSnapchatGatewaySubscriptionPlans = (server: McpServer): void =>
  server.tool(
    "resource_get_snapchat_gateway_subscription_plans",
    "Gets snapchat gateway subscription plans as options.",
    {},
    async () => {
      log("Running tool: resource_get_snapchat_gateway_subscription_plans");

      try {
        const response = await httpClient.get<GatewayPlanOptionModel[]>(
          "/resources/snapchat-gateway-subscription-plans",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get snapchat gateway subscription plans",
          error,
        );
      }
    },
  );
