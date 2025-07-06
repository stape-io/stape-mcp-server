import { z } from "zod";

export const IntegrationClickFormTypeSchema = z.object({
  integrationType: z.enum(["cms", "crm"]).optional(),
  integrationName: z
    .enum([
      "highLevel",
      "zoho",
      "hubSpot",
      "pipedrive",
      "salesforce",
      "shopify",
      "wordPress",
      "magento",
      "bigCommerce",
      "wix",
      "prestaShop",
    ])
    .optional(),
  buttonType: z.enum(["learnMore", "install"]).optional(),
});
