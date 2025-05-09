import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getContainerPeriods = (server: McpServer): void =>
  server.tool(
    "containers_resources_get_periods",
    "Retrieve available subscription periods for a container. Requires the container identifier as a path parameter. Returns an array of strings (period identifiers).",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
    },
    async ({ identifier, userWorkspaceIdentifier }) => {
      log(
        `Running tool: containers_resources_get_periods for identifier ${identifier}`,
      );

      try {
        const response = await httpClient.get<string[]>(
          `/containers/${encodeURIComponent(identifier)}/periods`,
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
          "Failed to get container periods (containers_resources_get_periods)",
          error,
        );
      }
    },
  );
