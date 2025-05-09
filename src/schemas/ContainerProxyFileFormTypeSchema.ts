import { z } from "zod";
import { CacheMaxAgeSchema } from "./CacheMaxAgeSchema";

export const ContainerProxyFileFormTypeSchema = z.object({
  originalFileUrl: z
    .string()
    .optional()
    .describe("The original file URL to be proxied."),
  customPath: z
    .string()
    .optional()
    .describe("Custom path for the proxied file."),
  cacheMaxAge: CacheMaxAgeSchema.optional().describe(
    "Cache max-age in seconds. Required. Use -1 for no cache, or one of the allowed TTL values.",
  ),
});
