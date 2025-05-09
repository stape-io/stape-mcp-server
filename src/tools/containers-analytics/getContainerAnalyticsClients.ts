import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { AnalyticsClientModel } from "../../models/AnalyticsClientModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getContainerAnalyticsClients = (server: McpServer): void =>
  server.tool(
    "containers_analytics_clients",
    "Retrieves detailed subscription usage analytics for a container, grouped by client and date. Returns a list of clients with their event usage, adBlock, and Safari usage statistics. Supports optional filtering by start and end date (timestamps). Useful for understanding client-specific engagement and ad-blocker prevalence among users.",
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
        `Running tool: containers_analytics_clients for identifier ${identifier}`,
      );

      try {
        const response = await httpClient.get<AnalyticsClientModel[]>(
          `/containers/${encodeURIComponent(identifier)}/analytics/clients`,
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
          "Failed to get analytics clients (containers_analytics_clients)",
          error,
        );
      }
    },
  );
