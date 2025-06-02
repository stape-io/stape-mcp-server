import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { ContainerUsageStatistics } from "../../models/ContainerUsageStatistics";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const getContainerStatistics = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_containers_resources_get_statistics",
    "Retrieves usage statistics for a container. Get container usage statistics for the last 12 billing periods, including billing period start/end and detailed usage data. Optionally filter by domain name (host parameter). Use this endpoint to analyze historical resource consumption and trends for the specified container.",
    {
      identifier: z.string().describe("Container identifier."),
      host: z
        .string()
        .optional()
        .describe("Domain name to filter statistics by (host parameter)."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
    },
    async ({ identifier, userWorkspaceIdentifier, ...queryParams }) => {
      log(
        `Running tool: containers_resources_get_statistics for identifier ${identifier}`,
      );

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const response = await httpClient.get<ContainerUsageStatistics[]>(
          `/containers/${encodeURIComponent(identifier)}/statistics`,
          {
            headers: userWorkspaceIdentifier
              ? { "X-WORKSPACE": userWorkspaceIdentifier }
              : undefined,
            queryParams,
          },
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get container statistics (containers_resources_get_statistics)",
          error,
        );
      }
    },
  );
};
