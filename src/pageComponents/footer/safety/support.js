"use client";

import React from "react";
import { QuestionCircleOutlined, MailOutlined } from "@ant-design/icons";
import PublicLayout from "../../../components/layout/publicLayout";
import { useSelector } from "react-redux";

// A simple styled component for section titles.
// In a real app, you would use Tailwind CSS classes.
const SectionTitle = ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-4 border-b border-white/15 pb-2 text-white">{children}</h2>;

const SupportPage = () => {
  const headingData = useSelector((state) => state.masterData.allPageHeadings?.find((item) => item.type === "user_safety_support"));

  return (
    <>
      <PublicLayout>
        <div className="container mx-auto max-w-4xl px-4 py-8 text-white">
          <h1 className="mb-6 text-center text-4xl font-bold text-white">{headingData?.title || ""}</h1>
          <p className="mb-10 text-center text-white/80">{headingData?.sub_title || ""}</p>

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
            <div className="text-white">
              {" "}
              <MailOutlined className="mr-2 text-white" />
              Contact App Support
            </div>
          </SectionTitle>
          <p className="text-white/80">For issues related to your account, technical problems, bug reports, or feedback about the Black Diary application, please reach out to our support team.</p>
          <p className="mt-2">
            <strong>Email:</strong>{" "}
            <a href="mailto:support@blackdiary.app" className="text-white hover:underline">
              support@blackdiary.app
            </a>
          </p>
          <p className="mt-1 text-sm text-white/60">We aim to respond to all inquiries within 48 hours.</p>

          {/* FAQ Section */}
          <SectionTitle>
            <div className="text-white">
              {" "}
              <QuestionCircleOutlined className="mr-2 text-white" />
              Frequently Asked Questions
            </div>
          </SectionTitle>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-white">Is my diary private and secure?</h3>
              <p className="text-white/80">
                Yes. We prioritize your privacy above all else. Your entries are end-to-end encrypted, which means no one, not even our team, can read them. Your data is yours alone.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">How can I back up my data?</h3>
              <p className="text-white/80">You can export your diary entries at any time from the 'Settings' menu. We recommend performing regular backups to ensure your data is safe.</p>
            </div>
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default SupportPage;
