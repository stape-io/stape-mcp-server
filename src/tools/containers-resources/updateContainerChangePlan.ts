import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ContainerSubscriptionChangePlanFormTypeSchema } from "../../models/ContainerSubscriptionChangePlanFormTypeSchema";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const updateContainerChangePlan = (server: McpServer): void =>
  server.tool(
    "containers_resources_update_change_plan",
    "Change the subscription plan for a container. Use this endpoint to update the plan for the specified container by providing the new plan details in the request body.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
      ...ContainerSubscriptionChangePlanFormTypeSchema.shape,
    },
    async ({ identifier, userWorkspaceIdentifier, ...body }) => {
      log(
        `Running tool: containers_resources_update_change_plan for identifier ${identifier}`,
      );

      try {
        const response = await httpClient.put<unknown>(
          `/containers/${encodeURIComponent(identifier)}/change-plan`,
          JSON.stringify(body),
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
          "Failed to change container plan (containers_resources_update_change_plan)",
          error,
        );
      }
    },
  );
