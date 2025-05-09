import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { OptionModel } from "../../models/OptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getSnapchatGatewayZones = (server: McpServer): void =>
  server.tool(
    "resource_get_snapchat_gateway_zones",
    "Gets snapchat gateway zones as options.",
    {},
    async () => {
      log("Running tool: resource_get_snapchat_gateway_zones");

      try {
        const response = await httpClient.get<OptionModel[]>(
          "/resources/snapchat-gateway-zones",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get snapchat gateway zones",
          error,
        );
      }
    },
  );
