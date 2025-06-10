import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { API_APP_STAPE_IO } from "../../constants/api";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { OptionModel } from "../../models/OptionModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const getStapeGatewayZones = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_resource_get_stape_gateway_zones",
    "Gets stape gateway zones as options.",
    {},
    async () => {
      log("Running tool: stape_resource_get_stape_gateway_zones");

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
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
};
