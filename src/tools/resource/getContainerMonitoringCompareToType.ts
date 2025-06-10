import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { API_APP_STAPE_IO } from "../../constants/api";
import { ContainerMonitoringCompareToTypeOptionModel } from "../../models/ContainerMonitoringCompareToTypeOptionModel";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const getContainerMonitoringCompareToType = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_resource_get_container_monitoring_compare_to_type",
    "Gets container monitoring compare-to type as options.",
    {},
    async (): Promise<CallToolResult> => {
      log("Running tool: stape_resource_get_container_monitoring_compare_to_type");

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const response = await httpClient.get<
          ContainerMonitoringCompareToTypeOptionModel[]
        >("/resources/container-monitoring-compare-to-type");

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get container monitoring compare-to type",
          error,
        );
      }
    },
  );
};
