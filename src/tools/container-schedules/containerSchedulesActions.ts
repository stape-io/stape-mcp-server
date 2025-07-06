import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { ContainerScheduleModel } from "../../models/ContainerScheduleModel";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { ContainerScheduleFormTypeSchema } from "../../schemas/ContainerScheduleFormTypeSchema";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const containerSchedulesActions = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_container_schedules",
    "Comprehensive tool for managing container schedules. Supports getting all schedules and updating/replacing all schedules for a container. Use the 'action' parameter to specify the operation: 'get' or 'update'.",
    {
      action: z
        .enum(["get", "update"])
        .describe(
          "The action to perform: 'get' to retrieve all schedules, or 'update' to replace all schedules.",
        ),
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The unique user workspace identifier."),
      schedulesConfig: z
        .object({
          containerSchedules: z
            .array(ContainerScheduleFormTypeSchema)
            .describe("Array of schedule configuration objects."),
        })
        .optional()
        .describe(
          "Schedule configuration for updating schedules. Required when action is 'update'.",
        ),
    },
    async ({
      action,
      identifier,
      userWorkspaceIdentifier,
      schedulesConfig,
    }): Promise<CallToolResult> => {
      log(`Running tool: stape_container_schedules - action: ${action}`);

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const headers = userWorkspaceIdentifier
          ? { "X-WORKSPACE": userWorkspaceIdentifier }
          : undefined;

        switch (action) {
          case "get": {
            const response = await httpClient.get<ContainerScheduleModel[]>(
              `/containers/${identifier}/schedules`,
              { headers },
            );

            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }

          case "update": {
            if (!schedulesConfig) {
              throw new Error(
                `schedulesConfig is required for ${action} action`,
              );
            }

            const response = await httpClient.put(
              `/containers/${identifier}/schedules`,
              JSON.stringify({
                containerSchedules: schedulesConfig.containerSchedules,
              }),
              { headers },
            );

            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }

          default:
            throw new Error(`Unknown action: ${action}`);
        }
      } catch (error) {
        return createErrorResponse(
          `Failed to perform container schedules operation: ${action}`,
          error,
        );
      }
    },
  );
};
