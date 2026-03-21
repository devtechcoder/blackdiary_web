import PageComponent from "../../../../../src/pageComponents/Account/viewFollowList";
import { getRouteMetadata } from "../../../../../src/lib/seo.server";

export async function generateMetadata() {
  return getRouteMetadata("/view-follow");
}

export default PageComponent;
