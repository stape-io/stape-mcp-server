import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StapeGatewayPlanOptionModel } from "../../models/StapeGatewayPlanOptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getStapeGatewaySubscriptionPlans = (server: McpServer): void =>
  server.tool(
    "resource_get_stape_gateway_subscription_plans",
    "Gets stape gateway subscription plans as options.",
    {},
    async () => {
      log("Running tool: resource_get_stape_gateway_subscription_plans");

      try {
        const response = await httpClient.get<StapeGatewayPlanOptionModel[]>(
          "/resources/stape-gateway-subscription-plans",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get stape gateway subscription plans",
          error,
        );
      }
    },
  );
