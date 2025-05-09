import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { ContainerMonitoringCompareToTypeOptionModel } from "../../models/ContainerMonitoringCompareToTypeOptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getContainerMonitoringCompareToType = (server: McpServer): void =>
  server.tool(
    "resource_get_container_monitoring_compare_to_type",
    "Gets container monitoring compare-to type as options.",
    {},
    async (): Promise<CallToolResult> => {
      log("Running tool: resource_get_container_monitoring_compare_to_type");

      try {
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
