import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { createErrorResponse, log } from "../../utils";
import httpClient from "../../utils/httpClient";

export const updateAnonymizerPowerUp = (server: McpServer): void =>
  server.tool(
    "containers_update_anonymizer_power_up",
    "Updates the anonymizer power-up activation state and options for a container.",
    {
      identifier: z.string().describe("Container identifier."),
      userWorkspaceIdentifier: z
        .string()
        .optional()
        .describe("The uniq user workspace identifier."),
      isActive: z
        .boolean()
        .describe("Whether the anonymizer power-up is active."),
      sp_ip: z
        .string()
        .optional()
        .describe("Anonymize sp_ip field (e.g., 'n')."),
      cid: z.string().optional().describe("Anonymize cid field (e.g., 'n')."),
      uid: z.string().optional().describe("Anonymize uid field (e.g., 'n')."),
      sid: z.string().optional().describe("Anonymize sid field (e.g., 'n')."),
      dl: z.string().optional().describe("Anonymize dl field (e.g., 'n')."),
      dr: z.string().optional().describe("Anonymize dr field (e.g., 'n')."),
      sct: z.string().optional().describe("Anonymize sct field (e.g., 'n')."),
      seg: z.string().optional().describe("Anonymize seg field (e.g., 'n')."),
      jid: z.string().optional().describe("Anonymize jid field (e.g., 'n')."),
      gjid: z.string().optional().describe("Anonymize gjid field (e.g., 'n')."),
      ua: z.string().optional().describe("Anonymize ua field (e.g., 'n')."),
      uc: z.string().optional().describe("Anonymize uc field (e.g., 'n')."),
      je: z.string().optional().describe("Anonymize je field (e.g., 'n')."),
      sr: z.string().optional().describe("Anonymize sr field (e.g., 'n')."),
      sd: z.string().optional().describe("Anonymize sd field (e.g., 'n')."),
      ul: z.string().optional().describe("Anonymize ul field (e.g., 'n')."),
      uaa: z.string().optional().describe("Anonymize uaa field (e.g., 'n')."),
      uab: z.string().optional().describe("Anonymize uab field (e.g., 'n')."),
      uafvl: z
        .string()
        .optional()
        .describe("Anonymize uafvl field (e.g., 'n')."),
      uamb: z.string().optional().describe("Anonymize uamb field (e.g., 'n')."),
      uam: z.string().optional().describe("Anonymize uam field (e.g., 'n')."),
      uap: z.string().optional().describe("Anonymize uap field (e.g., 'n')."),
      uapv: z.string().optional().describe("Anonymize uapv field (e.g., 'n')."),
      uaw: z.string().optional().describe("Anonymize uaw field (e.g., 'n')."),
      cm: z.string().optional().describe("Anonymize cm field (e.g., 'n')."),
      cs: z.string().optional().describe("Anonymize cs field (e.g., 'n')."),
      cn: z.string().optional().describe("Anonymize cn field (e.g., 'n')."),
      cc: z.string().optional().describe("Anonymize cc field (e.g., 'n')."),
      ci: z.string().optional().describe("Anonymize ci field (e.g., 'n')."),
      ck: z.string().optional().describe("Anonymize ck field (e.g., 'n')."),
      ccf: z.string().optional().describe("Anonymize ccf field (e.g., 'n')."),
      cmt: z.string().optional().describe("Anonymize cmt field (e.g., 'n')."),
      gclid: z
        .string()
        .optional()
        .describe("Anonymize gclid field (e.g., 'n')."),
      dclid: z
        .string()
        .optional()
        .describe("Anonymize dclid field (e.g., 'n')."),
    },
    async ({ identifier, userWorkspaceIdentifier, ...body }) => {
      log("Running tool: containers_update_anonymizer_power_up");
      try {
        const response = await httpClient.patch(
          `/containers/${identifier}/power-ups/anonymizer`,
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
          "Failed to patch anonymizer power-up (containers_update_anonymizer_power_up)",
          error,
        );
      }
    },
  );
