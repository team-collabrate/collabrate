import { JsonLd } from "@/components/seo/json-ld";
import { pageGraph, type PageSchemaType } from "@/lib/schema";

/** Page-level schema, fed from the same object the page passes to buildMetadata(). */
export function PageJsonLd({
  type,
  meta,
  crumb,
}: {
  type: PageSchemaType;
  meta: { title: string; description: string; path: string };
  crumb: string;
}) {
  return (
    <JsonLd
      data={pageGraph({ type, path: meta.path, name: meta.title, description: meta.description, crumb })}
    />
  );
}
