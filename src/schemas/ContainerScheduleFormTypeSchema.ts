import { z } from "zod";

export const ContainerScheduleFormTypeSchema = z.object({
  domain: z
    .object({
      identifier: z.string().optional().describe("Domain identifier."),
    })
    .optional()
    .describe("Domain object with identifier."),
  path: z.string().optional().describe("Path to schedule."),
  hour: z
    .number()
    .optional()
    .describe("Hour at which the schedule triggers (0-23)."),
  minute: z
    .number()
    .optional()
    .describe("Minute at which the schedule triggers (0-59)."),
  frequencyType: z
    .string()
    .optional()
    .describe(
      "Frequency type for the schedule. Currently only 'onceADay' is supported.",
    ),
});
