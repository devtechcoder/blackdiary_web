import PageComponent from "../../../../src/pageComponents/Poet/PoetDetails";
import { getRouteMetadata } from "../../../../src/lib/seo.server";

export async function generateMetadata() {
  return getRouteMetadata("/poets/details");
}

export default PageComponent;
