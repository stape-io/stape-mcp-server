import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { OptionModel } from "../../models/OptionModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const containerResourceActions = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_container_resource_actions",
    "Tool for retrieving container-related resources and configurations. Use the 'type' parameter to specify which container resource to retrieve.",
    {
      type: z
        .enum([
          "statuses",
          "zones",
          "all_zones",
          "custom_zones",
          "subscription_plans",
          "anonymize_options",
          "cookie_keeper_options",
          "proxy_file_cache_max_ages",
          "schedule_types",
          "subscription_plans_for_user",
        ])
        .describe("The specific type of container resource to retrieve."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The unique user workspace identifier."),
    },
    async ({ type, userWorkspaceIdentifier }): Promise<CallToolResult> => {
      log(`Running tool: container_resource_manager - type: ${type}`);

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const headers = userWorkspaceIdentifier
          ? { "X-WORKSPACE": userWorkspaceIdentifier }
          : undefined;

        switch (type) {
          case "statuses": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/container-statuses",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "zones": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/container-zones",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "all_zones": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/all-container-zones",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "custom_zones": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/container-custom-zones",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "subscription_plans": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/container-subscription-plans",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "anonymize_options": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/container-anonymize-options",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "cookie_keeper_options": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/container-cookie-keeper-options",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "proxy_file_cache_max_ages": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/container-proxy-file-cache-max-ages",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "schedule_types": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/container-schedule-types",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "subscription_plans_for_user": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/container-subscription-plans-for-user",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          default:
            throw new Error(`Unknown container type: ${type}`);
        }
      } catch (error) {
        return createErrorResponse(
          `Failed to retrieve container resource: ${type}`,
          error,
        );
      }
    },
  );
};
