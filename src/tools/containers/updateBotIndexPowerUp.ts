import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const updateBotIndexPowerUp = (server: McpServer): void =>
  server.tool(
    "containers_update_bot_index_power_up",
    "Enables or disables the bot-index power-up for a container. This endpoint allows you to control bot indexing features for the specified container.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
      isActive: z
        .boolean()
        .describe("Whether the bot-index power-up is active."),
    },
    async ({ identifier, userWorkspaceIdentifier, isActive }) => {
      log("Running tool: containers_update_bot_index_power_up");

      try {
        const response = await httpClient.patch(
          `/containers/${identifier}/power-ups/bot-index`,
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
          "Failed to patch bot-index power-up (containers_update_bot_index_power_up)",
          error,
        );
      }
    },
  );
