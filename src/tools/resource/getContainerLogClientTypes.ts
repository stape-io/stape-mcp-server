import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { ContainerLogClientTypeOptionModel } from "../../models/ContainerLogClientTypeOptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getContainerLogClientTypes = (server: McpServer): void =>
  server.tool(
    "resource_get_container_log_client_types",
    "Gets container log client types as options.",
    {},
    async (): Promise<CallToolResult> => {
      log("Running tool: resource_get_container_log_client_types");

      try {
        const response = await httpClient.get<
          ContainerLogClientTypeOptionModel[]
        >("/resources/container-log-client-types");

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get container log client types",
          error,
        );
      }
    },
  );
