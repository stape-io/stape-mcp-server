import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { SignalsGatewayPlanOptionModel } from "../../models/SignalsGatewayPlanOptionModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const signalsGatewaySubscriptionPlansForUser = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_resource_signals_gateway_subscription_plans_for_user",
    "Gets list of signals gateway subscription plans for the user",
    {
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier"),
    },
    async ({ userWorkspaceIdentifier }): Promise<CallToolResult> => {
      log(
        `Running tool: stape_resource_signals_gateway_subscription_plans_for_user for account ${userWorkspaceIdentifier}`,
      );

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const response = await httpClient.get<SignalsGatewayPlanOptionModel[]>(
          "/resources/signals-gateway-subscription-plans-for-user",
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
          "Failed to get resource_signals_gateway_subscription_plans_for_user tool data",
          error,
        );
      }
    },
  );
};
