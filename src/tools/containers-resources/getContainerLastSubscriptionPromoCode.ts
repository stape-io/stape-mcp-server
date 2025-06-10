import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { PromoCodeModel } from "../../models/PromoCodeModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const getContainerLastSubscriptionPromoCode = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_containers_resources_get_last_subscription_promo_code",
    "Retrieve the last used promo code for a container's subscription. Returns code, type, amount, and currencyCode for the last applied promo code.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
    },
    async ({ identifier, userWorkspaceIdentifier }) => {
      log(
        `Running tool: containers_resources_get_last_subscription_promo_code for identifier ${identifier}`,
      );

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const response = await httpClient.get<PromoCodeModel>(
          `/containers/${encodeURIComponent(identifier)}/last-subscription-promo-code`,
          {
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
          "Failed to get last subscription promo code (containers_resources_get_last_subscription_promo_code)",
          error,
        );
      }
    },
  );
};
