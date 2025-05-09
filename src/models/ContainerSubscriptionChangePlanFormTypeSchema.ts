import { z } from "zod";

export const ContainerSubscriptionChangePlanFormTypeSchema = z.object({
  plan: z.string().optional().describe("The subscription plan to change to."),
  period: z
    .string()
    .optional()
    .describe("The subscription period (e.g., monthly, yearly)."),
  promoCode: z
    .string()
    .optional()
    .describe("An optional promo code for the subscription."),
  autoUpgrade: z
    .boolean()
    .optional()
    .describe("Whether auto-upgrade is enabled for this subscription."),
});
