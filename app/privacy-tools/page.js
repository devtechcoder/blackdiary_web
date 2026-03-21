import PageComponent from "../../src/pageComponents/footer/safety/privacyTools";
import { getRouteMetadata } from "../../src/lib/seo.server";

export async function generateMetadata() {
  return getRouteMetadata("/privacy-tools");
}

export default PageComponent;
