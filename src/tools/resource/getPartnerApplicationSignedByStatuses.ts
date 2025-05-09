import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { OptionModel } from "../../models/OptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getPartnerApplicationSignedByStatuses = (
  server: McpServer,
): void =>
  server.tool(
    "resource_get_partner_application_signed_by_statuses",
    "Gets partner application signed by statuses as options.",
    {},
    async () => {
      log("Running tool: resource_get_partner_application_signed_by_statuses");

      try {
        const response = await httpClient.get<OptionModel[]>(
          "/resources/partner-application-signed-by-statuses",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get partner application signed by statuses",
          error,
        );
      }
    },
  );
