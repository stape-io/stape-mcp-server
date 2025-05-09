import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const updateBotDetectionPowerUp = (server: McpServer): void =>
  server.tool(
    "containers_update_bot_detection_power_up",
    "Enables or disables the bot-detection power-up for a container. This endpoint allows you to control bot detection features for the specified container.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
      isActive: z
        .boolean()
        .describe("Whether the bot-detection power-up is active."),
    },
    async ({ identifier, userWorkspaceIdentifier, isActive }) => {
      log("Running tool: containers_update_bot_detection_power_up");

      try {
        const response = await httpClient.patch(
          `/containers/${identifier}/power-ups/bot-detection`,
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
          "Failed to patch bot-detection power-up (containers_update_bot_detection_power_up)",
          error,
        );
      }
    },
  );
