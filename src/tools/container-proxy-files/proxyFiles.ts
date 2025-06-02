import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { ContainerProxyFile } from "../../models/ContainerProxyFileFormTypeModel";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { ContainerProxyFileFormTypeSchema } from "../../schemas/ContainerProxyFileFormTypeSchema";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const getContainerProxyFiles = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_container_get_proxy_files",
    "Gets proxy files for a container by identifier.",
    {
      identifier: z.string().describe("Container identifier"),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
    },
    async ({
      identifier,
      userWorkspaceIdentifier,
    }): Promise<CallToolResult> => {
      log(
        `Running tool: container_get_proxy_files for identifier ${identifier}`,
      );

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const response = await httpClient.get<ContainerProxyFile[]>(
          `/containers/${encodeURIComponent(identifier)}/proxy-files`,
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
          "Failed to get container proxy files",
          error,
        );
      }
    },
  );
};

export const updateContainerProxyFiles = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_container_update_proxy_files",
    "Updates proxy files for a container by identifier.",
    {
      identifier: z.string().describe("Container identifier"),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
      containerProxyFiles: z
        .array(ContainerProxyFileFormTypeSchema)
        .optional()
        .describe(
          "Array of proxy files to be set for the container. All fields required.",
        ),
    },
    async ({
      identifier,
      userWorkspaceIdentifier,
      containerProxyFiles,
    }): Promise<CallToolResult> => {
      log(
        `Running tool: container_update_proxy_files for identifier ${identifier}`,
      );

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const response = await httpClient.put<ContainerProxyFile[]>(
          `/containers/${encodeURIComponent(identifier)}/proxy-files`,
          JSON.stringify({ containerProxyFiles }),
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
          "Failed to update container proxy files",
          error,
        );
      }
    },
  );
};
