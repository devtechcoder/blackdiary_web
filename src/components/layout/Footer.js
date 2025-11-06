import { InstagramOutlined, TwitterOutlined, FacebookOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="bg-black text-gray-400 px-10 py-10 text-sm">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
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
                <Link to={"/sub-category/details?category=Shayri"} target="blank">
                  Shayari
                </Link>
              </li>
              <li>
                {" "}
                <Link to={"/sub-category/details?category=Sher"} target="blank">
                  Sher
                </Link>
              </li>
              <li>
                {" "}
                <Link to={"/"} target="blank">
                  Emotions
                </Link>
              </li>
              <li>
                <Link to={"/search/sub-category"} target="blank">
                  Search & Explore
                </Link>
              </li>
            </ul>
          </div>
          {/* Column 3 - Useful Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Safety</h4>
            <ul className="space-y-2">
              <li>Support</li>
              <li>Safety Tools</li>
              <li>Privacy Tools</li>
              <li>Account Security</li>
            </ul>
          </div>
          {/* Column 4 - Spotify Plans */}
          <div>
            <h4 className="text-white font-semibold mb-4">Useful Links</h4>
            <ul className="space-y-2">
              <li>Home</li>
              <li>Shayar</li>
              <li>Category</li>
              <li>Proifle</li>
            </ul>
          </div>
          {/* Column 5 - Social Icons */}
          <div className="flex gap-4 items-start mt-4 md:mt-0">
            <a href="#" className="text-white text-lg hover:text-green-500">
              <InstagramOutlined />
            </a>
            <a href="#" className="text-white text-lg hover:text-green-500">
              <TwitterOutlined />
            </a>
            <a href="#" className="text-white text-lg hover:text-green-500">
              <FacebookOutlined />
            </a>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between text-xs">
          <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
            <span>English (US)</span>
            <span>Black Diary - Shayari & Emotions</span>
            <span>Privacy</span>
            <span>Terms</span>
            <span>Sitemap</span>
          </div>
          <span>© 2025 Black Diary. All rights reserved.</span>
        </div>
      </div>
    </>
  );
}

export default Footer;
