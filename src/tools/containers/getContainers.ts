import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ContainerPreviewModel } from "../../models/ContainerPreviewModel";
import { PaginationModel } from "../../models/PaginationModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getContainers = (server: McpServer): void =>
  server.tool(
    "containers_get_containers",
    "Gets containers with preview information.",
    {
      page: z.number().int().optional().describe("Page number for pagination"),
      limit: z.number().int().optional().describe("Number of items per page"),
      status: z.string().optional().describe("Filter by container status"),
      userIdentifier: z
        .string()
        .optional()
        .describe("Filter by user identifier"),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
    },
    async ({ userWorkspaceIdentifier, ...queryParams }) => {
      log("Running tool: containers_get_containers");

      try {
        const response = await httpClient.get<
          PaginationModel<ContainerPreviewModel>
        >("/containers", {
          queryParams,
          headers: userWorkspaceIdentifier
            ? { "X-WORKSPACE": userWorkspaceIdentifier }
            : undefined,
        });

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get containers (containers_get_containers)",
          error,
        );
      }
    },
  );
