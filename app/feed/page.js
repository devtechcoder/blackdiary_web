import PageComponent from "../../src/pageComponents/feed/index";
import { getRouteMetadata } from "../../src/lib/seo.server";

export async function generateMetadata() {
  return getRouteMetadata("/feed");
}

export default PageComponent;
