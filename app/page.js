import PageComponent from "../src/pageComponents/Home/Index";
import { getRouteMetadata } from "../src/lib/seo.server";

export async function generateMetadata() {
  return getRouteMetadata("/");
}

export default PageComponent;
