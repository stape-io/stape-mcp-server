import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ContainerDomainModel } from "../../models/ContainerDomainModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getContainerDomain = (server: McpServer): void =>
  server.tool(
    "container_get_domain",
    "Retrieves a specific domain for a container by its identifier and domain name.",
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
        `Running tool: container_get_domain for container ${container}, domain ${domain}`,
      );

      try {
        const response = await httpClient.get<ContainerDomainModel>(
          `/containers/${encodeURIComponent(container)}/domains/${encodeURIComponent(domain)}`,
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
          "Failed to get container domain (container_get_domain)",
          error,
        );
      }
    },
  );
