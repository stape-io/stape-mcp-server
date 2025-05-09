import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ContainerProxyFileFormTypeSchema } from "../../schemas/ContainerProxyFileFormTypeSchema";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const updateProxyFilesPowerUp = (server: McpServer): void =>
  server.tool(
    "containers_update_proxy_files_power_up",
    "Enables or disables the proxy-files power-up for a container. This endpoint allows you to control proxying of files with custom paths and cache settings for the specified container.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
      isActive: z
        .boolean()
        .describe("Whether the proxy-files power-up is active."),
      options: z
        .array(ContainerProxyFileFormTypeSchema)
        .optional()
        .describe("Array of proxy file configuration objects."),
    },
    async ({ identifier, userWorkspaceIdentifier, isActive, options }) => {
      log("Running tool: containers_update_proxy_files_power_up");

      try {
        const response = await httpClient.patch(
          `/containers/${identifier}/power-ups/proxy-files`,
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
          "Failed to patch proxy-files power-up (containers_update_proxy_files_power_up)",
          error,
        );
      }
    },
  );
