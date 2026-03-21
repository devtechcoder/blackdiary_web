import PageComponent from "../../src/pageComponents/goAds/index";
import { getRouteMetadata } from "../../src/lib/seo.server";

export async function generateMetadata() {
  return getRouteMetadata("/go");
}

export default PageComponent;
