import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ContainerDomainModel } from "../../models/ContainerDomainModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const createContainerDomain = (server: McpServer): void =>
  server.tool(
    "container_create_domain",
    "Creates a new domain for a container. Returns the created domain object.",
    {
      container: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
      name: z.string().describe("Domain name to add."),
      cdnType: z.string().optional().describe("CDN type."),
      useCnameRecord: z
        .boolean()
        .optional()
        .describe("Whether to use CNAME record."),
      connectionType: z
        .string()
        .optional()
        .describe("Connection type (e.g. 'stape')."),
    },
    async ({ container, userWorkspaceIdentifier, ...body }) => {
      log(`Running tool: container_create_domain for container ${container}`);

      try {
        const response = await httpClient.post<ContainerDomainModel>(
          `/containers/${encodeURIComponent(container)}/domains`,
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
          "Failed to create container domain (container_create_domain)",
          error,
        );
      }
    },
  );
