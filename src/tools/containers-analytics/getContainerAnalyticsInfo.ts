import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { AnalyticsInfoModel } from "../../models/AnalyticsInfoModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getContainerAnalyticsInfo = (server: McpServer): void =>
  server.tool(
    "containers_analytics_info",
    "Retrieves general analytics info for a container, including data collection status, tracking improvement suggestions, recovered info, and purchase info. Useful for understanding the overall analytics health and recovery status for the specified container.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
    },
    async ({ identifier, userWorkspaceIdentifier }) => {
      log(
        `Running tool: containers_analytics_info for identifier ${identifier}`,
      );

      try {
        const response = await httpClient.get<AnalyticsInfoModel>(
          `/containers/${encodeURIComponent(identifier)}/analytics/info`,
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
          "Failed to get analytics info (containers_analytics_info)",
          error,
        );
      }
    },
  );
