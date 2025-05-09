import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { OptionModel } from "../../models/OptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getContainerScheduleTypes = (server: McpServer): void =>
  server.tool(
    "resource_get_container_schedule_types",
    "Gets container schedule types as options.",
    {},
    async (): Promise<CallToolResult> => {
      log("Running tool: resource_get_container_schedule_types");

      try {
        const response = await httpClient.get<OptionModel[]>(
          "/resources/container-schedule-types",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get container schedule types",
          error,
        );
      }
    },
  );
