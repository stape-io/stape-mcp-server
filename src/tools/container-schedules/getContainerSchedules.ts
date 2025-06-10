import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { ContainerScheduleModel } from "../../models/ContainerScheduleModel";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const getContainerSchedules = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_container_schedules_get",
    "Fetches all schedules for a container.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
    },
    async ({ identifier, userWorkspaceIdentifier }) => {
      log("Running tool: stape_container_schedules_get");

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
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
};
