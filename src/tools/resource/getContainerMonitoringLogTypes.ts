import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { API_APP_STAPE_IO } from "../../constants/api";
import { ContainerMonitoringLogTypeOptionModel } from "../../models/ContainerMonitoringLogTypeOptionModel";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const getContainerMonitoringLogTypes = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_resource_get_container_monitoring_log_types",
    "Gets container monitoring log types as options.",
    {},
    async (): Promise<CallToolResult> => {
      log("Running tool: stape_resource_get_container_monitoring_log_types");

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const response = await httpClient.get<
          ContainerMonitoringLogTypeOptionModel[]
        >("/resources/container-monitoring-log-types");

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get container monitoring log types",
          error,
        );
      }
    },
  );
};
