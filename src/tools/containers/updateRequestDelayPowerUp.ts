import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const updateRequestDelayPowerUp = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_containers_update_request_delay_power_up",
    "Enables or disables the request-delay power-up for a container. This endpoint allows you to control request delay features for the specified container.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
      isActive: z
        .boolean()
        .describe("Whether the request-delay power-up is active."),
    },
    async ({ identifier, userWorkspaceIdentifier, isActive }) => {
      log("Running tool: stape_containers_update_request_delay_power_up");

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const response = await httpClient.patch(
          `/containers/${identifier}/power-ups/request-delay`,
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
          "Failed to patch request-delay power-up (containers_update_request_delay_power_up)",
          error,
        );
      }
    },
  );
};
