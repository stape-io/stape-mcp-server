import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ContainerDomainModel } from "../../models/ContainerDomainModel";
import { ContainerDomainFormSchema } from "../../schemas/ContainerDomainFormSchema";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const updateContainerDomain = (server: McpServer): void =>
  server.tool(
    "container_update_domain",
    "Updates a specific domain for a container. Returns the updated domain object.",
    {
      container: z.string().describe("Container identifier."),
      domain: z.string().describe("Domain identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
      ...ContainerDomainFormSchema.shape,
    },
    async ({ container, domain, userWorkspaceIdentifier, ...body }) => {
      log(
        `Running tool: container_update_domain for container ${container}, domain ${domain}`,
      );

      try {
        const response = await httpClient.put<ContainerDomainModel>(
          `/containers/${encodeURIComponent(container)}/domains/${encodeURIComponent(domain)}`,
          JSON.stringify(body),
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
          "Failed to update container domain (container_update_domain)",
          error,
        );
      }
    },
  );
