import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { OptionModel } from "../../models/OptionModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const billingResourceActions = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_billing_resource_actions",
    "Tool for retrieving billing-related resources and configurations. Use the 'type' parameter to specify which billing resource to retrieve.",
    {
      type: z
        .enum([
          "countries",
          "report_types",
          "subscription_periods",
          "subscription_cancel_reasons",
          "taxes",
        ])
        .describe("The specific type of billing resource to retrieve."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The unique user workspace identifier."),
    },
    async ({ type, userWorkspaceIdentifier }): Promise<CallToolResult> => {
      log(`Running tool: billing_resource_manager - type: ${type}`);

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const headers = userWorkspaceIdentifier
          ? { "X-WORKSPACE": userWorkspaceIdentifier }
          : undefined;

        switch (type) {
          case "countries": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/billing-countries",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "report_types": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/billing-report-types",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "subscription_periods": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/subscription-periods",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "subscription_cancel_reasons": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/subscription-cancel-reasons",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "taxes": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/taxes",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          default:
            throw new Error(`Unknown billing type: ${type}`);
        }
      } catch (error) {
        return createErrorResponse(
          `Failed to retrieve billing resource: ${type}`,
          error,
        );
      }
    },
  );
};
