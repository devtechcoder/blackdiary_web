import PageComponent from "../../src/pageComponents/footer/safety/safetyTools";
import { getRouteMetadata } from "../../src/lib/seo.server";

export async function generateMetadata() {
  return getRouteMetadata("/safety-tools");
}

export default PageComponent;
