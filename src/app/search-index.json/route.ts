import { buildSearchIndex } from "@/content/search";

// Generated once at build time; the header search fetches it the first time it opens.
export const dynamic = "force-static";

export function GET() {
  return Response.json(buildSearchIndex());
}
