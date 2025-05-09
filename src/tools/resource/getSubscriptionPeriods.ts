import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { OptionModel } from "../../models/OptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getSubscriptionPeriods = (server: McpServer): void =>
  server.tool(
    "resource_get_subscription_periods",
    "Gets subscription periods as options.",
    {},
    async () => {
      log("Running tool: resource_get_subscription_periods");

      try {
        const response = await httpClient.get<OptionModel[]>(
          "/resources/subscription-periods",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse("Failed to get subscription periods", error);
      }
    },
  );
