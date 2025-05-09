import { z } from "zod";

export const OptionFormSchema = z.object({
  type: z
    .string()
    .optional()
    .describe("Zone type: ap, eu, jp, sa, us and etc."),
});
