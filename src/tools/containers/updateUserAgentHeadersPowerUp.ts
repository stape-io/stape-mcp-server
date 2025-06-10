import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const updateUserAgentHeadersPowerUp = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_containers_update_user_agent_headers_power_up",
    "Updates the user-agent-headers power-up activation state for a container.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
      isActive: z
        .boolean()
        .describe("Whether the user-agent-headers power-up is active."),
    },
    async ({ identifier, userWorkspaceIdentifier, isActive }) => {
      log("Running tool: stape_containers_update_user_agent_headers_power_up");

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const response = await httpClient.patch(
          `/containers/${identifier}/power-ups/user-agent-headers`,
          JSON.stringify({ isActive }),
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
          "Failed to patch user-agent-headers power-up (containers_update_user_agent_headers_power_up)",
          error,
        );
      }
    },
  );
};
