import PageComponent from "../../../src/pageComponents/SubCategory/ViewAllSubCategory";
import { getRouteMetadata } from "../../../src/lib/seo.server";

export async function generateMetadata() {
  return getRouteMetadata("/search/sub-category");
}

export default PageComponent;
