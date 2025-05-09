import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { OptionModel } from "../../models/OptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getContainerStatuses = (server: McpServer): void =>
  server.tool(
    "resource_get_container_statuses",
    "Gets container statuses as options.",
    {},
    async (): Promise<CallToolResult> => {
      log("Running tool: resource_get_container_statuses");

      try {
        const response = await httpClient.get<OptionModel[]>(
          "/resources/container-statuses",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse("Failed to get container statuses", error);
      }
    },
  );
