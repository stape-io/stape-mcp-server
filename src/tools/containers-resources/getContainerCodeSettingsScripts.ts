import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { CodeSettingsScriptsModel } from "../../models/CodeSettingsScriptsModel";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const getContainerCodeSettingsScripts = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_containers_resources_get_code_settings_scripts",
    "Retrieves code settings scripts for a container. Use this endpoint to get the tagging server URL, GTM ID, JavaScript code, and optional no-script code for the specified container.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
    },
    async ({ identifier, userWorkspaceIdentifier }) => {
      log(
        `Running tool: containers_resources_get_code_settings_scripts for identifier ${identifier}`,
      );

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const response = await httpClient.get<CodeSettingsScriptsModel>(
          `/containers/${encodeURIComponent(identifier)}/code-settings-scripts`,
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
          "Failed to get code settings scripts (containers_resources_get_code_settings_scripts)",
          error,
        );
      }
    },
  );
};
