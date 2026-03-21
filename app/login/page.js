import PageComponent from "../../src/pageComponents/Auth/Login";
import { getRouteMetadata } from "../../src/lib/seo.server";

export async function generateMetadata() {
  return getRouteMetadata("/login");
}

export default PageComponent;
