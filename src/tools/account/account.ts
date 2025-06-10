import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { AccountModel } from "../../models/AccountModel";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const getAccount = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_account_get_account",
    "Gets account information.",
    {},
    async (): Promise<CallToolResult> => {
      log("Running tool: stape_account_get_account");
      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const response = await httpClient.get<AccountModel>("/account");

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse("Failed to get account data", error);
      }
    },
  );
};

export const updateAccount = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_account_update_account",
    "Updates account information.",
    {
      nameFirst: z.string().describe("First name"),
      nameLast: z.string().describe("Last name"),
      consentEmailMarketing: z
        .boolean()
        .optional()
        .describe("Consent email marketing"),
    },
    async (args): Promise<CallToolResult> => {
      log("Running tool: stape_account_update_account");

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const response = await httpClient.put<AccountModel>(
          "/account",
          JSON.stringify(args),
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse("Failed to update account data", error);
      }
    },
  );
};
