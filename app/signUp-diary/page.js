import PageComponent from "../../src/pageComponents/Auth/SignUp";
import { getRouteMetadata } from "../../src/lib/seo.server";

export async function generateMetadata() {
  return getRouteMetadata("/signUp-diary");
}

export default PageComponent;
