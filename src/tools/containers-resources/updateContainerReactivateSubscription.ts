import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { Container2Model } from "../../models/Container2Model";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const updateContainerReactivateSubscription = (
  server: McpServer,
): void =>
  server.tool(
    "containers_resources_update_reactivate_subscription",
    "Re-activate a previously cancelled container subscription and restore it to active status. Requires the container identifier. Returns the updated container details as Container2Model.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
    },
    async ({ identifier, userWorkspaceIdentifier }) => {
      log(
        `Running tool: containers_resources_update_reactivate_subscription for identifier ${identifier}`,
      );

      try {
        const response = await httpClient.put<Container2Model>(
          `/containers/${encodeURIComponent(identifier)}/reactivate-subscription`,
          undefined,
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
          "Failed to reactivate container subscription (containers_resources_update_reactivate_subscription)",
          error,
        );
      }
    },
  );
