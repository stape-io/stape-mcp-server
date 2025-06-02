import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { API_APP_STAPE_IO } from "../../constants/api";
import { CancelReasonModel } from "../../models/CancelReasonModel";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const getSubscriptionCancelReasons = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_resource_get_subscription_cancel_reasons",
    "Gets subscription cancel reasons.",
    {},
    async () => {
      log("Running tool: stape_resource_get_subscription_cancel_reasons");

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const response = await httpClient.get<CancelReasonModel[]>(
          "/resources/subscription-cancel-reasons",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get subscription cancel reasons",
          error,
        );
      }
    },
  );
};
