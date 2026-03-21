import PageComponent from "../../src/pageComponents/footer/workingAtBlackDiary";
import { getRouteMetadata } from "../../src/lib/seo.server";

export async function generateMetadata() {
  return getRouteMetadata("/working-at-black-diary");
}

export default PageComponent;
