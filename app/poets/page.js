import PageComponent from "../../src/pageComponents/Poet/AllPoets";
import { getRouteMetadata } from "../../src/lib/seo.server";

export async function generateMetadata() {
  return getRouteMetadata("/poets");
}

export default PageComponent;
