import PageComponent from "../../src/pageComponents/searchAccount/index";
import { getRouteMetadata } from "../../src/lib/seo.server";

export async function generateMetadata() {
  return getRouteMetadata("/search");
}

export default PageComponent;
