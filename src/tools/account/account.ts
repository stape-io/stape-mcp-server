import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { AccountModel } from "../../models/AccountModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getAccount = (server: McpServer): void =>
  server.tool(
    "account_get_account",
    "Gets account information.",
    {},
    async (): Promise<CallToolResult> => {
      log("Running tool: account_get_account");
      try {
        const response = await httpClient.get<AccountModel>("/account");

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse("Failed to get account data", error);
      }
    },
  );

export const updateAccount = (server: McpServer): void =>
  server.tool(
    "account_update_account",
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
      log("Running tool: account_update_account");

      try {
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
