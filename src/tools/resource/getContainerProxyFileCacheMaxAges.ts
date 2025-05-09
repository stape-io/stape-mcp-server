import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { OptionModel } from "../../models/OptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getContainerProxyFileCacheMaxAges = (server: McpServer): void =>
  server.tool(
    "resource_get_container_proxy_file_cache_max_ages",
    "Gets container proxy file cache max ages as options.",
    {},
    async (): Promise<CallToolResult> => {
      log("Running tool: resource_get_container_proxy_file_cache_max_ages");

      try {
        const response = await httpClient.get<OptionModel[]>(
          "/resources/container-proxy-file-cache-max-ages",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get container proxy file cache max ages",
          error,
        );
      }
    },
  );
