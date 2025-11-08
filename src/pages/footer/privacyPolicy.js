import React from "react";
import { Helmet } from "react-helmet-async";
import PublicLayout from "../../components/layout/publicLayout";

const PrivacyPolicy = () => {
  const SectionTitle = ({ children }) => <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4 border-l-4 border-indigo-600 pl-4">{children}</h2>;

  const SubSection = ({ title, children }) => (
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-700 leading-relaxed mt-1">{children}</p>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Privacy Policy - Black Diary</title>
        <meta name="description" content="Read the Privacy Policy for Black Diary to understand how we collect, use, and protect your personal information and data." />
      </Helmet>

      <PublicLayout>
        <div className="bg-white text-gray-800 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
              <p className="text-lg text-gray-600">Last Updated: October 26, 2023</p>
            </div>

            {/* Main Content */}
            <div className="prose max-w-none">
              <p>
                Welcome to Black Diary ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                when you use our application. Please read this policy carefully.
              </p>

              <SectionTitle>1. Information We Collect</SectionTitle>
              <SubSection title="A. Information You Provide to Us">
                We collect information you provide directly to us, such as when you create an account, create or share content (diary entries, posts, comments), and communicate with us. This includes
                your name, email address, password, and any content you generate.
              </SubSection>
              <SubSection title="B. Information We Collect Automatically">
                When you use our service, we automatically collect information about your device and usage, including your IP address, device type, operating system, and activity logs. We may also use
                cookies to enhance your experience.
              </SubSection>

              <SectionTitle>2. How We Use Your Information</SectionTitle>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Provide, maintain, and improve our services.</li>
                <li>Personalize your experience and the content you see.</li>
                <li>Communicate with you, including responding to your comments and questions.</li>
                <li>Monitor and analyze trends, usage, and activities to ensure the security of our platform.</li>
              </ul>

              <SectionTitle>3. How We Share Your Information</SectionTitle>
              <p>Your privacy is paramount. We do not sell your personal data. We may share information as follows:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>With other users based on your privacy settings (e.g., public posts vs. private diary entries).</li>
                <li>With third-party vendors and service providers that help us operate our services (e.g., cloud hosting).</li>
                <li>If required by law or to protect the rights, property, or safety of Black Diary, our users, or others.</li>
              </ul>

              <SectionTitle>4. Your Choices and Rights</SectionTitle>
              <p>
                You have control over your information. You can access, edit, or delete your profile and content at any time through your account settings. You can also manage your privacy settings to
                control who sees your content.
              </p>

              <SectionTitle>5. Data Security</SectionTitle>
              <p>
                We implement security measures designed to protect your information from unauthorized access, including end-to-end encryption for your private diary entries. However, no electronic
                transmission or storage is 100% secure.
              </p>

              <SectionTitle>6. Children's Privacy</SectionTitle>
              <p>Our service is not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13.</p>

              <SectionTitle>7. Changes to This Policy</SectionTitle>
              <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.</p>

              <SectionTitle>8. Contact Us</SectionTitle>
              <p>
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:privacy@blackdiary.app" className="text-indigo-600 hover:underline">
                  privacy@blackdiary.app
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default PrivacyPolicy;
