import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ContainerPlanOptionModel } from "../../models/ContainerPlanOptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getContainerPlans = (server: McpServer): void =>
  server.tool(
    "containers_resources_get_plans",
    "Retrieve available subscription plans for a container. Requires the container identifier as a path parameter. Returns an array of ContainerPlanOptionModel.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
    },
    async ({ identifier, userWorkspaceIdentifier }) => {
      log(
        `Running tool: containers_resources_get_plans for identifier ${identifier}`,
      );

      try {
        const response = await httpClient.get<ContainerPlanOptionModel[]>(
          `/containers/${encodeURIComponent(identifier)}/plans`,
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
          "Failed to get container plans (containers_resources_get_plans)",
          error,
        );
      }
    },
  );
