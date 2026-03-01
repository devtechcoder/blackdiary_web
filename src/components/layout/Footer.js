import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import instagramIcon from "../../assets/images/svg/instagram-blackdiary.svg";
import facebookIcon from "../../assets/images/svg/facebook-blackdiary.svg";
import linkedInIcon from "../../assets/images/svg/linkedin-blackdiary.svg";
import twitterIcon from "../../assets/images/svg/twitter-blackdiary.svg";
import youTubeIcon from "../../assets/images/svg/youtube-blackdiary.svg";
import threadsIcon from "../../assets/images/svg/threads-blackdiary.svg";

function Footer() {
  const socialSettings = useSelector((state) => state.masterData.socialSettings);
  const generalSettings = useSelector((state) => state.masterData.generalSettings);

  const socialLinks = (Array.isArray(socialSettings) ? socialSettings : []).reduce((acc, item) => {
    const slug = item?.slug;
    const value = typeof item?.value === "string" ? item.value.trim() : "";
    if (slug && value) acc[slug] = value;
    return acc;
  }, {});

  const generalSettingMap = (Array.isArray(generalSettings) ? generalSettings : []).reduce((acc, item) => {
    const slug = item?.slug;
    const value = typeof item?.value === "string" ? item.value.trim() : "";
    if (slug && value) acc[slug] = value;
    return acc;
  }, {});

  const socialPlatforms = [
    { slug: "instagram_link", icon: instagramIcon, alt: "Instagram" },
    { slug: "thread_link", icon: threadsIcon, alt: "Threads" },
    { slug: "facbook_link", icon: facebookIcon, alt: "Facebook" },
    { slug: "twitter_link", icon: twitterIcon, alt: "Twitter X" },
    { slug: "youtube_link", icon: youTubeIcon, alt: "YouTube" },
    { slug: "linkedin_link", icon: linkedInIcon, alt: "LinkedIn" },
  ];

  return (
    <>
      <div className="bg-black text-gray-400 px-10 py-10 text-sm">
        <hr className="border-gray-700 my-8" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-4">Our Story</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/leadership" target="blank">
                  Leadership
                </Link>
              </li>
              <li>
                <Link to="/about-us" target="blank">
                  About
                </Link>
              </li>
              <li>
                <Link to="/brand" target="blank">
                  Brand
                </Link>
              </li>
              <li>
                <Link to="/working-at-black-diary" target="blank">
                  Working at Black Diary
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-4">Features</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/sub-category/details?category=Shayri">Shayari</Link>
              </li>
              <li>
                <Link to="/sub-category/details?category=Sher">Sher</Link>
              </li>
              <li>
                <Link to="/">Emotions</Link>
              </li>
              <li>
                <Link to="/search/sub-category">Search & Explore</Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-4">Safety</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/safety-support" target="blank">
                  Support
                </Link>
              </li>
              <li>
                <Link to="/safety-tools" target="blank">
                  Safety Tools
                </Link>
              </li>
              <li>
                <Link to="/privacy-tools" target="blank">
                  Privacy Tools
                </Link>
              </li>
              <li>
                <Link to="/account-security" target="blank">
                  Account Security
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-4">Useful Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/poets">Poets</Link>
              </li>
              <li>
                <Link to="/occasion">Special Moments</Link>
              </li>
            </ul>
          </div>

          <div className="social-icons-container sm:col-span-2 lg:col-span-4 flex flex-wrap justify-center lg:justify-end gap-3 items-center mt-2 md:mt-0">
            {socialPlatforms.map((platform) => {
              const href = socialLinks[platform.slug];
              if (!href) return null;

              return (
                <a
                  key={platform.slug}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 bg-white rounded-full w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <img src={platform.icon} alt={platform.alt} className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
                </a>
              );
            })}
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between text-xs">
          <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
            <span>English (US)</span>
            {generalSettingMap?.site_name ? <span>{generalSettingMap.site_name}</span> : "Black Diary - Shayari & Emotions"}

            <span>
              <Link to="/privacy-policy" target="_blank">
                Privacy Policy
              </Link>
            </span>
            <span>
              <Link to="/terms-and-conditions" target="_blank">
                Terms & Conditions
              </Link>
            </span>
            <span>
              <Link to="/sitemap" target="_blank">
                Sitemap
              </Link>
            </span>
          </div>
          <div className="flex flex-col items-start md:items-end gap-1">
            {generalSettingMap?.copyright_text ? <span>{generalSettingMap.copyright_text}</span> : "Copyright 2025 Black Diary. All rights reserved."}
            {generalSettingMap?.contact_email ? <span>{generalSettingMap.contact_email}</span> : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
