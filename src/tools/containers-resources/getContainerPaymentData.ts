import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ContainerPaymentDataModel } from "../../models/ContainerPaymentDataModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getContainerPaymentData = (server: McpServer): void =>
  server.tool(
    "containers_resources_get_payment_data",
    "Retrieve payment data (price and tax) for a container subscription. Requires the container identifier as a path parameter. Returns the payment data (price and tax) for the container subscription.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
    },
    async ({ identifier, userWorkspaceIdentifier }) => {
      log(
        `Running tool: containers_resources_get_payment_data for identifier ${identifier}`,
      );

      try {
        const response = await httpClient.get<ContainerPaymentDataModel>(
          `/containers/${encodeURIComponent(identifier)}/payment-data`,
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
          "Failed to get container payment data (containers_resources_get_payment_data)",
          error,
        );
      }
    },
  );
