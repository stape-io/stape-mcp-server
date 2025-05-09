import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { OptionModel } from "../../models/OptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getCapiGatewayStatuses = (server: McpServer): void =>
  server.tool(
    "resource_get_capi_gateway_statuses",
    "Gets CAPI gateway statuses as options.",
    {},
    async (): Promise<CallToolResult> => {
      log("Running tool: resource_get_capi_gateway_statuses");

      try {
        const response = await httpClient.get<OptionModel[]>(
          "/resources/capi-gateway-statuses",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get CAPI gateway statuses",
          error,
        );
      }
    },
  );
