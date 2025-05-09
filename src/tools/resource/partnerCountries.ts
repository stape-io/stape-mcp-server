import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { CountryWithTranslationModel } from "../../models/CountryWithTranslationModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const partnerCountries = (server: McpServer): void =>
  server.tool(
    "resource_partner_countries",
    "Gets list of partner countries with translation support. Requires _locale query param.",
    {
      _locale: z
        .string()
        .describe("Locale for country translations, e.g., 'en', 'fr', etc."),
    },
    async ({ _locale }): Promise<CallToolResult> => {
      log(`Running tool: resource_partner_countries with _locale=${_locale}`);

      try {
        const response = await httpClient.get<CountryWithTranslationModel[]>(
          `/resources/partner-countries?_locale=${encodeURIComponent(_locale)}`,
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get resource_partner_countries tool data",
          error,
        );
      }
    },
  );
