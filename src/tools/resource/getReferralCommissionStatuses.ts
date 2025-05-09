import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { OptionModel } from "../../models/OptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getReferralCommissionStatuses = (server: McpServer): void =>
  server.tool(
    "resource_get_referral_commission_statuses",
    "Gets referral commission statuses as options.",
    {},
    async () => {
      log("Running tool: resource_get_referral_commission_statuses");

      try {
        const response = await httpClient.get<OptionModel[]>(
          "/resources/referral-commission-statuses",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get referral commission statuses",
          error,
        );
      }
    },
  );
