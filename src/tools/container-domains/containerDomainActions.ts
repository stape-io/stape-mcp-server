import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { ContainerDomainModel } from "../../models/ContainerDomainModel";
import { EntriAuthorizationResultModel } from "../../models/EntriAuthorizationResultModel";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { PaginationModel } from "../../models/PaginationModel";
import { ContainerDomainPaginationSchema } from "../../schemas/ContainerDomainsCrudSchemas";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const containerDomainActions = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_container_domains",
    "Comprehensive tool for managing container domains. Supports CRUD operations, validation, and Entri authorization. Use the 'action' parameter to specify the operation: 'list', 'get', 'create', 'update', 'delete', 'validate', 'revalidate', 'get_entri'.",
    {
      action: z
        .enum([
          "list",
          "get",
          "create",
          "update",
          "delete",
          "validate",
          "revalidate",
          "get_entri",
        ])
        .describe("The operation to perform on container domains."),
      container: z.string().describe("Container identifier."),
      domain: z
        .string()
        .optional()
        .describe(
          "Domain identifier (required for 'get', 'update', 'delete', 'revalidate', 'get_entri', 'validate' actions).",
        ),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The unique user workspace identifier."),
      paginationConfig: ContainerDomainPaginationSchema.optional().describe(
        "Pagination configuration for 'list' action.",
      ),
      name: z
        .string()
        .optional()
        .describe(
          "Domain name. For 'update', 'create', 'validate' actions. Required when action is 'create.'",
        ),
      cdnType: z
        .string()
        .optional()
        .describe(
          "CDN type for the domain. For 'update', 'create', 'validate' actions.",
        ),
      useCnameRecord: z
        .boolean()
        .optional()
        .describe(
          "Whether to use a CNAME record for the domain. For 'update', 'create', 'validate' actions.",
        ),
      connectionType: z
        .string()
        .optional()
        .describe(
          "Connection type for the domain.  For 'update', 'create', 'validate' actions.",
        ),
    },
    async ({
      action,
      container,
      domain,
      userWorkspaceIdentifier,
      paginationConfig,
      name,
      cdnType,
      useCnameRecord,
      connectionType,
    }): Promise<CallToolResult> => {
      log(
        `Running tool: stape_container_domains - action: ${action} for container ${container}`,
      );

      try {
        const httpClient = new HttpClient(props.apiBaseUrl, props.apiKey);
        const headers = userWorkspaceIdentifier
          ? { "X-WORKSPACE": userWorkspaceIdentifier }
          : undefined;

        switch (action) {
          case "list": {
            const queryParams: Record<string, string | number> = {};

            if (paginationConfig) {
              if (paginationConfig.limit !== undefined) {
                queryParams.limit = paginationConfig.limit;
              }
              if (paginationConfig.offset !== undefined) {
                queryParams.offset = paginationConfig.offset;
              }
              if (paginationConfig.page !== undefined) {
                queryParams.page = paginationConfig.page;
              }
              if (paginationConfig.status !== undefined) {
                queryParams.status = paginationConfig.status;
              }
            }

            const response = await httpClient.get<
              PaginationModel<ContainerDomainModel>
            >(`/containers/${encodeURIComponent(container)}/domains`, {
              headers,
              queryParams,
            });
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }

          case "get": {
            if (!domain) {
              throw new Error(
                `domain parameter is required for ${action} action`,
              );
            }

            const response = await httpClient.get<ContainerDomainModel>(
              `/containers/${encodeURIComponent(container)}/domains/${encodeURIComponent(domain)}`,
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }

          case "create": {
            if (!name) {
              throw new Error(`name is required for ${action} action`);
            }

            const response = await httpClient.post<ContainerDomainModel>(
              `/containers/${encodeURIComponent(container)}/domains`,
              JSON.stringify({
                name,
                cdnType,
                useCnameRecord,
                connectionType,
              }),
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }

          case "update": {
            if (!domain) {
              throw new Error(
                `Domain parameter is required for ${action} action`,
              );
            }

            const response = await httpClient.put<ContainerDomainModel>(
              `/containers/${encodeURIComponent(container)}/domains/${encodeURIComponent(domain)}`,
              JSON.stringify({
                name,
                cdnType,
                useCnameRecord,
                connectionType,
              }),
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }

          case "delete": {
            if (!domain) {
              throw new Error(
                `domain parameter is required for ${action} action`,
              );
            }

            const response = await httpClient.delete(
              `/containers/${encodeURIComponent(container)}/domains/${encodeURIComponent(domain)}`,
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }

          case "validate": {
            if (!domain) {
              throw new Error(
                `domain parameter is required for ${action} action`,
              );
            }

            const response = await httpClient.post(
              `/containers/${encodeURIComponent(container)}/domains/validate`,
              JSON.stringify({
                name,
                cdnType,
                useCnameRecord,
                connectionType,
              }),
              { headers },
            );
            return {
              content: [
                { type: "text", text: JSON.stringify(response, null, 2) },
              ],
            };
          }

          case "revalidate": {
            if (!domain) {
              throw new Error(
                `domain parameter is required for ${action} action`,
              );
            }
            await httpClient.post(
              `/containers/${encodeURIComponent(container)}/domains/${encodeURIComponent(domain)}/revalidate`,
              undefined,
              { headers },
            );
            return { content: [] };
          }

          case "get_entri": {
            if (!domain) {
              throw new Error(
                `domain parameter is required for ${action} action`,
              );
            }

            const response =
              await httpClient.get<EntriAuthorizationResultModel>(
                `/containers/${encodeURIComponent(container)}/domains/${encodeURIComponent(domain)}/entri`,
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
          `Failed to perform container domain operation: ${action}`,
          error,
        );
      }
    },
  );
};
