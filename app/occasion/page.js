import PageComponent from "../../src/pageComponents/Occasion/ViewAllOccasion";
import { getRouteMetadata } from "../../src/lib/seo.server";

export async function generateMetadata() {
  return getRouteMetadata("/occasion");
}

export default PageComponent;
