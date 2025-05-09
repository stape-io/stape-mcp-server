import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { OptionModel } from "../../models/OptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getContainerDomainIssuerTypes = (server: McpServer): void =>
  server.tool(
    "resource_get_container_domain_issuer_types",
    "Gets container domain issuer types as options.",
    {},
    async (): Promise<CallToolResult> => {
      log("Running tool: resource_get_container_domain_issuer_types");

      try {
        const response = await httpClient.get<OptionModel[]>(
          "/resources/container-domain-issuer-types",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get container domain issuer types",
          error,
        );
      }
    },
  );
