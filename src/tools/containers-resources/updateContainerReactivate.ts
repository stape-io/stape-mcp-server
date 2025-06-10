import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { ContainerModel } from "../../models/ContainerModel";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const updateContainerReactivate = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_containers_resources_update_reactivate",
    "Re-activate container if it was disabled because of not being used. Use this endpoint to restore a previously disabled container back to active status and receive the updated container object.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
    },
    async ({ identifier, userWorkspaceIdentifier }) => {
      log(
        `Running tool: containers_resources_update_reactivate for identifier ${identifier}`,
      );

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const response = await httpClient.put<ContainerModel>(
          `/containers/${encodeURIComponent(identifier)}/reactivate`,
          undefined,
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
          "Failed to reactivate container (containers_resources_update_reactivate)",
          error,
        );
      }
    },
  );
};
