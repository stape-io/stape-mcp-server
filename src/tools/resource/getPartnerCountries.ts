import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { CountryWithTranslationModel } from "../../models/CountryWithTranslationModel";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const getPartnerCountries = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_resource_get_partner_countries",
    "Gets partner countries as options. Requires _locale query parameter.",
    {
      _locale: z
        .string()
        .describe("Locale for translations (e.g., 'en', 'de', etc.)"),
    },
    async ({ _locale }) => {
      log("Running tool: stape_resource_get_partner_countries");

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const response = await httpClient.get<CountryWithTranslationModel[]>(
          `/resources/partner-countries?_locale=${encodeURIComponent(_locale)}`,
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse("Failed to get partner countries", error);
      }
    },
  );
};
