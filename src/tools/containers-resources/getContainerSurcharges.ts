import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { ContainerSurchargesModel } from "../../models/ContainerSurchargesModel";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const getContainerSurcharges = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_containers_resources_get_surcharges",
    "Retrieve the current surcharges amount for a container. Requires the container identifier as a path parameter. Returns the surcharge amount.",
    {
      identifier: z.string().describe("Container identifier."),
      plan: z.string().optional().describe("Subscription plan."),
      period: z.string().optional().describe("Subscription period."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
    },
    async ({ identifier, userWorkspaceIdentifier, ...queryParams }) => {
      log(
        `Running tool: containers_resources_get_surcharges for identifier ${identifier}`,
      );

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const response = await httpClient.get<ContainerSurchargesModel>(
          `/containers/${encodeURIComponent(identifier)}/surcharges`,
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
          "Failed to get container surcharges (containers_resources_get_surcharges)",
          error,
        );
      }
    },
  );
};
