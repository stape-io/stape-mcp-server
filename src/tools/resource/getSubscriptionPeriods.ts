import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { API_APP_STAPE_IO } from "../../constants/api";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { OptionModel } from "../../models/OptionModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const getSubscriptionPeriods = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_resource_get_subscription_periods",
    "Gets subscription periods as options.",
    {},
    async () => {
      log("Running tool: stape_resource_get_subscription_periods");

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const response = await httpClient.get<OptionModel[]>(
          "/resources/subscription-periods",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse("Failed to get subscription periods", error);
      }
    },
  );
};
