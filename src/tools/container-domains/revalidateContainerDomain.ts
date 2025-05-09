import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const revalidateContainerDomain = (server: McpServer): void =>
  server.tool(
    "container_domains_revalidate",
    "Revalidate a domain for a container. Triggers a revalidation process for the specified domain in the container.",
    {
      container: z.string().describe("Container identifier."),
      domain: z.string().describe("Domain identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
    },
    async ({ container, domain, userWorkspaceIdentifier }) => {
      log(
        `Running tool: container_domains_revalidate for container ${container} and domain ${domain}`,
      );

      try {
        await httpClient.post(
          `/containers/${encodeURIComponent(container)}/domains/${encodeURIComponent(domain)}/revalidate`,
          undefined,
          {
            headers: userWorkspaceIdentifier
              ? { "X-WORKSPACE": userWorkspaceIdentifier }
              : undefined,
          },
        );

        return { type: "text", content: [] };
      } catch (error) {
        return createErrorResponse(
          "Failed to revalidate domain (container_domains_revalidate)",
          error,
        );
      }
    },
  );
