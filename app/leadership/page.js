import PageComponent from "../../src/pageComponents/footer/leadership";
import { getRouteMetadata } from "../../src/lib/seo.server";

export async function generateMetadata() {
  return getRouteMetadata("/leadership");
}

export default PageComponent;
