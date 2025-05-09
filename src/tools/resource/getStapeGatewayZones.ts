import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { OptionModel } from "../../models/OptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getStapeGatewayZones = (server: McpServer): void =>
  server.tool(
    "resource_get_stape_gateway_zones",
    "Gets stape gateway zones as options.",
    {},
    async () => {
      log("Running tool: resource_get_stape_gateway_zones");

      try {
        const response = await httpClient.get<OptionModel[]>(
          "/resources/stape-gateway-zones",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse("Failed to get stape gateway zones", error);
      }
    },
  );
