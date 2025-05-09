import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { OptionModel } from "../../models/OptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getContainerCookieKeeperOptions = (server: McpServer): void =>
  server.tool(
    "resource_get_container_cookie_keeper_options",
    "Gets container cookie keeper options as options.",
    {},
    async (): Promise<CallToolResult> => {
      log("Running tool: resource_get_container_cookie_keeper_options");

      try {
        const response = await httpClient.get<OptionModel[]>(
          "/resources/container-cookie-keeper-options",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get container cookie keeper options",
          error,
        );
      }
    },
  );
