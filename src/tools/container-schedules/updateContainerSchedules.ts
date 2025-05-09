import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ContainerScheduleFormTypeSchema } from "../../schemas/ContainerScheduleFormTypeSchema";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const updateContainerSchedules = (server: McpServer): void =>
  server.tool(
    "container_schedules_update",
    "Replaces all schedules for a container. This endpoint allows you to update the full schedule list for the specified container.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
      containerSchedules: z
        .array(ContainerScheduleFormTypeSchema)
        .optional()
        .describe("Array of schedule configuration objects."),
    },
    async ({ identifier, userWorkspaceIdentifier, containerSchedules }) => {
      log("Running tool: container_schedules_update");

      try {
        const response = await httpClient.put(
          `/containers/${identifier}/schedules`,
          JSON.stringify({ containerSchedules }),
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
          "Failed to update container schedules (container_schedules_update)",
          error,
        );
      }
    },
  );
