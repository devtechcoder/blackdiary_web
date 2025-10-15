import {
  InstagramOutlined,
  TwitterOutlined,
  FacebookOutlined,
} from "@ant-design/icons";

function Footer() {
  return (
    <>
      <div className="bg-black text-gray-400 px-10 py-10 text-sm">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Column 1 - Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>About</li>
              <li>Jobs</li>
              <li>For the Record</li>
            </ul>
          </div>

          {/* Column 2 - Communities */}
          <div>
            <h4 className="text-white font-semibold mb-4">Communities</h4>
            <ul className="space-y-2">
              <li>For Artists</li>
              <li>Developers</li>
              <li>Advertising</li>
              <li>Investors</li>
              <li>Vendors</li>
            </ul>
          </div>

          {/* Column 3 - Useful Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Useful links</h4>
            <ul className="space-y-2">
              <li>Support</li>
              <li>Free Mobile App</li>
            </ul>
          </div>

          {/* Column 4 - Spotify Plans */}
          <div>
            <h4 className="text-white font-semibold mb-4">Spotify Plans</h4>
            <ul className="space-y-2">
              <li>Premium Individual</li>
              <li>Premium Duo</li>
              <li>Premium Family</li>
              <li>Premium Student</li>
              <li>Spotify Free</li>
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
            <span>Legal</span>
            <span>Safety & Privacy Center</span>
            <span>Privacy Policy</span>
            <span>Cookies</span>
            <span>About Ads</span>
            <span>Accessibility</span>
          </div>
          <span>© 2025 Spotify AB</span>
        </div>
      </div>
    </>
  );
}

export default Footer;
