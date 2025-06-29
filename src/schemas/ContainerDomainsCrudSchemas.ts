import { z } from "zod";

// Pagination parameters schema
export const ContainerDomainPaginationSchema = z.object({
  limit: z
    .number()
    .optional()
    .describe("Maximum number of domains to return (for list action)."),
  offset: z
    .number()
    .optional()
    .describe("Offset for pagination (for list action)."),
  page: z
    .number()
    .optional()
    .describe("Page number for pagination (for list action)."),
  status: z
    .string()
    .optional()
    .describe("Status filter for domains (for list action)."),
});
