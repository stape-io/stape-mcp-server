import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { ContainerMonitoringLogTypeOptionModel } from "../../models/ContainerMonitoringLogTypeOptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getContainerMonitoringLogTypes = (server: McpServer): void =>
  server.tool(
    "resource_get_container_monitoring_log_types",
    "Gets container monitoring log types as options.",
    {},
    async (): Promise<CallToolResult> => {
      log("Running tool: resource_get_container_monitoring_log_types");

      try {
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
