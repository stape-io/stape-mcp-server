import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { ContainerPaymentDataModel } from "../../models/ContainerPaymentDataModel";
import { ContainerPlanOptionModel } from "../../models/ContainerPlanOptionModel";
import { ContainerSubscriptionChangePlanFormTypeSchema } from "../../models/ContainerSubscriptionChangePlanFormTypeSchema";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const containerSubscriptionActions = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_container_subscription_actions",
    "Comprehensive tool for managing container subscriptions and billing. Supports getting plans, periods, payment data, checkout data, and managing subscription changes, cancellations, reactivations, and transfers. Use the 'action' parameter to specify the operation.",
    {
      action: z
        .enum([
          "get_plans",
          "get_periods",
          "get_payment_data",
          "get_checkout_data",
          "change_plan",
          "cancel_subscription",
          "reactivate_subscription",
          "transfer_container",
        ])
        .describe(
          "The action to perform: 'get_plans' to get available plans, 'get_periods' to get billing periods, 'get_payment_data' to get payment data, 'get_checkout_data' to get checkout data, 'change_plan' to change subscription plan, 'cancel_subscription' to cancel subscription, 'reactivate_subscription' to reactivate subscription, or 'transfer_container' to transfer container.",
        ),
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The unique user workspace identifier."),
      changePlanConfig:
        ContainerSubscriptionChangePlanFormTypeSchema.optional().describe(
          "Change plan configuration. Required when action is 'change_plan'.",
        ),
      transferConfig: z
        .object({
          targetWorkspaceIdentifier: z
            .string()
            .describe("Target workspace identifier for transfer."),
        })
        .optional()
        .describe(
          "Transfer configuration. Required when action is 'transfer_container'.",
        ),
    },
    async ({
      action,
      identifier,
      userWorkspaceIdentifier,
      changePlanConfig,
      transferConfig,
    }): Promise<CallToolResult> => {
      log(`Running tool: container_subscription_manager - action: ${action}`);

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const headers = userWorkspaceIdentifier
          ? { "X-WORKSPACE": userWorkspaceIdentifier }
          : undefined;

        switch (action) {
          case "get_plans": {
            const response = await httpClient.get<ContainerPlanOptionModel[]>(
              `/containers/${encodeURIComponent(identifier)}/plans`,
              { headers },
            );

            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }

          case "get_periods": {
            const response = await httpClient.get<unknown>(
              `/containers/${encodeURIComponent(identifier)}/periods`,
              { headers },
            );

            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }

          case "get_payment_data": {
            const response = await httpClient.get<ContainerPaymentDataModel>(
              `/containers/${encodeURIComponent(identifier)}/payment-data`,
              { headers },
            );

            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }

          case "get_checkout_data": {
            const response = await httpClient.get<unknown>(
              `/containers/${encodeURIComponent(identifier)}/checkout-data`,
              { headers },
            );

            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }

          case "change_plan": {
            if (!changePlanConfig) {
              throw new Error(
                "changePlanConfig is required for change_plan action",
              );
            }

            const response = await httpClient.put<unknown>(
              `/containers/${encodeURIComponent(identifier)}/change-plan`,
              JSON.stringify(changePlanConfig),
              { headers },
            );

            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }

          case "cancel_subscription": {
            const response = await httpClient.put<unknown>(
              `/containers/${encodeURIComponent(identifier)}/cancel-subscription`,
              JSON.stringify({}),
              { headers },
            );

            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }

          case "reactivate_subscription": {
            const response = await httpClient.put<unknown>(
              `/containers/${encodeURIComponent(identifier)}/reactivate-subscription`,
              JSON.stringify({}),
              { headers },
            );

            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }

          case "transfer_container": {
            if (!transferConfig) {
              throw new Error(
                `transferConfig is required for ${action} action`,
              );
            }

            const response = await httpClient.put<unknown>(
              `/containers/${encodeURIComponent(identifier)}/transfer`,
              JSON.stringify({
                targetWorkspaceIdentifier:
                  transferConfig.targetWorkspaceIdentifier,
              }),
              { headers },
            );

            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }

          default:
            throw new Error(`Unknown action: ${action}`);
        }
      } catch (error) {
        return createErrorResponse(
          `Failed to perform container subscription operation: ${action}`,
          error,
        );
      }
    },
  );
};
