import PageComponent from "../../src/pageComponents/footer/sitemap";
import { getRouteMetadata } from "../../src/lib/seo.server";

export async function generateMetadata() {
  return getRouteMetadata("/sitemap");
}

export default PageComponent;
