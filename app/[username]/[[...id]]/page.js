import PageComponent from "../../../src/pageComponents/Account/Index";
import { getRouteMetadata } from "../../../src/lib/seo.server";

export async function generateMetadata() {
  return getRouteMetadata("/profile");
}

export default PageComponent;
