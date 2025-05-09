import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { UpcomingInvoiceModel } from "../../models/UpcomingInvoiceModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getContainerCheckoutData = (server: McpServer): void =>
  server.tool(
    "containers_resources_get_checkout_data",
    "Retrieve detailed checkout and upcoming invoice data for a container subscription. Requires specifying the subscription plan and period. Optionally accepts a promo code. Returns pricing, trial, and payment details for the selected plan and period.",
    {
      identifier: z.string().describe("Container identifier."),
      plan: z.string().optional().describe("Subscription plan."),
      period: z.string().optional().describe("Subscription period."),
      promoCode: z.string().optional().describe("Subscription promo code."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
    },
    async ({ identifier, userWorkspaceIdentifier, ...queryParams }) => {
      log(
        `Running tool: containers_resources_get_checkout_data for identifier ${identifier}`,
      );

      try {
        const response = await httpClient.get<UpcomingInvoiceModel>(
          `/containers/${encodeURIComponent(identifier)}/checkout-data`,
          {
            queryParams,
            headers: userWorkspaceIdentifier
              ? { "X-WORKSPACE": userWorkspaceIdentifier }
              : undefined,
          },
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get container checkout data (containers_resources_get_checkout_data)",
          error,
        );
      }
    },
  );
