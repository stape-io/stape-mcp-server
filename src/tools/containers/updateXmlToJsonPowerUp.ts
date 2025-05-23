import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const updateXmlToJsonPowerUp = (server: McpServer): void =>
  server.tool(
    "containers_update_xml_to_json_power_up",
    "Enables or disables the xml-to-json power-up for a container. This endpoint allows you to control XML-to-JSON conversion features and configure proxied files for the specified container.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
      isActive: z
        .boolean()
        .describe("Whether the xml-to-json power-up is active."),
    },
    async ({ identifier, userWorkspaceIdentifier, isActive }) => {
      log("Running tool: containers_update_xml_to_json_power_up");

      try {
        const response = await httpClient.patch(
          `/containers/${identifier}/power-ups/xml-to-json`,
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
          "Failed to patch xml-to-json power-up (containers_update_xml_to_json_power_up)",
          error,
        );
      }
    },
  );
