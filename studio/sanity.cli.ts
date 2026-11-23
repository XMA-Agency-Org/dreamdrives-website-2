import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: { projectId: "gzcp7ons", dataset: "production" },
  studioHost: "dreamdrives",
  deployment: { autoUpdates: true },
});
