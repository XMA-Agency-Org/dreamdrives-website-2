import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Dream Drives")
    .items([
      S.listItem().title("Site settings").id("siteSettings").child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.documentTypeListItem("car").title("Cars"),
      S.documentTypeListItem("landingPage").title("Landing pages"),
      S.divider(),
      S.documentTypeListItem("brand").title("Brands"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("review").title("Reviews"),
      S.documentTypeListItem("faq").title("FAQs"),
    ]);
