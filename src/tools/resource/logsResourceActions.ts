import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { OptionModel } from "../../models/OptionModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const logsResourceActions = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_logs_resource",
    "Tool for retrieving logs-related resources and configurations. Use the 'type' parameter to specify which logs resource to retrieve.",
    {
      type: z
        .enum([
          "types",
          "client_types",
          "status_code_types",
          "event_types",
          "platform_types",
        ])
        .describe("The specific type of logs resource to retrieve."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The unique user workspace identifier."),
    },
    async ({ type, userWorkspaceIdentifier }): Promise<CallToolResult> => {
      log(`Running tool: stape_logs_resource - type: ${type}`);

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const headers = userWorkspaceIdentifier
          ? { "X-WORKSPACE": userWorkspaceIdentifier }
          : undefined;

        switch (type) {
          case "types": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/container-log-types",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "client_types": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/container-log-client-types",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "status_code_types": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/container-log-status-code-types",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "event_types": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/container-log-event-types",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "platform_types": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/container-log-platform-types",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          default:
            throw new Error(`Unknown logs type: ${type}`);
        }
      } catch (error) {
        return createErrorResponse(
          `Failed to retrieve logs resource: ${type}`,
          error,
        );
      }
    },
  );
};
