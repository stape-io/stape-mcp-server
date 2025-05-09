import { z } from "zod";

export const ContainerCodeSettingsFormTypeSchema = z.object({
  domain: z.string().optional().describe("Domain for the container code."),
  webGtmId: z.string().optional().describe("Web GTM ID."),
  platform: z.string().optional().describe("Platform (e.g., wordpress)."),
  userIdentifierType: z
    .string()
    .optional()
    .describe("Type of user identifier (e.g., cookie)."),
  userIdentifierValue: z
    .string()
    .optional()
    .describe("Value of the user identifier."),
  htmlAttribute: z
    .string()
    .optional()
    .describe("HTML attribute for identification."),
  dataLayer: z.string().optional().describe("Data layer configuration."),
  useCdn: z.boolean().optional().describe("Use CDN for code delivery."),
  useCookieKeeper: z
    .boolean()
    .optional()
    .describe("Use cookie keeper in code."),
  useOriginalGtmCode: z.boolean().optional().describe("Use original GTM code."),
  useAdblockBypass: z.boolean().optional().describe("Enable adblock bypass."),
  customProxyPath: z.string().optional().describe("Custom proxy path."),
});
