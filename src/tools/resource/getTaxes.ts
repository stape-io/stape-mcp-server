import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { TaxModel } from "../../models/TaxModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const getTaxes = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_resource_get_taxes",
    "Gets taxes list. Accepts optional countryId query parameter.",
    {
      countryId: z
        .number()
        .optional()
        .describe("Filter taxes by country ID (optional)"),
    },
    async ({ countryId }) => {
      log("Running tool: stape_resource_get_taxes");

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const response = await httpClient.get<TaxModel[]>(
          countryId !== undefined
            ? `/resources/taxes?countryId=${encodeURIComponent(countryId)}`
            : "/resources/taxes",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse("Failed to get taxes", error);
      }
    },
  );
};
