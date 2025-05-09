import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { ContainerPlanOptionModel } from "../../models/ContainerPlanOptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const containerSubscriptionPlansForUser = (server: McpServer): void =>
  server.tool(
    "resource_container_subscription_plans_for_user",
    "Gets list of container subscription plans for the user",
    {
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier"),
    },
    async ({ userWorkspaceIdentifier }): Promise<CallToolResult> => {
      log(
        `Running tool: resource_container_subscription_plans_for_user for account ${userWorkspaceIdentifier}`,
      );

      try {
        const response = await httpClient.get<ContainerPlanOptionModel>(
          "/resources/container-subscription-plans-for-user",
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
          "Failed to get resource_container_subscription_plans_for_user tool data",
          error,
        );
      }
    },
  );
