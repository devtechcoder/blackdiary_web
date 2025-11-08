import React from "react";
import { Helmet } from "react-helmet-async";
import PublicLayout from "../../components/layout/publicLayout";

const TermsAndConditions = () => {
  const SectionTitle = ({ children }) => <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4 border-l-4 border-indigo-600 pl-4">{children}</h2>;

  return (
    <>
      <Helmet>
        <title>Terms and Conditions - Black Diary</title>
        <meta name="description" content="Read the Terms and Conditions for using the Black Diary application. This governs your rights and responsibilities as a user." />
      </Helmet>

      <PublicLayout>
        <div className="bg-white text-gray-800 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Terms and Conditions</h1>
              <p className="text-lg text-gray-600">Last Updated: October 26, 2023</p>
            </div>

            {/* Main Content */}
            <div className="prose max-w-none">
              <p>
                Please read these Terms and Conditions ("Terms") carefully before using the Black Diary application (the "Service") operated by Black Diary ("us", "we", or "our"). Your access to and
                use of the Service is conditioned upon your acceptance of and compliance with these Terms.
              </p>

              <SectionTitle>1. Accounts</SectionTitle>
              <p>
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password that you use to
                access the Service and for any activities or actions under your password.
              </p>

              <SectionTitle>2. User Content</SectionTitle>
              <p>
                Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, or other material ("Content"). You are responsible for the Content
                that you post on or through the Service, including its legality, reliability, and appropriateness.
              </p>
              <p>
                You retain any and all of your rights to any Content you submit. By posting Content, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce,
                and distribute such Content on and through the Service, subject to your privacy settings.
              </p>

              <SectionTitle>3. Prohibited Activities</SectionTitle>
              <p>You agree not to use the Service to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Post any content that is unlawful, harmful, threatening, abusive, or otherwise objectionable.</li>
                <li>Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
                <li>Violate any applicable local, state, national, or international law.</li>
                <li>Interfere with or disrupt the Service or servers or networks connected to the Service.</li>
              </ul>

              <SectionTitle>4. Intellectual Property</SectionTitle>
              <p>
                The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of Black Diary and its licensors.
              </p>

              <SectionTitle>5. Termination</SectionTitle>
              <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>

              <SectionTitle>6. Limitation Of Liability</SectionTitle>
              <p>
                In no event shall Black Diary, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive
                damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>

              <SectionTitle>7. Changes To Terms</SectionTitle>
              <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.</p>

              <SectionTitle>8. Contact Us</SectionTitle>
              <p>
                If you have any questions about these Terms, please contact us at{" "}
                <a href="mailto:legal@blackdiary.app" className="text-indigo-600 hover:underline">
                  legal@blackdiary.app
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

export default TermsAndConditions;
