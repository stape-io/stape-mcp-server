import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { IntegrationClickFormTypeSchema } from "../../models/IntegrationClickFormTypeSchema";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const createContainerIntegrationClick = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_containers_resources_create_integration_click",
    "Send an integration click event for a container. Use this endpoint to record when a user clicks an integration action button (e.g., 'learn more', 'install') for a specific integration type and name.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
      ...IntegrationClickFormTypeSchema.shape,
    },
    async ({
      identifier,
      integrationType,
      integrationName,
      buttonType,
      userWorkspaceIdentifier,
    }) => {
      log(
        `Running tool: containers_resources_create_integration_click for identifier ${identifier}, integrationType ${integrationType}, integrationName ${integrationName}, buttonType ${buttonType}`,
      );

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const response = await httpClient.post<unknown>(
          `/containers/${encodeURIComponent(identifier)}/integration-click`,
          JSON.stringify({ integrationType, integrationName, buttonType }),
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
          "Failed to create integration click record (containers_resources_create_integration_click)",
          error,
        );
      }
    },
  );
};
