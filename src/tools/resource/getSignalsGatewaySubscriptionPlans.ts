import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SignalsGatewayPlanOptionModel } from "../../models/SignalsGatewayPlanOptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getSignalsGatewaySubscriptionPlans = (server: McpServer): void =>
  server.tool(
    "resource_get_signals_gateway_subscription_plans",
    "Gets signals gateway subscription plans as options.",
    {},
    async () => {
      log("Running tool: resource_get_signals_gateway_subscription_plans");

      try {
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
