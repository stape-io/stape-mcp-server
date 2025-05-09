import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { OptionModel } from "../../models/OptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getStapeGatewayStatuses = (server: McpServer): void =>
  server.tool(
    "resource_get_stape_gateway_statuses",
    "Gets stape gateway statuses as options.",
    {},
    async () => {
      log("Running tool: resource_get_stape_gateway_statuses");

      try {
        const response = await httpClient.get<OptionModel[]>(
          "/resources/stape-gateway-statuses",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get stape gateway statuses",
          error,
        );
      }
    },
  );
