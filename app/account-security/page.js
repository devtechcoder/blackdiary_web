import PageComponent from "../../src/pageComponents/footer/safety/accountSecurity";
import { getRouteMetadata } from "../../src/lib/seo.server";

export async function generateMetadata() {
  return getRouteMetadata("/account-security");
}

export default PageComponent;
