import PageComponent from "../../src/pageComponents/Auth/SignUp";
import { getRouteMetadata } from "../../src/lib/seo.server";

export async function generateMetadata() {
  return getRouteMetadata("/signup");
}

export default PageComponent;
