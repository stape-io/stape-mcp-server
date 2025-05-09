import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { CodeSettingsScriptsModel } from "../../models/CodeSettingsScriptsModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getContainerCodeSettingsScripts = (server: McpServer): void =>
  server.tool(
    "containers_resources_get_code_settings_scripts",
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
