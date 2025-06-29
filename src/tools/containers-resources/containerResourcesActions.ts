import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const containerResourcesActions = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_container_resources_actions",
    "Comprehensive tool for managing container resources. Supports getting code settings scripts, example domain records, last subscription promo code, and managing container reactivation and integration clicks. Use the 'action' parameter to specify the operation.",
    {
      action: z
        .enum([
          "get_code_settings_scripts",
          "get_example_domain_records",
          "get_last_subscription_promo_code",
          "reactivate_container",
          "create_integration_click",
        ])
        .describe(
          "The action to perform: 'get_code_settings_scripts' to get code settings scripts, 'get_example_domain_records' to get example domain records, 'get_last_subscription_promo_code' to get last subscription promo code, 'reactivate_container' to reactivate container, or 'create_integration_click' to create integration click.",
        ),
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The unique user workspace identifier."),
      integrationClickConfig: z
        .object({
          platform: z.string().describe("Platform for integration click."),
          eventType: z.string().describe("Event type for integration click."),
          eventData: z
            .record(z.any())
            .optional()
            .describe("Event data for integration click."),
        })
        .optional()
        .describe(
          "Integration click configuration. Required when action is 'create_integration_click'.",
        ),
    },
    async ({
      action,
      identifier,
      userWorkspaceIdentifier,
      integrationClickConfig,
    }): Promise<CallToolResult> => {
      log(`Running tool: container_resources_manager - action: ${action}`);

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const headers = userWorkspaceIdentifier
          ? { "X-WORKSPACE": userWorkspaceIdentifier }
          : undefined;

        switch (action) {
          case "get_code_settings_scripts": {
            const response = await httpClient.get<unknown>(
              `/containers/${encodeURIComponent(identifier)}/code-settings-scripts`,
              { headers },
            );

            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }

          case "get_example_domain_records": {
            const response = await httpClient.get<unknown>(
              `/containers/${encodeURIComponent(identifier)}/example-domain-records`,
              { headers },
            );

            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }

          case "get_last_subscription_promo_code": {
            const response = await httpClient.get<unknown>(
              `/containers/${encodeURIComponent(identifier)}/last-subscription-promo-code`,
              { headers },
            );

            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }

          case "reactivate_container": {
            const response = await httpClient.put<unknown>(
              `/containers/${encodeURIComponent(identifier)}/reactivate`,
              JSON.stringify({}),
              { headers },
            );

            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }

          case "create_integration_click": {
            if (!integrationClickConfig) {
              throw new Error(
                `integrationClickConfig is required for ${action} action`,
              );
            }

            const response = await httpClient.post<unknown>(
              `/containers/${encodeURIComponent(identifier)}/integration-click`,
              JSON.stringify({
                platform: integrationClickConfig.platform,
                eventType: integrationClickConfig.eventType,
                eventData: integrationClickConfig.eventData,
              }),
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
          `Failed to perform container resources operation: ${action}`,
          error,
        );
      }
    },
  );
};
