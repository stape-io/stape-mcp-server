import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { OptionModel } from "../../models/OptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getStapeGatewayDomainCdnTypes = (server: McpServer): void =>
  server.tool(
    "resource_get_stape_gateway_domain_cdn_types",
    "Gets stape gateway domain CDN types as options.",
    {},
    async () => {
      log("Running tool: resource_get_stape_gateway_domain_cdn_types");

      try {
        const response = await httpClient.get<OptionModel[]>(
          "/resources/stape-gateway-domain-cdn-types",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get stape gateway domain CDN types",
          error,
        );
      }
    },
  );
