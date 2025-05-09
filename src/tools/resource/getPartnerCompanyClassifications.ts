import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { OptionModel } from "../../models/OptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getPartnerCompanyClassifications = (server: McpServer): void =>
  server.tool(
    "resource_get_partner_company_classifications",
    "Gets partner company classifications as options.",
    {},
    async () => {
      log("Running tool: resource_get_partner_company_classifications");

      try {
        const response = await httpClient.get<OptionModel[]>(
          "/resources/partner-company-classifications",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get partner company classifications",
          error,
        );
      }
    },
  );
