import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { ContainerDomainModel } from "../../models/ContainerDomainModel";
import { PaginationModel } from "../../models/PaginationModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getContainerDomains = (server: McpServer): void =>
  server.tool(
    "container_get_domains",
    "Retrieves a paginated list of domains associated with a container, identified by its unique identifier. Supports limit, offset, page, and status query parameters.",
    {
      container: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
      limit: z
        .number()
        .optional()
        .describe("Maximum number of domains to return."),
      offset: z.number().optional().describe("Offset for pagination."),
      page: z.number().optional().describe("Page number for pagination."),
      status: z.string().optional().describe("Status filter for domains."),
    },
    async ({
      container,
      userWorkspaceIdentifier,
      ...queryParams
    }): Promise<CallToolResult> => {
      log(`Running tool: container_get_domains for container ${container}`);

      try {
        const response = await httpClient.get<
          PaginationModel<ContainerDomainModel>
        >(`/containers/${encodeURIComponent(container)}/domains`, {
          headers: userWorkspaceIdentifier
            ? { "X-WORKSPACE": userWorkspaceIdentifier }
            : undefined,
          queryParams,
        });

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get container domains (container_get_domains)",
          error,
        );
      }
    },
  );
