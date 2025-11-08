import React from "react";
import { Helmet } from "react-helmet-async";
import { QuestionCircleOutlined, MailOutlined } from "@ant-design/icons";
import PublicLayout from "../../../components/layout/publicLayout";

// A simple styled component for section titles.
// In a real app, you would use Tailwind CSS classes.
const SectionTitle = ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">{children}</h2>;

const SupportPage = () => {
  return (
    <>
      <Helmet>
        <title>Support Center - Black Diary</title>
        <meta name="description" content="Get help and support for Black Diary. Find resources for your safety and answers to frequently asked questions." />
      </Helmet>
      <PublicLayout>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <h1 className="text-4xl font-bold text-center  text-gray-600 mb-6">Support & Safety Center</h1>
          <p className="text-center text-gray-600 mb-10">
            Your well-being is our top priority. Here you can find resources for immediate help, contact our support team, and get answers to common questions.
          </p>

          {/* Immediate Help Section */}
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8" role="alert">
            <p className="font-bold">In Crisis or Need Immediate Help?</p>
            <p>If you are in crisis or any other person may be in danger, please don't use this site. These resources can provide you with immediate help.</p>
            <ul className="list-disc ml-5 mt-2">
              <li>
                <strong>Crisis Text Line:</strong> Text HOME to 741741 from anywhere in the US, anytime, about any type of crisis.
              </li>
              <li>
                <strong>National Suicide Prevention Lifeline:</strong> Call 1-800-273-8255.
              </li>
            </ul>
          </div>

          {/* Contact Support Section */}
          <SectionTitle>
            <div className=" text-gray-600">
              {" "}
              <MailOutlined className="mr-2 text-gray-600 " />
              Contact App Support
            </div>
          </SectionTitle>
          <p className=" text-gray-600">For issues related to your account, technical problems, bug reports, or feedback about the Black Diary application, please reach out to our support team.</p>
          <p className="mt-2">
            <strong>Email:</strong>{" "}
            <a href="mailto:support@blackdiary.app" className="text-blue-600 hover:underline">
              support@blackdiary.app
            </a>
          </p>
          <p className="text-sm text-gray-500 mt-1">We aim to respond to all inquiries within 48 hours.</p>

          {/* FAQ Section */}
          <SectionTitle>
            <div className=" text-gray-600">
              {" "}
              <QuestionCircleOutlined className="mr-2 text-gray-600" />
              Frequently Asked Questions
            </div>
          </SectionTitle>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold  text-gray-600">Is my diary private and secure?</h3>
              <p className="text-gray-700">
                Yes. We prioritize your privacy above all else. Your entries are end-to-end encrypted, which means no one, not even our team, can read them. Your data is yours alone.
              </p>
            </div>
            <div>
              <h3 className="font-semibold  text-gray-600">How can I back up my data?</h3>
              <p className="text-gray-700 ">You can export your diary entries at any time from the 'Settings' menu. We recommend performing regular backups to ensure your data is safe.</p>
            </div>
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default SupportPage;
