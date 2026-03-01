import React from "react";
import { Helmet } from "react-helmet-async";
import PublicLayout from "../../../components/layout/publicLayout";
import { Link } from "react-router-dom";
import { LockOutlined, EyeInvisibleOutlined, UserDeleteOutlined, SafetyCertificateOutlined, NotificationOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

import { useRequest } from "../../../hooks/useReduxRequest";
import apiPath from "../../../constants/apiPath";

const getToolIcon = (title = "") => {
  const normalizedTitle = title.toLowerCase();

  if (normalizedTitle.includes("privacy")) return <EyeInvisibleOutlined className="text-3xl text-indigo-500" />;
  if (normalizedTitle.includes("block")) return <UserDeleteOutlined className="text-3xl text-indigo-500" />;
  if (normalizedTitle.includes("content")) return <SafetyCertificateOutlined className="text-3xl text-indigo-500" />;
  if (normalizedTitle.includes("notification")) return <NotificationOutlined className="text-3xl text-indigo-500" />;

  return <LockOutlined className="text-3xl text-indigo-500" />;
};

const SafetyTools = () => {
  const headingData = useSelector((state) => state.masterData.allPageHeadings?.find((item) => item.type === "user_safety_toolkit"));

  const { response: data, loading } = useRequest(`${apiPath.common.getMasters}/user_safety_toolkit`);

  const tools = React.useMemo(() => {
    const list = data?.data;
    if (!Array.isArray(list)) return [];

    return list.map((item) => {
      const title = item?.title || item?.name || "";

      return {
        icon: getToolIcon(title),
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
        <title>{headingData?.title || "Safety Tools"} - Black Diary</title>
        <meta name="description" content="Explore the safety tools available on Black Diary to control your privacy, manage your content, and secure your account." />
      </Helmet>

      <PublicLayout>
        <div className="bg-white text-gray-800 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">{headingData?.title || ""}</h1>
              <p className="text-lg text-gray-600">{headingData?.sub_title || ""}</p>
            </div>

            {/* Tools Grid */}
            <div className="grid md:grid-cols-2 gap-8">
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
                : tools.map((tool, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4 mb-4">
                        {tool.icon}
                        <h3 className="text-xl font-semibold text-gray-900">{tool.title}</h3>
                      </div>
                      <p className="text-gray-700 mb-4">{tool.description}</p>
                      <Link to={tool.link} className="font-semibold text-indigo-600 hover:text-indigo-800">
                        {tool.linkText} &rarr;
                      </Link>
                    </div>
                  ))}
              {!loading && tools.length === 0 && <div className="md:col-span-2 text-center text-gray-500">No safety tools available right now.</div>}
            </div>
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default SafetyTools;
