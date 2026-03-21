import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AppImage from "../AppImage";
import instagramIcon from "../../assets/images/svg/instagram-blackdiary.svg";
import facebookIcon from "../../assets/images/svg/facebook-blackdiary.svg";
import linkedInIcon from "../../assets/images/svg/linkedin-blackdiary.svg";
import twitterIcon from "../../assets/images/svg/twitter-blackdiary.svg";
import youTubeIcon from "../../assets/images/svg/youtube-blackdiary.svg";
import threadsIcon from "../../assets/images/svg/threads-blackdiary.svg";
import {
  FACEBOOK_ACCOUNT_LINK,
  INSTAGRAM_ACCOUNT_LINK,
  LINKED_ACCOUNT_LINK,
  THREADS_ACCOUNT_LINK,
  TWITTER_X_ACCOUNT_LINK,
  YOUTUBE_ACCOUNT_LINK,
} from "../../constants/Constants";

function Footer() {
  const footerLinkClass = "text-[#F5F5F5] no-underline hover:text-[#D4AF37] whitespace-nowrap";
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
    {
      slugs: ["instagram_link", "instagram"],
      icon: instagramIcon,
      alt: "Instagram",
      fallback: INSTAGRAM_ACCOUNT_LINK,
    },
    {
      slugs: ["thread_link", "threads_link", "threads"],
      icon: threadsIcon,
      alt: "Threads",
      fallback: THREADS_ACCOUNT_LINK,
    },
    {
      slugs: ["facbook_link", "facebook_link", "facebook"],
      icon: facebookIcon,
      alt: "Facebook",
      fallback: FACEBOOK_ACCOUNT_LINK,
    },
    {
      slugs: ["twitter_link", "x_link", "twitter"],
      icon: twitterIcon,
      alt: "Twitter X",
      fallback: TWITTER_X_ACCOUNT_LINK,
    },
    {
      slugs: ["youtube_link", "youtube"],
      icon: youTubeIcon,
      alt: "YouTube",
      fallback: YOUTUBE_ACCOUNT_LINK,
    },
    {
      slugs: ["linkedin_link", "linkedin"],
      icon: linkedInIcon,
      alt: "LinkedIn",
      fallback: LINKED_ACCOUNT_LINK,
    },
  ];

  return (
    <>
      <div className="premium-footer px-6 md:px-10 py-8 text-sm rounded-2xl mt-6 leading-normal">
        <hr className="border-[#2a2a2a] my-6" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-2 w-full flex flex-col items-start">
            <h4 className="text-white text-base font-medium mb-3 leading-6">Our Story</h4>
            <ul className="space-y-1.5 m-0 p-0 list-none">
              <li>
                <Link to="/leadership" target="_blank" className={footerLinkClass}>
                  Leadership
                </Link>
              </li>
              <li>
                <Link to="/about-us" target="_blank" className={footerLinkClass}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/brand" target="_blank" className={footerLinkClass}>
                  Brand
                </Link>
              </li>
              <li>
                <Link to="/working-at-black-diary" target="_blank" className={footerLinkClass}>
                  Working at Black Diary
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 w-full flex flex-col items-start">
            <h4 className="text-white text-base font-medium mb-3 leading-6">Features</h4>
            <ul className="space-y-1.5 m-0 p-0 list-none">
              <li>
                <Link to="/sub-category/details?category=Shayri" className={footerLinkClass}>
                  Shayari
                </Link>
              </li>
              <li>
                <Link to="/sub-category/details?category=Sher" className={footerLinkClass}>
                  Sher
                </Link>
              </li>
              <li>
                <Link to="/" className={footerLinkClass}>
                  Emotions
                </Link>
              </li>
              <li>
                <Link to="/search/sub-category" className={footerLinkClass}>
                  Search & Explore
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 w-full flex flex-col items-start">
            <h4 className="text-white text-base font-medium mb-3 leading-6">Safety</h4>
            <ul className="space-y-1.5 m-0 p-0 list-none">
              <li>
                <Link to="/safety-support" target="_blank" className={footerLinkClass}>
                  Support
                </Link>
              </li>
              <li>
                <Link to="/safety-tools" target="_blank" className={footerLinkClass}>
                  Safety Tools
                </Link>
              </li>
              <li>
                <Link to="/privacy-tools" target="_blank" className={footerLinkClass}>
                  Privacy Tools
                </Link>
              </li>
              <li>
                <Link to="/account-security" target="_blank" className={footerLinkClass}>
                  Account Security
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 w-full flex flex-col items-start">
            <h4 className="text-white text-base font-medium mb-3 leading-6">Useful Links</h4>
            <ul className="space-y-1.5 m-0 p-0 list-none">
              <li>
                <Link to="/" className={footerLinkClass}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/poets" className={footerLinkClass}>
                  Poets
                </Link>
              </li>
              <li>
                <Link to="/occasion" className={footerLinkClass}>
                  Special Moments
                </Link>
              </li>
            </ul>
          </div>

          <div className="social-icons-container sm:col-span-2 lg:col-span-4 flex flex-wrap justify-center lg:justify-end gap-x-3 gap-y-2 items-center mt-1 md:mt-0">
            {socialPlatforms.map((platform) => {
              const href = platform.slugs.map((slug) => socialLinks[slug]).find(Boolean) || platform.fallback;
              if (!href) return null;

              return (
                <a
                  key={platform.slugs[0]}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 no-underline bg-[#1a1a1a] border border-[#2a2a2a] rounded-full w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center hover:border-[#d4af37] transition-colors"
                >
                  <AppImage
                    src={platform.icon}
                    alt={platform.alt}
                    width={24}
                    height={24}
                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain opacity-85"
                    style={{ filter: "invert(1) brightness(0.92)" }}
                  />
                </a>
              );
            })}
          </div>
        </div>

        <hr className="border-[#2a2a2a] my-6" />

        <div className="flex flex-col md:flex-row justify-between text-xs">
          <div className="flex flex-wrap gap-3 mb-3 md:mb-0">
            {generalSettingMap?.site_name ? <span>{generalSettingMap.site_name}</span> : "Black Diary - Shayari & Emotions"}

            <span>
              <Link to="/contact-us" className={footerLinkClass}>
                Contact Us
              </Link>
            </span>
            <span>
              <Link to="/privacy-policy" target="_blank" className={footerLinkClass}>
                Privacy Policy
              </Link>
            </span>
            <span>
              <Link to="/terms-and-conditions" target="_blank" className={footerLinkClass}>
                Terms & Conditions
              </Link>
            </span>

            <span>
              <Link to="/sitemap" target="_blank" className={footerLinkClass}>
                Sitemap
              </Link>
            </span>
          </div>
          <div className="flex flex-col items-start md:items-end gap-0.5">
            {generalSettingMap?.copyright_text ? <span>{generalSettingMap.copyright_text}</span> : "Copyright 2025 Black Diary. All rights reserved."}
            {generalSettingMap?.contact_email ? <span>{generalSettingMap.contact_email}</span> : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
