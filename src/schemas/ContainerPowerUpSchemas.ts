import { z } from "zod";
import { ContainerCookieKeeperFormType2Schema } from "./ContainerCookieKeeperFormType2Schema";
import { ContainerProxyFileFormTypeSchema } from "./ContainerProxyFileFormTypeSchema";
import { ContainerScheduleFormTypeSchema } from "./ContainerScheduleFormTypeSchema";

// Define specific schemas for each power-up type
export const AnonymizerSchema = z.object({
  isActive: z.boolean().describe("Whether the anonymizer power-up is active."),
  sp_ip: z.string().optional().describe("Anonymize sp_ip field (e.g., 'n')."),
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
  uafvl: z.string().optional().describe("Anonymize uafvl field (e.g., 'n')."),
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
  gclid: z.string().optional().describe("Anonymize gclid field (e.g., 'n')."),
  dclid: z.string().optional().describe("Anonymize dclid field (e.g., 'n')."),
});

export const CookieKeeperSchema = z.object({
  isActive: z
    .boolean()
    .describe("Whether the cookie keeper power-up is active."),
  options: ContainerCookieKeeperFormType2Schema.optional().describe(
    "Cookie keeper options.",
  ),
});

export const PreviewHeaderConfigSchema = z.object({
  isActive: z
    .boolean()
    .describe("Whether the preview header config power-up is active."),
  options: z.string().optional().describe("Preview header config options."),
});

export const ProxyFilesSchema = z.object({
  isActive: z.boolean().describe("Whether the proxy files power-up is active."),
  options: z
    .array(ContainerProxyFileFormTypeSchema)
    .optional()
    .describe("Proxy files configuration."),
});

export const ScheduleSchema = z.object({
  isActive: z.boolean().describe("Whether the schedule power-up is active."),
  options: z
    .array(ContainerScheduleFormTypeSchema)
    .optional()
    .describe("Array of schedule configuration objects."),
});

export const ServiceAccountSchema = z.object({
  isActive: z
    .boolean()
    .describe("Whether the service account power-up is active."),
  options: z.string().optional().describe("Service account power-up options."),
});
