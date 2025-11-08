import React from "react";
import { Helmet } from "react-helmet-async";
import PublicLayout from "../../components/layout/publicLayout";
import { Link } from "react-router-dom";

const sitemapSections = [
  {
    title: "Main Features",
    links: [
      { name: "Home", path: "/" },
      { name: "Poets", path: "/poets" },
      { name: "Special Moments (Occasions)", path: "/occasion" },
      { name: "Search & Explore", path: "/search/sub-category" },
      { name: "Shayari", path: "/sub-category/details?category=Shayri" },
      { name: "Sher", path: "/sub-category/details?category=Sher" },
    ],
  },
  {
    title: "Our Company",
    links: [
      { name: "About Us", path: "/about-us" },
      { name: "Leadership", path: "/leadership" },
      { name: "Brand Assets", path: "/brand" },
      { name: "Careers", path: "/working-at-black-diary" },
    ],
  },
  {
    title: "Safety & Legal",
    links: [
      { name: "Support Center", path: "/safety-support" },
      { name: "Safety Tools", path: "/safety-tools" },
      { name: "Privacy Tools", path: "/privacy-tools" },
      { name: "Account Security", path: "/account-security" },
      { name: "Privacy Policy", path: "/privacy-policy" },
      { name: "Terms & Conditions", path: "/terms-and-conditions" },
    ],
  },
  {
    title: "Your Account",
    links: [
      { name: "Login", path: "/login" },
      { name: "Sign Up", path: "/signup" },
      { name: "Your Profile", path: "/profile" },
      { name: "Edit Profile", path: "/account/edit-profile" },
      { name: "Login Activity", path: "/account/login-activity" },
      { name: "Manage Account", path: "/account/manage-account" },
    ],
  },
];

const SitemapPage = () => {
  const Section = ({ title, links }) => (
    <section>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-indigo-600 pl-4">{title}</h2>
      <ul className="list-disc list-inside space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <Link to={link.path} className="text-indigo-600 hover:text-indigo-800 hover:underline">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );

  return (
    <>
      <Helmet>
        <title>Sitemap - Black Diary</title>
        <meta name="description" content="Explore the sitemap for Black Diary to easily navigate through our features, company information, safety guidelines, and your account settings." />
      </Helmet>

      <PublicLayout>
        <div className="bg-white text-gray-800 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Sitemap</h1>
              <p className="text-lg text-gray-600">An overview of all pages on Black Diary.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
              {sitemapSections.map((section) => (
                <Section key={section.title} {...section} />
              ))}
            </div>
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default SitemapPage;
