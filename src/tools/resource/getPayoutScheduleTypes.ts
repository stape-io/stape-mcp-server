import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { OptionModel } from "../../models/OptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getPayoutScheduleTypes = (server: McpServer): void =>
  server.tool(
    "resource_get_payout_schedule_types",
    "Gets payout schedule types as options.",
    {},
    async () => {
      log("Running tool: resource_get_payout_schedule_types");

      try {
        const response = await httpClient.get<OptionModel[]>(
          "/resources/payout-schedule-types",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get payout schedule types",
          error,
        );
      }
    },
  );
