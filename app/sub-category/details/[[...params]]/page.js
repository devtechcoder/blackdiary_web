import PageComponent from "../../../../src/pageComponents/SubCategory/SubCategoryDetails";
import { getRouteMetadata } from "../../../../src/lib/seo.server";

export async function generateMetadata() {
  return getRouteMetadata("/sub-category/details");
}

export default PageComponent;
