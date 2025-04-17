import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StapeClient } from "../utils/stape-client";
import { createErrorResponse } from "../utils";
import { z } from "zod";

export function registerContainersTool(server: McpServer): void {
  // List containers
  server.tool("listContainers", {}, async () => {
    try {
      const client = new StapeClient();
      const containers = await client.getContainers();
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              containers.map((container) => ({
                id: container.id,
                name: container.name,
                type: container.type,
                status: container.status,
                zone: container.zone,
              })),
              null,
              2,
            ),
          },
        ],
      };
    } catch (error) {
      return createErrorResponse("Failed to list containers", error);
    }
  });

  // Create container
  server.tool(
    "createContainer",
    {
      name: z.string().min(1),
      type: z.string().min(1),
      zone: z.string().min(1),
      code: z.string().optional(),
    },
    async ({ name, type, zone, code }) => {
      try {
        const client = new StapeClient();
        const container = await client.createContainer({
          name,
          type,
          zone,
          code,
        });
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  id: container.id,
                  name: container.name,
                  type: container.type,
                  status: container.status,
                  zone: container.zone,
                },
                null,
                2,
              ),
            },
          ],
        };
      } catch (error) {
        return createErrorResponse("Failed to create container", error);
      }
    },
  );

  // Delete container
  server.tool(
    "deleteContainer",
    {
      containerId: z.string().min(1),
    },
    async ({ containerId }) => {
      try {
        const client = new StapeClient();
        await client.deleteContainer(containerId);
        return {
          content: [
            {
              type: "text",
              text: `Container ${containerId} deleted successfully`,
            },
          ],
        };
      } catch (error) {
        return createErrorResponse("Failed to delete container", error);
      }
    },
  );
}
