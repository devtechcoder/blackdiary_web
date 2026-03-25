"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

import Schema from "./Schema";
import { getSchemaGraph } from "../../lib/schema/schema";

export default function RouteSchema() {
  const pathname = usePathname() || "/";
  const data = useMemo(() => getSchemaGraph(pathname), [pathname]);

  return <Schema id="page-schema-graph" data={data} />;
}
