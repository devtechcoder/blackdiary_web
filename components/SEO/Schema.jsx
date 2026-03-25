const serializeSchema = (data) =>
  JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");

export default function Schema({ data, id = "schema-json-ld" }) {
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return null;
  }

  return <script id={id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeSchema(data) }} />;
}
