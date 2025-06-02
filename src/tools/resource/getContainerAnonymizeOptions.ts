import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { API_APP_STAPE_IO } from "../../constants/api";
import { ContainerAnonymizeCategoryOptionModel } from "../../models/ContainerAnonymizeCategoryOptionModel";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const getContainerAnonymizeOptions = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_resource_get_container_anonymize_options",
    "Gets container anonymize options as categories.",
    {},
    async (): Promise<CallToolResult> => {
      log("Running tool: stape_resource_get_container_anonymize_options");

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
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
};
