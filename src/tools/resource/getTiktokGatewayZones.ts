import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { OptionModel } from "../../models/OptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getTiktokGatewayZones = (server: McpServer): void =>
  server.tool(
    "resource_get_tiktok_gateway_zones",
    "Gets tiktok gateway zones as options.",
    {},
    async () => {
      log("Running tool: resource_get_tiktok_gateway_zones");

      try {
        const response = await httpClient.get<OptionModel[]>(
          "/resources/tiktok-gateway-zones",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse("Failed to get tiktok gateway zones", error);
      }
    },
  );
