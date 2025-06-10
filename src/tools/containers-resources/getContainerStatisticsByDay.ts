import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { ContainerUsageStatisticsByDayModel } from "../../models/ContainerUsageStatisticsByDayModel";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const getContainerStatisticsByDay = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_containers_resources_get_statistics_by_day",
    "Retrieves daily usage statistics for a container. Get current and previous billing period statistics by day, including detailed usage data. Use this endpoint to analyze daily resource consumption trends for the specified container.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
    },
    async ({ identifier, userWorkspaceIdentifier }) => {
      log(
        `Running tool: containers_resources_get_statistics_by_day for identifier ${identifier}`,
      );

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const response = await httpClient.get<
          ContainerUsageStatisticsByDayModel[]
        >(`/containers/${encodeURIComponent(identifier)}/statistics-by-day`, {
          headers: userWorkspaceIdentifier
            ? { "X-WORKSPACE": userWorkspaceIdentifier }
            : undefined,
        });

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get container statistics by day (containers_resources_get_statistics_by_day)",
          error,
        );
      }
    },
  );
};
