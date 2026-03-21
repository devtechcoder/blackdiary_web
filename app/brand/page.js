import PageComponent from "../../src/pageComponents/footer/brand";
import { getRouteMetadata } from "../../src/lib/seo.server";

export async function generateMetadata() {
  return getRouteMetadata("/brand");
}

export default PageComponent;
