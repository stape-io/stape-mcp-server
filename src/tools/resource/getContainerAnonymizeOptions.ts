import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { ContainerAnonymizeCategoryOptionModel } from "../../models/ContainerAnonymizeCategoryOptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getContainerAnonymizeOptions = (server: McpServer): void =>
  server.tool(
    "resource_get_container_anonymize_options",
    "Gets container anonymize options as categories.",
    {},
    async (): Promise<CallToolResult> => {
      log("Running tool: resource_get_container_anonymize_options");

      try {
        const response = await httpClient.get<
          ContainerAnonymizeCategoryOptionModel[]
        >("/resources/container-anonymize-options");

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get container anonymize options",
          error,
        );
      }
    },
  );
