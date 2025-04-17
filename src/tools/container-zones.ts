import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StapeClient } from "../utils/stape-client";
import { createErrorResponse } from "../utils";

export function registerContainerZonesTool(server: McpServer): void {
  server.tool("listContainerZones", {}, async () => {
    try {
      const client = new StapeClient();
      const zones = await client.getContainerZones();
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              zones.map((zone) => ({
                label: zone.label,
                type: zone.type,
                defaultDomain: zone.defaultDomain,
                loadDomain: zone.loadDomain,
                cdnAvailable: zone.cdnAvailable,
              })),
              null,
              2,
            ),
          },
        ],
      };
    } catch (error) {
      return createErrorResponse("Failed to list container zones", error);
    }
  });
}
