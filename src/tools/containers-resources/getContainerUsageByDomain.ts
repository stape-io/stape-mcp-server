import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { UsageByDomainModel } from "../../models/UsageByDomainModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getContainerUsageByDomain = (server: McpServer): void =>
  server.tool(
    "containers_resources_get_usage_by_domain",
    "Retrieves usage statistics by domain for a container. Use this endpoint to get the request count and adBlock usage for each domain associated with the specified container.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
    },
    async ({ identifier, userWorkspaceIdentifier }) => {
      log(
        `Running tool: containers_resources_get_usage_by_domain for identifier ${identifier}`,
      );

      try {
        const response = await httpClient.get<UsageByDomainModel[]>(
          `/containers/${encodeURIComponent(identifier)}/usage-by-domain`,
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
          "Failed to get usage by domain (containers_resources_get_usage_by_domain)",
          error,
        );
      }
    },
  );
