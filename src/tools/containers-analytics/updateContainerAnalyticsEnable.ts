import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const updateContainerAnalyticsEnable = (server: McpServer): void =>
  server.tool(
    "containers_analytics_enable",
    "Enables or disables analytics for a container. Use this endpoint to toggle analytics collection for the specified container by setting the 'enabled' field in the request body. Useful for controlling whether analytics data is collected for the container.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
      enabled: z
        .boolean()
        .describe(
          "Whether to enable (true) or disable (false) analytics collection.",
        ),
    },
    async ({ identifier, userWorkspaceIdentifier, enabled }) => {
      log(
        `Running tool: containers_analytics_enable for identifier ${identifier} with enabled=${enabled}`,
      );

      try {
        const response = await httpClient.patch<unknown>(
          `/containers/${encodeURIComponent(identifier)}/analytics-enable`,
          JSON.stringify({ enabled }),
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
          "Failed to patch analytics enable (containers_analytics_enable)",
          error,
        );
      }
    },
  );
