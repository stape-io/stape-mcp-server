import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { API_APP_STAPE_IO } from "../../constants/api";
import { ContainerModel } from "../../models/ContainerModel";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { ContainerCodeSettingsFormTypeSchema } from "../../schemas/ContainerCodeSettingsFormTypeSchema";
import { ContainerCookieKeeperFormType2Schema } from "../../schemas/ContainerCookieKeeperFormType2Schema";
import { OptionFormSchema } from "../../schemas/OptionFormSchema";
import { createErrorResponse, HttpClient, log } from "../../utils";

export const createContainer = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "stape_containers_create_container",
    "Creates a new container and returns the full container model.",
    {
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
      name: z.string().describe("Name of the container."),
      code: z.string().describe("Container code (unique string identifier)."),
      codeSettings: ContainerCodeSettingsFormTypeSchema.optional().describe(
        "Settings for the container code.",
      ),
      zone: OptionFormSchema.optional().describe(
        "Zone configuration for the container.",
      ),
      previewHeader: z
        .string()
        .optional()
        .describe("Preview header value for the container."),
      geoHeaders: z.boolean().optional().describe("Enable geo headers."),
      xmlToJsonEnabled: z
        .boolean()
        .optional()
        .describe("Enable XML to JSON conversion."),
      delayEnabled: z
        .boolean()
        .optional()
        .describe("Enable request delay for the container."),
      stapeUserIdHeaderEnabled: z
        .boolean()
        .optional()
        .describe("Enable X-STAPE-USER-ID header."),
      botIndexEnabled: z
        .boolean()
        .optional()
        .describe("Enable bot index for the container."),
      userAgentHeaders: z
        .boolean()
        .optional()
        .describe("Enable user agent headers."),
      cookieKeeperOptions:
        ContainerCookieKeeperFormType2Schema.optional().describe(
          "Cookie keeper options for the container.",
        ),
      serviceAccountCredentials: z
        .string()
        .optional()
        .describe("Service account credentials."),
    },
    async ({ userWorkspaceIdentifier, ...body }) => {
      log("Running tool: stape_containers_create_container");

      try {
        const httpClient = new HttpClient(API_APP_STAPE_IO, props.apiKey);
        const response = await httpClient.post<ContainerModel>(
          "/containers",
          JSON.stringify(body),
          {
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
          "Failed to create container (containers_create_container)",
          error,
        );
      }
    },
  );
};
