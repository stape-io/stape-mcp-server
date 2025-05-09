import { z } from "zod";

export const ContainerDomainFormSchema = z.object({
  name: z.string().optional().describe("Domain name to add or update."),
  cdnType: z.string().optional().describe("CDN type for the domain."),
  useCnameRecord: z
    .boolean()
    .optional()
    .describe("Whether to use a CNAME record for the domain."),
  connectionType: z
    .string()
    .optional()
    .describe("Connection type for the domain."),
});
