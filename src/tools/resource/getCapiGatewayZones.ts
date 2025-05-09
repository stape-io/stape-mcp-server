import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { OptionModel } from "../../models/OptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getCapiGatewayZones = (server: McpServer): void =>
  server.tool(
    "resource_get_capi_gateway_zones",
    "Gets CAPI gateway zones as options.",
    {},
    async (): Promise<CallToolResult> => {
      log("Running tool: resource_get_capi_gateway_zones");

      try {
        const response = await httpClient.get<OptionModel[]>(
          "/resources/capi-gateway-zones",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse("Failed to get CAPI gateway zones", error);
      }
    },
  );
