import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { OptionModel } from "../../models/OptionModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const domainsResourceActions = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_domains_resource_actions",
    "Tool for retrieving domains-related resources and configurations. Use the 'type' parameter to specify which domains resource to retrieve.",
    {
      type: z
        .enum([
          "cdn_types",
          "record_types",
          "issuer_types",
          "errors",
          "statuses",
        ])
        .describe("The specific type of domains resource to retrieve."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The unique user workspace identifier."),
    },
    async ({ type, userWorkspaceIdentifier }): Promise<CallToolResult> => {
      log(`Running tool: domains_resource_manager - type: ${type}`);

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const headers = userWorkspaceIdentifier
          ? { "X-WORKSPACE": userWorkspaceIdentifier }
          : undefined;

        switch (type) {
          case "cdn_types": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/container-domain-cdn-types",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "record_types": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/container-domain-record-types",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "issuer_types": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/container-domain-issuer-types",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "errors": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/domain-errors",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "statuses": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/domain-statuses",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          default:
            throw new Error(`Unknown domains type: ${type}`);
        }
      } catch (error) {
        return createErrorResponse(
          `Failed to retrieve domains resource: ${type}`,
          error,
        );
      }
    },
  );
};
