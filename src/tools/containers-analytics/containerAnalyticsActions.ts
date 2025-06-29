import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { AnalyticsBrowsersModel } from "../../models/AnalyticsBrowsersModel";
import { AnalyticsClientModel } from "../../models/AnalyticsClientModel";
import { AnalyticsInfoModel } from "../../models/AnalyticsInfoModel";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const containerAnalyticsActions = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_container_analytics_actions",
    "Comprehensive tool for managing container analytics. Supports getting analytics info, browser analytics, client analytics, and enabling/disabling analytics. Use the 'action' parameter to specify the operation: 'get_info', 'get_browsers', 'get_clients', or 'update_enable'.",
    {
      action: z
        .enum(["get_info", "get_browsers", "get_clients", "update_enable"])
        .describe(
          "The action to perform: 'get_info' to get general analytics info, 'get_browsers' to get browser analytics, 'get_clients' to get client analytics, or 'update_enable' to enable/disable analytics.",
        ),
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The unique user workspace identifier."),
      dateRangeConfig: z
        .object({
          start: z
            .number()
            .optional()
            .describe("Start date (timestamp, optional)."),
          end: z
            .number()
            .optional()
            .describe("End date (timestamp, optional)."),
        })
        .optional()
        .describe(
          "Date range configuration for browser and client analytics. Required when action is 'get_browsers' or 'get_clients'.",
        ),
      enableConfig: z
        .object({
          enabled: z
            .boolean()
            .describe(
              "Whether to enable (true) or disable (false) analytics collection.",
            ),
        })
        .optional()
        .describe(
          "Analytics enable configuration. Required when action is 'update_enable'.",
        ),
    },
    async ({
      action,
      identifier,
      userWorkspaceIdentifier,
      dateRangeConfig,
      enableConfig,
    }): Promise<CallToolResult> => {
      log(`Running tool: container_analytics_manager - action: ${action}`);

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const headers = userWorkspaceIdentifier
          ? { "X-WORKSPACE": userWorkspaceIdentifier }
          : undefined;

        switch (action) {
          case "get_info": {
            const response = await httpClient.get<AnalyticsInfoModel>(
              `/containers/${encodeURIComponent(identifier)}/analytics/info`,
              { headers },
            );

            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }

          case "get_browsers": {
            const queryParams: Record<string, number> = {};

            if (dateRangeConfig) {
              if (dateRangeConfig.start !== undefined) {
                queryParams.start = dateRangeConfig.start;
              }
              if (dateRangeConfig.end !== undefined) {
                queryParams.end = dateRangeConfig.end;
              }
            }

            const response = await httpClient.get<AnalyticsBrowsersModel[]>(
              `/containers/${encodeURIComponent(identifier)}/analytics/browsers`,
              { headers, queryParams },
            );

            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }

          case "get_clients": {
            const queryParams: Record<string, number> = {};

            if (dateRangeConfig) {
              if (dateRangeConfig.start !== undefined) {
                queryParams.start = dateRangeConfig.start;
              }
              if (dateRangeConfig.end !== undefined) {
                queryParams.end = dateRangeConfig.end;
              }
            }

            const response = await httpClient.get<AnalyticsClientModel[]>(
              `/containers/${encodeURIComponent(identifier)}/analytics/clients`,
              { headers, queryParams },
            );

            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }

          case "update_enable": {
            if (!enableConfig) {
              throw new Error(`enableConfig is required for ${action} action`);
            }

            const response = await httpClient.patch<unknown>(
              `/containers/${encodeURIComponent(identifier)}/analytics-enable`,
              JSON.stringify({ enabled: enableConfig.enabled }),
              { headers },
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
          `Failed to perform container analytics operation: ${action}`,
          error,
        );
      }
    },
  );
};
