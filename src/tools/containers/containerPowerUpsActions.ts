import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import {
  AnonymizerSchema,
  CookieKeeperSchema,
  PreviewHeaderConfigSchema,
  ProxyFilesSchema,
  ScheduleSchema,
  ServiceAccountSchema,
} from "../../schemas/ContainerPowerUpSchemas";
import { createErrorResponse, HttpClient, log } from "../../utils";

const AnonymizerPayloadSchema = AnonymizerSchema.omit({
  isActive: true,
});
const CookieKeeperPayloadSchema = CookieKeeperSchema.omit({
  isActive: true,
});
const PreviewHeaderConfigPayloadSchema = PreviewHeaderConfigSchema.omit({
  isActive: true,
});
const ProxyFilesPayloadSchema = ProxyFilesSchema.omit({
  isActive: true,
});
const SchedulePayloadSchema = ScheduleSchema.omit({
  isActive: true,
});
const ServiceAccountPayloadSchema = ServiceAccountSchema.omit({
  isActive: true,
});

export const containerPowerUpsActions = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_container_power_ups",
    "Tool for managing container power-ups. Use the 'powerUpType' parameter to specify which power-up to update, and provide the appropriate configuration options.",
    {
      powerUpType: z
        .enum([
          "anonymizer",
          "bot_detection",
          "bot_index",
          "cookie_keeper",
          "custom_loader",
          "geo_headers",
          "preview_header_config",
          "proxy_files",
          "request_delay",
          "schedule",
          "service_account",
          "user_agent_headers",
          "user_id",
          "xml_to_json",
        ])
        .describe(
          "The type of power-up to update. Each power-up has different configuration options.",
        ),
      identifier: z.string().describe("Container identifier."),
      isActive: z.boolean().describe("Whether the power-up is active."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The unique user workspace identifier."),
      anonymizerConfig: AnonymizerPayloadSchema.optional().describe(
        "Configuration for anonymizer power-up. Required when powerUpType is 'anonymizer'.",
      ),
      cookieKeeperConfig: CookieKeeperPayloadSchema.optional().describe(
        "Configuration for cookie keeper power-up. Required when powerUpType is 'cookie_keeper'.",
      ),
      previewHeaderConfig: PreviewHeaderConfigPayloadSchema.optional().describe(
        "Configuration for preview header config power-up. Required when powerUpType is 'preview_header_config'.",
      ),
      proxyFilesConfig: ProxyFilesPayloadSchema.optional().describe(
        "Configuration for proxy files power-up. Required when powerUpType is 'proxy_files'.",
      ),
      scheduleConfig: SchedulePayloadSchema.optional().describe(
        "Configuration for schedule power-up. Required when powerUpType is 'schedule'.",
      ),
      serviceAccountConfig: ServiceAccountPayloadSchema.optional().describe(
        "Configuration for service account power-up. Required when powerUpType is 'service_account'.",
      ),
    },
    async ({
      powerUpType,
      identifier,
      userWorkspaceIdentifier,
      isActive,
      anonymizerConfig,
      cookieKeeperConfig,
      previewHeaderConfig,
      proxyFilesConfig,
      scheduleConfig,
      serviceAccountConfig,
    }): Promise<CallToolResult> => {
      log(
        `Running tool: stape_container_power_ups - powerUpType: ${powerUpType}`,
      );

      try {
        const httpClient = new HttpClient(props.apiBaseUrl, props.apiKey);
        const headers = userWorkspaceIdentifier
          ? { "X-WORKSPACE": userWorkspaceIdentifier }
          : undefined;

        let endpoint: string;
        let body: any;

        switch (powerUpType) {
          case "anonymizer": {
            endpoint = `/containers/${identifier}/power-ups/anonymizer`;
            body = { isActive, ...(anonymizerConfig || {}) };
            break;
          }
          case "bot_detection": {
            endpoint = `/containers/${identifier}/power-ups/bot-detection`;
            body = { isActive };
            break;
          }
          case "bot_index": {
            endpoint = `/containers/${identifier}/power-ups/bot-index`;
            body = { isActive };
            break;
          }
          case "cookie_keeper": {
            endpoint = `/containers/${identifier}/power-ups/cookie-keeper`;
            body = {
              isActive,
              ...(cookieKeeperConfig || {}),
            };
            break;
          }
          case "custom_loader": {
            endpoint = `/containers/${identifier}/power-ups/custom-loader`;
            body = { isActive };
            break;
          }
          case "geo_headers": {
            endpoint = `/containers/${identifier}/power-ups/geo-headers`;
            body = { isActive };
            break;
          }
          case "preview_header_config": {
            endpoint = `/containers/${identifier}/power-ups/preview-header-config`;
            body = {
              isActive,
              ...(previewHeaderConfig || {}),
            };
            break;
          }
          case "proxy_files": {
            endpoint = `/containers/${identifier}/power-ups/proxy-files`;
            body = {
              isActive,
              ...(proxyFilesConfig || {}),
            };
            break;
          }
          case "request_delay": {
            endpoint = `/containers/${identifier}/power-ups/request-delay`;
            body = { isActive };
            break;
          }
          case "schedule": {
            endpoint = `/containers/${identifier}/power-ups/schedule`;
            body = {
              isActive,
              ...(scheduleConfig || {}),
            };
            break;
          }
          case "service_account": {
            endpoint = `/containers/${identifier}/power-ups/service-account`;
            body = { isActive, ...(serviceAccountConfig || {}) };
            break;
          }
          case "user_agent_headers": {
            endpoint = `/containers/${identifier}/power-ups/user-agent-headers`;
            body = { isActive };
            break;
          }
          case "user_id": {
            endpoint = `/containers/${identifier}/power-ups/user-id`;
            body = { isActive };
            break;
          }
          case "xml_to_json": {
            endpoint = `/containers/${identifier}/power-ups/xml-to-json`;
            body = { isActive };
            break;
          }
          default:
            throw new Error(`Unknown powerUpType: ${powerUpType}`);
        }

        const response = await httpClient.patch(
          endpoint,
          JSON.stringify(body),
          {
            headers,
          },
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          `Failed to update ${powerUpType} power-up`,
          error,
        );
      }
    },
  );
};
