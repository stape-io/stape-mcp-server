import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { ContainerZoneOptionModel } from "../../models/ContainerZoneOptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getContainerZones = (server: McpServer): void =>
  server.tool(
    "resource_get_container_zones",
    "Gets container zones as options.",
    {},
    async (): Promise<CallToolResult> => {
      log("Running tool: resource_get_container_zones");

      try {
        const response = await httpClient.get<ContainerZoneOptionModel[]>(
          "/resources/container-zones",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse("Failed to get container zones", error);
      }
    },
  );
