import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ContainerScheduleFormTypeSchema } from "../../schemas/ContainerScheduleFormTypeSchema";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const updateSchedulePowerUp = (server: McpServer): void =>
  server.tool(
    "containers_update_schedule_power_up",
    "Enables or disables the schedule power-up for a container. This endpoint allows you to control scheduled operations for the specified container.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
      isActive: z
        .boolean()
        .describe("Whether the schedule power-up is active."),
      options: z
        .array(ContainerScheduleFormTypeSchema)
        .optional()
        .describe("Array of schedule configuration objects."),
    },
    async ({ identifier, userWorkspaceIdentifier, isActive, options }) => {
      log("Running tool: containers_update_schedule_power_up");

      try {
        const response = await httpClient.patch(
          `/containers/${identifier}/power-ups/schedule`,
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
          "Failed to patch schedule power-up (containers_update_schedule_power_up)",
          error,
        );
      }
    },
  );
