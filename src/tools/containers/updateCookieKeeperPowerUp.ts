import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ContainerCookieKeeperFormType2Schema } from "../../schemas/ContainerCookieKeeperFormType2Schema";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const updateCookieKeeperPowerUp = (server: McpServer): void =>
  server.tool(
    "containers_update_cookie_keeper_power_up",
    "Updates the cookie keeper power-up activation state and options for a container.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
      isActive: z
        .boolean()
        .describe("Whether the cookie keeper power-up is active."),
      ...ContainerCookieKeeperFormType2Schema.shape,
    },
    async ({ identifier, userWorkspaceIdentifier, isActive, ...options }) => {
      log("Running tool: containers_update_cookie_keeper_power_up");

      try {
        const response = await httpClient.patch(
          `/containers/${identifier}/power-ups/cookie-keeper`,
          JSON.stringify({ isActive, options }),
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
          "Failed to patch cookie keeper power-up (containers_update_cookie_keeper_power_up)",
          error,
        );
      }
    },
  );
