import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { ContainerSurchargesModel } from "../../models/ContainerSurchargesModel";
import { ContainerUsageStatistics } from "../../models/ContainerUsageStatistics";
import { ContainerUsageStatisticsByDayModel } from "../../models/ContainerUsageStatisticsByDayModel";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { UsageByDomainModel } from "../../models/UsageByDomainModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const containerStatisticsActions = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_container_statistics",
    "Comprehensive tool for managing container statistics and analytics. Supports getting usage statistics, daily statistics, usage by domain, and surcharges. Use the 'action' parameter to specify the operation: 'get_statistics', 'get_statistics_by_day', 'get_usage_by_domain', or 'get_surcharges'.",
    {
      action: z
        .enum([
          "get_statistics",
          "get_statistics_by_day",
          "get_usage_by_domain",
          "get_surcharges",
        ])
        .describe(
          "The action to perform: 'get_statistics' to get usage statistics, 'get_statistics_by_day' to get daily statistics, 'get_usage_by_domain' to get usage by domain, or 'get_surcharges' to get surcharges.",
        ),
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The unique user workspace identifier."),
      host: z
        .string()
        .optional()
        .describe(
          "Domain name to filter statistics by (host parameter). Used when action is 'get_statistics'.",
        ),
      plan: z
        .string()
        .optional()
        .describe("Subscription plan. Used when action is 'get_surcharges'."),
      period: z
        .string()
        .optional()
        .describe("Subscription period. Used when action is 'get_surcharges'."),
    },
    async ({
      action,
      identifier,
      userWorkspaceIdentifier,
      host,
      plan,
      period,
    }): Promise<CallToolResult> => {
      log(`Running tool: stape_container_statistics - action: ${action}`);

      try {
        const httpClient = new HttpClient(props.apiBaseUrl, props.apiKey);
        const headers = userWorkspaceIdentifier
          ? { "X-WORKSPACE": userWorkspaceIdentifier }
          : undefined;

        switch (action) {
          case "get_statistics": {
            const queryParams: Record<string, string> = {};

            if (host) {
              queryParams.host = host;
            }

            const response = await httpClient.get<ContainerUsageStatistics[]>(
              `/containers/${encodeURIComponent(identifier)}/statistics`,
              { headers, queryParams },
            );

            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }

          case "get_statistics_by_day": {
            const response = await httpClient.get<
              ContainerUsageStatisticsByDayModel[]
            >(
              `/containers/${encodeURIComponent(identifier)}/statistics-by-day`,
              {
                headers,
              },
            );

            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }

          case "get_usage_by_domain": {
            const response = await httpClient.get<UsageByDomainModel[]>(
              `/containers/${encodeURIComponent(identifier)}/usage-by-domain`,
              { headers },
            );

            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }

          case "get_surcharges": {
            const queryParams: Record<string, string> = {};

            if (plan) {
              queryParams.plan = plan;
            }

            if (period) {
              queryParams.period = period;
            }

            const response = await httpClient.get<ContainerSurchargesModel[]>(
              `/containers/${encodeURIComponent(identifier)}/surcharges`,
              { headers, queryParams },
            );

            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }

          default:
            throw new Error(`Unknown action: ${action}`);
        }
      } catch (error) {
        return createErrorResponse(
          `Failed to perform container statistics operation: ${action}`,
          error,
        );
      }
    },
  );
};
