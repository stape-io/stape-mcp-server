import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ContainerModel } from "../../models/ContainerModel";
import { ContainerCodeSettingsFormTypeSchema } from "../../schemas/ContainerCodeSettingsFormTypeSchema";
import { ContainerCookieKeeperFormType2Schema } from "../../schemas/ContainerCookieKeeperFormType2Schema";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const updateContainer = (server: McpServer): void =>
  server.tool(
    "containers_update_container",
    "Updates a container by its identifier.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
      name: z.string().describe("Name of the container."),
      code: z.string().describe("Container code (unique string identifier)."),
      codeSettings: ContainerCodeSettingsFormTypeSchema.optional().describe(
        "Settings for the container code.",
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
    async ({ identifier, userWorkspaceIdentifier, ...body }) => {
      log("Running tool: containers_update_container");

      try {
        const response = await httpClient.put<ContainerModel>(
          `/containers/${identifier}`,
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
          "Failed to update container (containers_update_container)",
          error,
        );
      }
    },
  );
