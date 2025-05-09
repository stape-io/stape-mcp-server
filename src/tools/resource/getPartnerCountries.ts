import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { CountryWithTranslationModel } from "../../models/CountryWithTranslationModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getPartnerCountries = (server: McpServer): void =>
  server.tool(
    "resource_get_partner_countries",
    "Gets partner countries as options. Requires _locale query parameter.",
    {
      _locale: z
        .string()
        .describe("Locale for translations (e.g., 'en', 'de', etc.)"),
    },
    async ({ _locale }) => {
      log("Running tool: resource_get_partner_countries");

      try {
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
