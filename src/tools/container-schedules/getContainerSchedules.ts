import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ContainerScheduleModel } from "../../models/ContainerScheduleModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getContainerSchedules = (server: McpServer): void =>
  server.tool(
    "container_schedules_get",
    "Fetches all schedules for a container.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
    },
    async ({ identifier, userWorkspaceIdentifier }) => {
      log("Running tool: container_schedules_get");

      try {
        const response = await httpClient.get<ContainerScheduleModel[]>(
          `/containers/${identifier}/schedules`,
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
          "Failed to get container schedules (container_schedules_get)",
          error,
        );
      }
    },
  );
