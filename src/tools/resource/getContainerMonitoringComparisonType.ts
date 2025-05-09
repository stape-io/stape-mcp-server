import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { ContainerMonitoringComparisonTypeOptionModel } from "../../models/ContainerMonitoringComparisonTypeOptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getContainerMonitoringComparisonType = (server: McpServer): void =>
  server.tool(
    "resource_get_container_monitoring_comparison_type",
    "Gets container monitoring comparison type as options.",
    {},
    async (): Promise<CallToolResult> => {
      log("Running tool: resource_get_container_monitoring_comparison_type");

      try {
        const response = await httpClient.get<
          ContainerMonitoringComparisonTypeOptionModel[]
        >("/resources/container-monitoring-comparison-type");

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get container monitoring comparison type",
          error,
        );
      }
    },
  );
