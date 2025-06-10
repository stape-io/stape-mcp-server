import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { API_APP_STAPE_IO } from "../../constants/api";
import { ContainerZoneOptionModel } from "../../models/ContainerZoneOptionModel";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const getContainerCustomZones = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_resource_get_container_custom_zones",
    "Gets container custom zones as options.",
    {},
    async (): Promise<CallToolResult> => {
      log("Running tool: stape_resource_get_container_custom_zones");

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const response = await httpClient.get<ContainerZoneOptionModel[]>(
          "/resources/container-custom-zones",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get container custom zones",
          error,
        );
      }
    },
  );
};
