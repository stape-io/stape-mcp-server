import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { OptionModel } from "../../models/OptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getContainerMonitoringPeriodsType = (server: McpServer): void =>
  server.tool(
    "resource_get_container_monitoring_periods_type",
    "Gets container monitoring periods type as options.",
    {},
    async (): Promise<CallToolResult> => {
      log("Running tool: resource_get_container_monitoring_periods_type");

      try {
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
