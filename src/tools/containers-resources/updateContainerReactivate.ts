import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ContainerModel } from "../../models/ContainerModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const updateContainerReactivate = (server: McpServer): void =>
  server.tool(
    "containers_resources_update_reactivate",
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
