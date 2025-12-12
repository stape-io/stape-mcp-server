import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { ContainerProxyFile } from "../../models/ContainerProxyFileFormTypeModel";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { ContainerProxyFilesConfigSchema } from "../../schemas/ContainerProxyFilesCrudSchemas";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const containerProxyFilesActions = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_container_proxy_files",
    "Comprehensive tool for managing container proxy files. Supports getting proxy files and updating/replacing all proxy files for a container. Use the 'action' parameter to specify the operation: 'get' or 'update'.",
    {
      action: z
        .enum(["get", "update"])
        .describe(
          "The action to perform: 'get' to retrieve proxy files, or 'update' to replace all proxy files.",
        ),
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The unique user workspace identifier."),
      proxyFilesConfig: ContainerProxyFilesConfigSchema.optional().describe(
        "Proxy files configuration for updating proxy files. Required when action is 'update'.",
      ),
    },
    async ({
      action,
      identifier,
      userWorkspaceIdentifier,
      proxyFilesConfig,
    }): Promise<CallToolResult> => {
      log(`Running tool: stape_container_proxy_files - action: ${action}`);

      try {
        const httpClient = new HttpClient(props.apiBaseUrl, props.apiKey);
        const headers = userWorkspaceIdentifier
          ? { "X-WORKSPACE": userWorkspaceIdentifier }
          : undefined;

        switch (action) {
          case "get": {
            const response = await httpClient.get<ContainerProxyFile[]>(
              `/containers/${encodeURIComponent(identifier)}/proxy-files`,
              { headers },
            );

            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }

          case "update": {
            if (!proxyFilesConfig) {
              throw new Error(
                `proxyFilesConfig is required for ${action} action`,
              );
            }

            const response = await httpClient.put<ContainerProxyFile[]>(
              `/containers/${encodeURIComponent(identifier)}/proxy-files`,
              JSON.stringify({
                containerProxyFiles: proxyFilesConfig.containerProxyFiles,
              }),
              { headers },
            );

            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }

          default:
            throw new Error(`Unknown action: ${action}`);
        }
      } catch (error) {
        return createErrorResponse(
          `Failed to perform container proxy files operation: ${action}`,
          error,
        );
      }
    },
  );
};
