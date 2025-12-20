import { createClient, ContentfulClientApi } from "contentful";

const spaceId = process.env.CONTENTFUL_SPACE_ID || "";
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN || "";
const previewAccessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN || "";

function createContentfulClient(): ContentfulClientApi<undefined> | null {
  if (!spaceId || !accessToken) {
    return null;
  }

  return createClient({
    space: spaceId,
    accessToken: accessToken,
  });
}

function createPreviewClient(): ContentfulClientApi<undefined> | null {
  if (!spaceId || !previewAccessToken) {
    return null;
  }

  return createClient({
    space: spaceId,
    accessToken: previewAccessToken,
    host: "preview.contentful.com",
  });
}

export const contentfulClient = createContentfulClient();
export const previewClient = createPreviewClient();

export function isContentfulConfigured(): boolean {
  return Boolean(spaceId && accessToken);
}
