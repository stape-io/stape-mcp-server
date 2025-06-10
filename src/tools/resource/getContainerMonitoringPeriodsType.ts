import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { API_APP_STAPE_IO } from "../../constants/api";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { OptionModel } from "../../models/OptionModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const getContainerMonitoringPeriodsType = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_resource_get_container_monitoring_periods_type",
    "Gets container monitoring periods type as options.",
    {},
    async (): Promise<CallToolResult> => {
      log("Running tool: stape_resource_get_container_monitoring_periods_type");

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const response = await httpClient.get<OptionModel[]>(
          "/resources/container-monitoring-periods-type",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get container monitoring periods type",
          error,
        );
      }
    },
  );
};
