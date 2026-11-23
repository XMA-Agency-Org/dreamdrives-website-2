import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

export default defineConfig({
  name: "dreamdrives",
  title: "Dream Drives",
  projectId: "gzcp7ons",
  dataset: "production",
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: "2026-11-01" })],
  schema: { types: schemaTypes },
  document: {
    // siteSettings is a singleton: no "new" or "duplicate" for it.
    newDocumentOptions: (prev) => prev.filter((t) => t.templateId !== "siteSettings"),
    actions: (prev, { schemaType }) =>
      schemaType === "siteSettings" ? prev.filter((a) => !["duplicate", "delete", "unpublish"].includes(a.action ?? "")) : prev,
  },
});
