import { z } from "zod";
import { CacheMaxAgeSchema } from "./CacheMaxAgeSchema";

// Individual proxy file schema
export const ContainerProxyFileSchema = z.object({
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

// Proxy files configuration schema
export const ContainerProxyFilesConfigSchema = z.object({
  containerProxyFiles: z
    .array(ContainerProxyFileSchema)
    .describe("Array of proxy files to be set for the container."),
});
