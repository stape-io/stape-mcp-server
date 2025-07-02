import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { AccountModel } from "../../models/AccountModel";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const accountActions = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_account_actions",
    "Comprehensive tool for managing account information. Supports getting account information and updating account details. Use the 'action' parameter to specify the operation: 'get' or 'update'.",
    {
      action: z
        .enum(["get", "update"])
        .describe(
          "The action to perform: 'get' to retrieve account information, or 'update' to update account details.",
        ),
      updateConfig: z
        .object({
          nameFirst: z.string().describe("First name"),
          nameLast: z.string().describe("Last name"),
          consentEmailMarketing: z
            .boolean()
            .optional()
            .describe("Consent email marketing"),
        })
        .optional()
        .describe(
          "Account update configuration. Required when action is 'update'.",
        ),
    },
    async ({ action, updateConfig }): Promise<CallToolResult> => {
      log(`Running tool: account_manager - action: ${action}`);

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);

        switch (action) {
          case "get": {
            const response = await httpClient.get<AccountModel>("/account");

            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }

          case "update": {
            if (!updateConfig) {
              throw new Error(`updateConfig is required for ${action} action`);
            }

            const response = await httpClient.put<AccountModel>(
              "/account",
              JSON.stringify(updateConfig),
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
          `Failed to perform account operation: ${action}`,
          error,
        );
      }
    },
  );
};
