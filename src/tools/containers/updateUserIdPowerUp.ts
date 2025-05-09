import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const updateUserIdPowerUp = (server: McpServer): void =>
  server.tool(
    "containers_update_user_id_power_up",
    "Enables or disables the user-id power-up for a container. This endpoint allows you to control whether user ID features are active for the specified container.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
      isActive: z.boolean().describe("Whether the user-id power-up is active."),
    },
    async ({ identifier, userWorkspaceIdentifier, isActive }) => {
      log("Running tool: containers_update_user_id_power_up");

      try {
        const response = await httpClient.patch(
          `/containers/${identifier}/power-ups/user-id`,
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
          "Failed to patch user-id power-up (containers_update_user_id_power_up)",
          error,
        );
      }
    },
  );
