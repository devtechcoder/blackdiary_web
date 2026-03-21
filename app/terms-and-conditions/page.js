import PageComponent from "../../src/pageComponents/footer/termsConditions";
import { getRouteMetadata } from "../../src/lib/seo.server";

export async function generateMetadata() {
  return getRouteMetadata("/terms-and-conditions");
}

export default PageComponent;
