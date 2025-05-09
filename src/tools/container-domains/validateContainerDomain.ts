import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ContainerDomainFormSchema } from "../../schemas/ContainerDomainFormSchema";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const validateContainerDomain = (server: McpServer): void =>
  server.tool(
    "container_validate_domain",
    "Validates a domain for a container using the provided form schema.",
    {
      container: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
      ...ContainerDomainFormSchema.shape,
    },
    async ({ container, userWorkspaceIdentifier, ...body }) => {
      log(`Running tool: container_validate_domain for container ${container}`);

      try {
        const response = await httpClient.post(
          `/containers/${encodeURIComponent(container)}/domains/validate`,
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
          "Failed to validate container domain (container_validate_domain)",
          error,
        );
      }
    },
  );
