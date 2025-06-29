import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { OptionModel } from "../../models/OptionModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const partnerResourceActions = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_partner_resource_actions",
    "Tool for retrieving partner-related resources and configurations. Use the 'type' parameter to specify which partner resource to retrieve.",
    {
      type: z
        .enum([
          "countries",
          "application_statuses",
          "application_signed_by_statuses",
          "company_classifications",
          "payment_types",
          "payout_statuses",
          "source_types",
          "tiers",
          "payout_schedule_types",
          "referral_commission_statuses",
          "sub_account_permission_types",
        ])
        .describe("The specific type of partner resource to retrieve."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The unique user workspace identifier."),
    },
    async ({ type, userWorkspaceIdentifier }): Promise<CallToolResult> => {
      log(`Running tool: partner_resource_manager - type: ${type}`);

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const headers = userWorkspaceIdentifier
          ? { "X-WORKSPACE": userWorkspaceIdentifier }
          : undefined;

        switch (type) {
          case "countries": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/partner-countries",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "application_statuses": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/partner-application-statuses",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "application_signed_by_statuses": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/partner-application-signed-by-statuses",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "company_classifications": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/partner-company-classifications",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "payment_types": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/partner-payment-types",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "payout_statuses": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/partner-payout-statuses",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "source_types": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/partner-source-types",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "tiers": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/partner-tiers",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "payout_schedule_types": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/partner-payout-schedule-types",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "referral_commission_statuses": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/partner-referral-commission-statuses",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          case "sub_account_permission_types": {
            const response = await httpClient.get<OptionModel[]>(
              "/resources/partner-sub-account-permission-types",
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }
          default:
            throw new Error(`Unknown partner type: ${type}`);
        }
      } catch (error) {
        return createErrorResponse(
          `Failed to retrieve partner resource: ${type}`,
          error,
        );
      }
    },
  );
};
