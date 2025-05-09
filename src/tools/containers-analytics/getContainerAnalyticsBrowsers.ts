import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { AnalyticsBrowsersModel } from "../../models/AnalyticsBrowsersModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getContainerAnalyticsBrowsers = (server: McpServer): void =>
  server.tool(
    "containers_analytics_browsers",
    "Retrieves subscription usage browser analytics for a container. Returns, for the specified date range, a list of browsers with their usage statistics (browser name, event count, adBlock count). Supports optional filtering by start and end date (timestamps). Useful for understanding browser-specific engagement and ad-blocker prevalence among users.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
      start: z
        .number()
        .optional()
        .describe("Start date (timestamp, optional)."),
      end: z.number().optional().describe("End date (timestamp, optional)."),
    },
    async ({ identifier, userWorkspaceIdentifier, ...queryParams }) => {
      log(
        `Running tool: containers_analytics_browsers for identifier ${identifier}`,
      );

      try {
        const response = await httpClient.get<AnalyticsBrowsersModel[]>(
          `/containers/${encodeURIComponent(identifier)}/analytics/browsers`,
          {
            headers: userWorkspaceIdentifier
              ? { "X-WORKSPACE": userWorkspaceIdentifier }
              : undefined,
            queryParams,
          },
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get analytics browsers (containers_analytics_browsers)",
          error,
        );
      }
    },
  );
