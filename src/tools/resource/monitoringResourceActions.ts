import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { OptionModel } from "../../models/OptionModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const monitoringResourceActions = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_monitoring_resource",
    "Tool for retrieving monitoring-related resources and configurations. Use the 'type' parameter to specify which monitoring resource to retrieve.",
    {
      type: z
        .enum([
          "periods_type",
          "rules_fields_type",
          "rules_operators_type",
          "rules_values_type",
          "comparison_type",
          "compare_to_type",
          "log_types",
        ])
        .describe("The specific type of monitoring resource to retrieve."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The unique user workspace identifier."),
    },
    async ({ type, userWorkspaceIdentifier }): Promise<CallToolResult> => {
      log(`Running tool: stape_monitoring_resource - type: ${type}`);

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const headers = userWorkspaceIdentifier
          ? { "X-WORKSPACE": userWorkspaceIdentifier }
          : undefined;

        switch (type) {
          case "periods_type": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/container-monitoring-periods-type",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "rules_fields_type": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/container-monitoring-rules-fields-type",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "rules_operators_type": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/container-monitoring-rules-operators-type",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "rules_values_type": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/container-monitoring-rules-values-type",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "comparison_type": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/container-monitoring-comparison-type",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "compare_to_type": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/container-monitoring-compare-to-type",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "log_types": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/container-monitoring-log-types",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          default:
            throw new Error(`Unknown monitoring type: ${type}`);
        }
      } catch (error) {
        return createErrorResponse(
          `Failed to retrieve monitoring resource: ${type}`,
          error,
        );
      }
    },
  );
};
