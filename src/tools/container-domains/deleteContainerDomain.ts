import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const deleteContainerDomain = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_container_delete_domain",
    "Deletes a specific domain from a container.",
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
        `Running tool: container_delete_domain for container ${container}, domain ${domain}`,
      );

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const response = await httpClient.delete(
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
          "Failed to delete container domain (container_delete_domain)",
          error,
        );
      }
    },
  );
};
