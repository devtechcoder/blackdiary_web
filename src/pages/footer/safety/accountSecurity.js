import React from "react";
import { Helmet } from "react-helmet-async";
import PublicLayout from "../../../components/layout/publicLayout";
import { Link } from "react-router-dom";
import { SafetyCertificateOutlined, KeyOutlined, LaptopOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useRequest } from "../../../hooks/useReduxRequest";
import apiPath from "../../../constants/apiPath";

const getSecurityIcon = (title = "") => {
  const normalizedTitle = title.toLowerCase();

  if (normalizedTitle.includes("password") || normalizedTitle.includes("key")) return <KeyOutlined className="text-3xl text-indigo-500" />;
  if (normalizedTitle.includes("login") || normalizedTitle.includes("device")) return <LaptopOutlined className="text-3xl text-indigo-500" />;
  if (normalizedTitle.includes("phishing") || normalizedTitle.includes("report") || normalizedTitle.includes("help")) return <QuestionCircleOutlined className="text-3xl text-indigo-500" />;

  return <SafetyCertificateOutlined className="text-3xl text-indigo-500" />;
};

const AccountSecurity = () => {
  const headingData = useSelector((state) => state.masterData.allPageHeadings?.find((item) => item.type === "user_account_security"));
  const { response: data, loading } = useRequest(`${apiPath.common.getMasters}/user_account_security`);

  const securityFeatures = React.useMemo(() => {
    const list = data?.data;
    if (!Array.isArray(list)) return [];

    return list.map((item) => {
      const title = item?.title || item?.name || "";

      return {
        icon: getSecurityIcon(title),
        title,
        description: item?.description || "",
        link: item?.link || item?.url || "#",
        linkText: item?.sub_title || "Learn More",
      };
    });
  }, [data]);

  return (
    <>
      <Helmet>
        <title>{headingData?.title || "Account Security"} - Black Diary</title>
        <meta name="description" content="Learn how to keep your Black Diary account secure with features like Two-Factor Authentication, login reviews, and strong passwords." />
      </Helmet>

      <PublicLayout>
        <div className="bg-white text-gray-800 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">{headingData?.title || ""}</h1>
              <p className="text-lg text-gray-600">{headingData?.sub_title || ""}</p>
            </div>

            {/* Security Features List */}
            <div className="space-y-10">
              {loading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200 animate-pulse">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="h-10 w-10 rounded-full bg-gray-200" />
                        <div className="h-6 w-40 rounded bg-gray-200" />
                      </div>
                      <div className="h-4 w-full rounded bg-gray-200 mb-2" />
                      <div className="h-4 w-5/6 rounded bg-gray-200 mb-6" />
                      <div className="h-4 w-28 rounded bg-gray-200" />
                    </div>
                  ))
                : securityFeatures.map((feature, index) => (
                    <div key={index} className="flex flex-col sm:flex-row items-start gap-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex-shrink-0">{feature.icon}</div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                        <p className="text-gray-700 mt-1 mb-4">{feature.description}</p>
                        <Link to={feature.link} className="font-semibold text-indigo-600 hover:text-indigo-800">
                          {feature.linkText} &rarr;
                        </Link>
                      </div>
                    </div>
                  ))}
              {!loading && securityFeatures.length === 0 && (
                <div className="text-center text-gray-500">No account security data available right now.</div>
              )}
            </div>
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default AccountSecurity;
