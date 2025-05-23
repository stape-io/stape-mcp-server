import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const updateRequestDelayPowerUp = (server: McpServer): void =>
  server.tool(
    "containers_update_request_delay_power_up",
    "Enables or disables the request-delay power-up for a container. This endpoint allows you to control request delay features for the specified container.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
      isActive: z
        .boolean()
        .describe("Whether the request-delay power-up is active."),
    },
    async ({ identifier, userWorkspaceIdentifier, isActive }) => {
      log("Running tool: containers_update_request_delay_power_up");

      try {
        const response = await httpClient.patch(
          `/containers/${identifier}/power-ups/request-delay`,
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
          "Failed to patch request-delay power-up (containers_update_request_delay_power_up)",
          error,
        );
      }
    },
  );
