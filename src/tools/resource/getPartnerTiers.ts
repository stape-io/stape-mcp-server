import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { OptionModel } from "../../models/OptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getPartnerTiers = (server: McpServer): void =>
  server.tool(
    "resource_get_partner_tiers",
    "Gets partner tiers as options.",
    {},
    async () => {
      log("Running tool: resource_get_partner_tiers");

      try {
        const response = await httpClient.get<OptionModel[]>(
          "/resources/partner-tiers",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse("Failed to get partner tiers", error);
      }
    },
  );
