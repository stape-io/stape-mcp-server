import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const updatePreviewHeaderConfigPowerUp = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_containers_update_preview_header_config_power_up",
    "Updates the preview header config power-up activation state and options for a container.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
      isActive: z
        .boolean()
        .describe("Whether the preview header config power-up is active."),
      options: z.string().optional().describe("Preview header config options."),
    },
    async ({ identifier, userWorkspaceIdentifier, isActive, options }) => {
      log("Running tool: stape_containers_update_preview_header_config_power_up");

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const response = await httpClient.patch(
          `/containers/${identifier}/power-ups/preview-header-config`,
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
          "Failed to patch preview header config power-up (containers_update_preview_header_config_power_up)",
          error,
        );
      }
    },
  );
};
