import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CancelReasonModel } from "../../models/CancelReasonModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getSubscriptionCancelReasons = (server: McpServer): void =>
  server.tool(
    "resource_get_subscription_cancel_reasons",
    "Gets subscription cancel reasons.",
    {},
    async () => {
      log("Running tool: resource_get_subscription_cancel_reasons");

      try {
        const response = await httpClient.get<CancelReasonModel[]>(
          "/resources/subscription-cancel-reasons",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get subscription cancel reasons",
          error,
        );
      }
    },
  );
