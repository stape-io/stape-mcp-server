import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { OptionModel } from "../../models/OptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getSubAccountPermissionTypes = (server: McpServer): void =>
  server.tool(
    "resource_get_sub_account_permission_types",
    "Gets sub-account permission types as options.",
    {},
    async () => {
      log("Running tool: resource_get_sub_account_permission_types");

      try {
        const response = await httpClient.get<OptionModel[]>(
          "/resources/sub-account-permission-types",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get sub-account permission types",
          error,
        );
      }
    },
  );
