import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { TaxModel } from "../../models/TaxModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getTaxes = (server: McpServer): void =>
  server.tool(
    "resource_get_taxes",
    "Gets taxes list. Accepts optional countryId query parameter.",
    {
      countryId: z
        .number()
        .optional()
        .describe("Filter taxes by country ID (optional)"),
    },
    async ({ countryId }) => {
      log("Running tool: resource_get_taxes");
      try {
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
