import PageComponent from "../../src/pageComponents/footer/safety/support";
import { getRouteMetadata } from "../../src/lib/seo.server";

export async function generateMetadata() {
  return getRouteMetadata("/safety-support");
}

export default PageComponent;
