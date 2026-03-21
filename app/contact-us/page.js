import PageComponent from "../../src/pageComponents/footer/contactUs";
import { getRouteMetadata } from "../../src/lib/seo.server";

export async function generateMetadata() {
  return getRouteMetadata("/contact-us");
}

export default PageComponent;
