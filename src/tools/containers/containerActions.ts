import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { ContainerModel } from "../../models/ContainerModel";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { ContainerCodeSettingsFormTypeSchema } from "../../schemas/ContainerCodeSettingsFormTypeSchema";
import { ContainerCookieKeeperFormType2Schema } from "../../schemas/ContainerCookieKeeperFormType2Schema";
import { OptionFormSchema } from "../../schemas/OptionFormSchema";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const containerActions = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_container_crud",
    "Tool for managing container CRUD operations. Use the 'action' parameter to specify the operation: 'create', 'get', 'get_all', 'update', or 'delete'.",
    {
      action: z
        .enum(["create", "get", "get_all", "update", "delete"])
        .describe(
          "The action to perform: 'create' to create a new container, 'get' to retrieve a specific container, 'get_all' to retrieve all containers, 'update' to modify a container, or 'delete' to remove a container.",
        ),
      identifier: z
        .string()
        .optional()
        .describe(
          "Container identifier. Required for 'get', 'update', and 'delete' actions.",
        ),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The unique user workspace identifier."),
      name: z
        .string()
        .optional()
        .describe("Name of the container. Required for 'create' action."),
      code: z
        .string()
        .optional()
        .describe(
          "Container code (unique string identifier). Required for 'create' action.",
        ),
      codeSettings: ContainerCodeSettingsFormTypeSchema.optional().describe(
        "Settings for the container code. For 'create', 'update' actions.",
      ),
      zone: OptionFormSchema.optional().describe(
        "Zone configuration for the container. For 'create' action.",
      ),
      previewHeader: z
        .string()
        .optional()
        .describe(
          "Preview header value for the container. For 'create', 'update' actions.",
        ),
      geoHeaders: z
        .boolean()
        .optional()
        .describe("Enable geo headers. For 'create', 'update' actions."),
      xmlToJsonEnabled: z
        .boolean()
        .optional()
        .describe(
          "Enable XML to JSON conversion. For 'create', 'update' actions.",
        ),
      delayEnabled: z
        .boolean()
        .optional()
        .describe(
          "Enable request delay for the container. For 'create', 'update' actions.",
        ),
      stapeUserIdHeaderEnabled: z
        .boolean()
        .optional()
        .describe(
          "Enable X-STAPE-USER-ID header. For 'create', 'update' actions.",
        ),
      botIndexEnabled: z
        .boolean()
        .optional()
        .describe(
          "Enable bot index for the container. For 'create', 'update' actions.",
        ),
      userAgentHeaders: z
        .boolean()
        .optional()
        .describe("Enable user agent headers. For 'create', 'update' actions."),
      cookieKeeperOptions:
        ContainerCookieKeeperFormType2Schema.optional().describe(
          "Cookie keeper options for the container. For 'create', 'update' actions.",
        ),
      serviceAccountCredentials: z
        .string()
        .optional()
        .describe(
          "Service account credentials. For 'create', 'update' actions.",
        ),
    },
    async ({
      action,
      identifier,
      userWorkspaceIdentifier,
      name,
      code,
      ...createOrUpdateConfig
    }): Promise<CallToolResult> => {
      log(`Running tool: stape_container_crud - action: ${action}`);

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const headers = userWorkspaceIdentifier
          ? { "X-WORKSPACE": userWorkspaceIdentifier }
          : undefined;

        switch (action) {
          case "create": {
            if (!name) {
              throw new Error(`name is required for ${action} action`);
            }
            if (!code) {
              throw new Error(`code is required for ${action} action`);
            }

            const response = await httpClient.post<ContainerModel>(
              "/containers",
              JSON.stringify({ name, code, ...(createOrUpdateConfig || {}) }),
              { headers },
            );

            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "get": {
            if (!identifier) {
              throw new Error(`identifier is required for ${action} action`);
            }

            const response = await httpClient.get<ContainerModel>(
              `/containers/${encodeURIComponent(identifier)}`,
              { headers },
            );

            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "get_all": {
            const response = await httpClient.get<ContainerModel[]>(
              "/containers",
              { headers },
            );

            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "update": {
            if (!identifier) {
              throw new Error(`identifier is required for ${action} action`);
            }

            const response = await httpClient.put<ContainerModel>(
              `/containers/${encodeURIComponent(identifier)}`,
              JSON.stringify({ name, code, ...(createOrUpdateConfig || {}) }),
              { headers },
            );

            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "delete": {
            if (!identifier) {
              throw new Error(`identifier is required for ${action} action`);
            }

            await httpClient.delete(
              `/containers/${encodeURIComponent(identifier)}`,
              { headers },
            );

            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify({ success: true }, null, 2),
                },
              ],
            };
          }
          default:
            throw new Error(`Unknown action: ${action}`);
        }
      } catch (error) {
        return createErrorResponse(`Failed to ${action} container`, error);
      }
    },
  );
};
