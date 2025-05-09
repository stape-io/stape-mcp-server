import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { OptionModel } from "../../models/OptionModel";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const getBillingReportTypes = (server: McpServer): void =>
  server.tool(
    "resource_get_billing_report_types",
    "Gets billing report types as options.",
    {},
    async () => {
      log("Running tool: resource_get_billing_report_types");

      try {
        const response = await httpClient.get<OptionModel[]>(
          "/resources/billing-report-types",
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse("Failed to get billing report types", error);
      }
    },
  );
