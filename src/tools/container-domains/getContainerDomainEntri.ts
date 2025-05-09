import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { EntriAuthorizationResultModel } from "../../models/EntriAuthorizationResultModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getContainerDomainEntri = (server: McpServer): void =>
  server.tool(
    "container_get_domain_entri",
    "Retrieves Entri authorization information for a specific domain in a container.",
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
        `Running tool: container_get_domain_entri for container ${container}, domain ${domain}`,
      );

      try {
        const response = await httpClient.get<EntriAuthorizationResultModel>(
          `/containers/${encodeURIComponent(container)}/domains/${encodeURIComponent(domain)}/entri`,
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
          "Failed to get Entri authorization info (container_get_domain_entri)",
          error,
        );
      }
    },
  );
