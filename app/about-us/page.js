import PageComponent from "../../src/pageComponents/footer/aboutUs";
import { getRouteMetadata } from "../../src/lib/seo.server";

export async function generateMetadata() {
  return getRouteMetadata("/about-us");
}

export default PageComponent;
