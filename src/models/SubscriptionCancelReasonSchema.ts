import { z } from "zod";

export const OptionFormSchema = z.object({
  type: z
    .string()
    .optional()
    .describe("Region type: ap, eu, jp, sa, us and etc."),
});

export const SubscriptionCancelReasonSchema = z.object({
  setup: z
    .array(OptionFormSchema)
    .optional()
    .describe("Array of setup reasons, each with a region type."),
  cancel: z
    .array(OptionFormSchema)
    .optional()
    .describe("Array of cancel reasons, each with a region type."),
  setupReasonDetails: z
    .string()
    .optional()
    .describe("Detailed reason for setup."),
  cancelReasonDetails: z
    .string()
    .optional()
    .describe("Detailed reason for cancellation."),
});
