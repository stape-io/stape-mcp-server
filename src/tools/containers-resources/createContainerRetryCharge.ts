import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const createContainerRetryCharge = (server: McpServer): void =>
  server.tool(
    "containers_resources_create_retry_charge",
    "Retry a failed or pending subscription charge for a container. Use this endpoint to attempt charging the container's subscription again. Requires the container identifier as a path parameter.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
    },
    async ({ identifier, userWorkspaceIdentifier }) => {
      log(
        `Running tool: containers_resources_create_retry_charge for identifier ${identifier}`,
      );

      try {
        const response = await httpClient.post<unknown>(
          `/containers/${encodeURIComponent(identifier)}/retry-charge`,
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
          "Failed to retry container subscription charge (containers_resources_create_retry_charge)",
          error,
        );
      }
    },
  );
