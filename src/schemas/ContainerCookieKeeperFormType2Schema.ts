import { z } from "zod";
import { ContainerCookieKeeperPlatformsSchema } from "./ContainerCookieKeeperPlatformsSchema";

export const ContainerCookieKeeperFormType2Schema = z.object({
  standard: ContainerCookieKeeperPlatformsSchema.optional().describe(
    "Standard cookie keeper options (by tag name).",
  ),
  custom: z
    .array(
      z.object({
        name: z.string().optional().describe("Custom cookie keeper name."),
        t: z.number().optional().describe("Custom cookie keeper type/id."),
      }),
    )
    .optional()
    .describe("Custom cookie keeper options."),
});
