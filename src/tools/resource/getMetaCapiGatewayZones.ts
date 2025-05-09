import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { OptionModel } from "../../models/OptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getMetaCapiGatewayZones = (server: McpServer): void =>
  server.tool(
    "resource_meta_capi_gateway_zones",
    "Gets list of available CAPI gateway zones",
    {},
    async (): Promise<CallToolResult> => {
      log("Running tool: resource_meta_capi_gateway_zones");

      try {
        const response = await httpClient.get<OptionModel[]>(
          "/resources/meta/capi-gateway-zones",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get resource_meta_capi_gateway_zones tool data",
          error,
        );
      }
    },
  );
