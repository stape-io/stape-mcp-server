import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const updateServiceAccountPowerUp = (server: McpServer): void =>
  server.tool(
    "containers_update_service_account_power_up",
    "Updates the service account power-up activation state and options for a container.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
      isActive: z
        .boolean()
        .describe("Whether the service account power-up is active."),
      options: z
        .string()
        .optional()
        .describe("Service account power-up options."),
    },
    async ({ identifier, userWorkspaceIdentifier, isActive, options }) => {
      log("Running tool: containers_update_service_account_power_up");

      try {
        const response = await httpClient.patch(
          `/containers/${identifier}/power-ups/service-account`,
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
          "Failed to patch service account power-up (containers_update_service_account_power_up)",
          error,
        );
      }
    },
  );
