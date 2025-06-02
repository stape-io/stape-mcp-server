import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { CustomDomainDnsRecordModel } from "../../models/CustomDomainDnsRecordModel";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const getContainerExampleDomainRecords = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_containers_resources_get_example_domain_records",
    "Retrieves example DNS records for a container's custom domains. Use this endpoint to get the recommended DNS record types, hosts, domains, and values for configuring custom domains for the specified container. Accepts domain, cdnType ('none', 'custom', 'stape'), and useCnameRecord ('true', 'false') as query parameters.",
    {
      identifier: z.string().describe("Container identifier."),
      domain: z
        .string()
        .optional()
        .describe("Domain name for which to retrieve example DNS records."),
      cdnType: z
        .string()
        .optional()
        .describe("CDN type to use for the DNS record."),
      useCnameRecord: z
        .enum(["true", "false"])
        .optional()
        .describe(
          "Whether to use CNAME record. Allowed values: 'true', 'false'.",
        ),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
    },
    async ({ identifier, userWorkspaceIdentifier, ...queryParams }) => {
      log(
        `Running tool: containers_resources_get_example_domain_records for identifier ${identifier}`,
      );

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const response = await httpClient.get<CustomDomainDnsRecordModel[]>(
          `/containers/${encodeURIComponent(identifier)}/example-domain-records`,
          {
            queryParams,
            headers: userWorkspaceIdentifier
              ? { "X-WORKSPACE": userWorkspaceIdentifier }
              : undefined,
          },
        );

        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return createErrorResponse(
          "Failed to get example domain records (containers_resources_get_example_domain_records)",
          error,
        );
      }
    },
  );
};
