import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const updateContainerTransfer = (server: McpServer): void =>
  server.tool(
    "containers_resources_update_transfer",
    "Updates (transfers) the container to a new owner by email. Use this endpoint to transfer container ownership to another user by specifying their email address.",
    {
      identifier: z.string().describe("Container identifier."),
      email: z
        .string()
        .email()
        .optional()
        .describe(
          "Email address of the new container owner (in the request body).",
        ),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
    },
    async ({ identifier, email, userWorkspaceIdentifier }) => {
      log(
        `Running tool: containers_resources_update_transfer for identifier ${identifier}, email ${email}`,
      );

      try {
        const response = await httpClient.put<unknown>(
          `/containers/${encodeURIComponent(identifier)}/transfer`,
          JSON.stringify({ email }),
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
          "Failed to update (transfer) container (containers_resources_update_transfer)",
          error,
        );
      }
    },
  );
