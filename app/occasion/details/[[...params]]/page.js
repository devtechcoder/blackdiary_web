import PageComponent from "../../../../src/pageComponents/Occasion/OccasionDetails";
import { getRouteMetadata } from "../../../../src/lib/seo.server";

export async function generateMetadata() {
  return getRouteMetadata("/occasion/details");
}

export default PageComponent;
