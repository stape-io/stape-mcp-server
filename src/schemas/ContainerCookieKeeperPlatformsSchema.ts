import { z } from "zod";

export const ContainerCookieKeeperPlatformsSchema = z.object({
  stape: z.boolean().optional().describe("Enable for Stape platform."),
  ga: z.boolean().optional().describe("Enable for Google Analytics."),
  gads: z.boolean().optional().describe("Enable for Google Ads."),
  tikTok: z.boolean().optional().describe("Enable for TikTok."),
  facebook: z.boolean().optional().describe("Enable for Facebook."),
  affiliates: z.boolean().optional().describe("Enable for Affiliates."),
  klaviyo: z.boolean().optional().describe("Enable for Klaviyo."),
  snapchat: z.boolean().optional().describe("Enable for Snapchat."),
  linkedin: z.boolean().optional().describe("Enable for LinkedIn."),
  microsoft_bing: z.boolean().optional().describe("Enable for Microsoft Bing."),
  pinterest: z.boolean().optional().describe("Enable for Pinterest."),
  google_d_and_v_360: z
    .boolean()
    .optional()
    .describe("Enable for Google DV360."),
});
