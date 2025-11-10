import { Link } from "react-router-dom";
import instagramIcon from "../../assets/images/svg/instagram-blackdiary.svg";
import facebookIcon from "../../assets/images/svg/facebook-blackdiary.svg";
import linkedInIcon from "../../assets/images/svg/linkedin-blackdiary.svg";
import twitterIcon from "../../assets/images/svg/twitter-blackdiary.svg";
import youTubeIcon from "../../assets/images/svg/youtube-blackdiary.svg";
import threadsIcon from "../../assets/images/svg/threads-blackdiary.svg";
import { INSTAGRAM_ACCOUNT_LINK, THREADS_ACCOUNT_LINK, FACEBOOK_ACCOUNT_LINK, TWITTER_X_ACCOUNT_LINK, YOUTUBE_ACCOUNT_LINK, LINKED_ACCOUNT_LINK } from "../../constants/Constants";

function Footer() {
  return (
    <>
      <div className="bg-black text-gray-400 px-10 py-10 text-sm">
        <hr className="border-gray-700 my-8" />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Column 1 - Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Our Story</h4>
            <ul className="space-y-2">
              <li>
                <Link to={"/leadership"} target="blank">
                  Leadership
                </Link>
              </li>
              <li>
                <Link to={"/about-us"} target="blank">
                  About
                </Link>
              </li>
              <li>
                <Link to={"/brand"} target="blank">
                  Brand
                </Link>
              </li>
              <li>
                <Link to={"/working-at-black-diary"} target="blank">
                  Working at Black Diary
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 - Communities */}
          <div>
            <h4 className="text-white font-semibold mb-4">Features</h4>
            <ul className="space-y-2">
              <li>
                {" "}
                <Link to={"/sub-category/details?category=Shayri"}>Shayari</Link>
              </li>
              <li>
                {" "}
                <Link to={"/sub-category/details?category=Sher"}>Sher</Link>
              </li>
              <li>
                {" "}
                <Link to={"/"}>Emotions</Link>
              </li>
              <li>
                <Link to={"/search/sub-category"}>Search & Explore</Link>
              </li>
            </ul>
          </div>
          {/* Column 3 - Useful Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Safety</h4>
            <ul className="space-y-2">
              <li>
                {" "}
                <Link to={"/safety-support"} target="blank">
                  Support
                </Link>
              </li>
              <li>
                <Link to={"/safety-tools"} target="blank">
                  Safety Tools
                </Link>
              </li>
              <li>
                {" "}
                <Link to={"/privacy-tools"} target="blank">
                  Privacy Tools
                </Link>
              </li>
              <li>
                {" "}
                <Link to={"/account-security"} target="blank">
                  Account Security
                </Link>
              </li>
            </ul>
          </div>
          {/* Column 4 - Spotify Plans */}
          <div>
            <h4 className="text-white font-semibold mb-4">Useful Links</h4>
            <ul className="space-y-2">
              <li>
                {" "}
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/poets"}>Poets</Link>
              </li>
              <li>
                <Link to={"/occasion"}>Special Moments</Link>
              </li>
            </ul>
          </div>
          <div className="social-icons-container flex justify-center md:justify-start gap-4 items-start mt-4 md:mt-0">
            <a href={INSTAGRAM_ACCOUNT_LINK} target="_blank" className="bg-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <img src={instagramIcon} className="w-5 h-5 object-contain" />
            </a>
            <a href={THREADS_ACCOUNT_LINK} target="_blank" className="bg-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <img src={threadsIcon} className="w-5 h-5 object-contain" />
            </a>
            <a href={FACEBOOK_ACCOUNT_LINK} target="_blank" className="bg-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <img src={facebookIcon} className="w-5 h-5 object-contain" />
            </a>

            <a href={TWITTER_X_ACCOUNT_LINK} target="_blank" className="bg-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <img src={twitterIcon} className="w-5 h-5 object-contain" />
            </a>
            <a href={YOUTUBE_ACCOUNT_LINK} target="_blank" className="bg-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <img src={youTubeIcon} className="w-5 h-5 object-contain" />
            </a>

            <a href={LINKED_ACCOUNT_LINK} target="_blank" className="bg-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <img src={linkedInIcon} className="w-5 h-5 object-contain" />
            </a>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between text-xs">
          <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
            <span>English (US)</span>
            <span>Black Diary - Shayari & Emotions</span>
            <span>
              {" "}
              <Link to={"/privacy-policy"} target="_blank">
                Privacy Policy
              </Link>
            </span>
            <span>
              <Link to={"/terms-and-conditions"} target="_blank">
                Terms & Conditions
              </Link>
            </span>
            <span>
              {" "}
              <Link to={"/sitemap"} target="_blank">
                Sitemap
              </Link>
            </span>
          </div>
          <span>© 2025 Black Diary. All rights reserved.</span>
        </div>
      </div>
    </>
  );
}

export default Footer;
