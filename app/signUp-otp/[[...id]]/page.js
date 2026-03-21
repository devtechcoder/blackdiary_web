import PageComponent from "../../../src/pageComponents/Auth/LoginWithOtp";
import { getRouteMetadata } from "../../../src/lib/seo.server";

export async function generateMetadata() {
  return getRouteMetadata("/signUp-otp");
}

export default PageComponent;
