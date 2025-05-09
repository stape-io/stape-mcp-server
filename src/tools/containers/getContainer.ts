import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ContainerModel } from "../../models/ContainerModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getContainer = (server: McpServer): void =>
  server.tool(
    "containers_get_container",
    "Gets a container by its identifier.",
    {
      identifier: z.string().describe("Container identifier "),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
    },
    async ({ identifier, userWorkspaceIdentifier }) => {
      log("Running tool: containers_get_container");

      try {
        const response = await httpClient.get<ContainerModel>(
          `/containers/${identifier}`,
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
          "Failed to get container (containers_get_container)",
          error,
        );
      }
    },
  );
