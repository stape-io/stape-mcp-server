import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { API_APP_STAPE_IO } from "../../constants/api";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { OptionModel } from "../../models/OptionModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const getDomainStatuses = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_resource_get_domain_statuses",
    "Gets domain statuses as options.",
    {},
    async () => {
      log("Running tool: stape_resource_get_domain_statuses");

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const response = await httpClient.get<OptionModel[]>(
          "/resources/domain-statuses",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse("Failed to get domain statuses", error);
      }
    },
  );
};
