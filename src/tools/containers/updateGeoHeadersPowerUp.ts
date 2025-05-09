import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const updateGeoHeadersPowerUp = (server: McpServer): void =>
  server.tool(
    "containers_update_geo_headers_power_up",
    "Updates the geo-headers power-up activation state for a container.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
      isActive: z
        .boolean()
        .describe("Whether the geo-headers power-up is active."),
    },
    async ({ identifier, userWorkspaceIdentifier, isActive }) => {
      log("Running tool: containers_update_geo_headers_power_up");

      try {
        const response = await httpClient.patch(
          `/containers/${identifier}/power-ups/geo-headers`,
          JSON.stringify({ isActive }),
          {
            headers: userWorkspaceIdentifier
              ? { "X-WORKSPACE": userWorkspaceIdentifier }
              : undefined,
          },
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to patch geo-headers power-up (containers_update_geo_headers_power_up)",
          error,
        );
      }
    },
  );
