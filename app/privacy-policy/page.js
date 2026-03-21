import PageComponent from "../../src/pageComponents/footer/privacyPolicy";
import { getRouteMetadata } from "../../src/lib/seo.server";

export async function generateMetadata() {
  return getRouteMetadata("/privacy-policy");
}

export default PageComponent;
