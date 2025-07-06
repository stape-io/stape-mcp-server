import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { OptionModel } from "../../models/OptionModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const gatewayResourceActions = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_gateway_resource",
    "Tool for retrieving gateway-related resources and configurations. Use the 'type' parameter to specify which gateway resource to retrieve.",
    {
      type: z
        .enum([
          "signals_statuses",
          "signals_zones",
          "signals_subscription_plans",
          "capi_statuses",
          "capi_zones",
          "capi_subscription_plans",
          "snapchat_statuses",
          "snapchat_zones",
          "snapchat_subscription_plans",
          "tiktok_statuses",
          "tiktok_zones",
          "tiktok_subscription_plans",
          "stape_statuses",
          "stape_zones",
          "stape_subscription_plans",
          "stape_domain_cdn_types",
          "meta_signals_zones",
          "meta_capi_zones",
        ])
        .describe("The specific type of gateway resource to retrieve."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The unique user workspace identifier."),
    },
    async ({ type, userWorkspaceIdentifier }): Promise<CallToolResult> => {
      log(`Running tool: stape_gateway_resource - type: ${type}`);

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const headers = userWorkspaceIdentifier
          ? { "X-WORKSPACE": userWorkspaceIdentifier }
          : undefined;

        switch (type) {
          case "signals_statuses": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/signals-gateway-statuses",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "signals_zones": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/signals-gateway-zones",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "signals_subscription_plans": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/signals-gateway-subscription-plans",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "capi_statuses": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/capi-gateway-statuses",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "capi_zones": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/capi-gateway-zones",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "capi_subscription_plans": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/capi-gateway-subscription-plans",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "snapchat_statuses": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/snapchat-gateway-statuses",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "snapchat_zones": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/snapchat-gateway-zones",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "snapchat_subscription_plans": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/snapchat-gateway-subscription-plans",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "tiktok_statuses": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/tiktok-gateway-statuses",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "tiktok_zones": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/tiktok-gateway-zones",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "tiktok_subscription_plans": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/tiktok-gateway-subscription-plans",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "stape_statuses": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/stape-gateway-statuses",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "stape_zones": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/stape-gateway-zones",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "stape_subscription_plans": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/stape-gateway-subscription-plans",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "stape_domain_cdn_types": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/stape-gateway-domain-cdn-types",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "meta_signals_zones": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/meta-signals-gateway-zones",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "meta_capi_zones": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/meta-capi-gateway-zones",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          default:
            throw new Error(`Unknown gateway type: ${type}`);
        }
      } catch (error) {
        return createErrorResponse(
          `Failed to retrieve gateway resource: ${type}`,
          error,
        );
      }
    },
  );
};
