import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { CountryWithTranslationModel } from "../../models/CountryWithTranslationModel";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const partnerCountries = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_resource_partner_countries",
    "Gets list of partner countries with translation support. Requires _locale query param.",
    {
      _locale: z
        .string()
        .describe("Locale for country translations, e.g., 'en', 'fr', etc."),
    },
    async ({ _locale }): Promise<CallToolResult> => {
      log(
        `Running tool: stape_resource_partner_countries with _locale=${_locale}`,
      );

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
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
};
