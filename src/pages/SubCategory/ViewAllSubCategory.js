import React, { useEffect, useState } from "react";
import Main from "../../components/layout/Main";
import { useNavigate } from "react-router";
import { useGetApi } from "../../hooks/useRequest";
import apiPath from "../../constants/apiPath";
import Prouser from "../../assets/images/user.png";
import Loader from "../../components/Loader";
import { FormattedBgColor } from "../../constants/Constants";
import { Helmet } from "react-helmet-async";
import { SEO } from "../../constants/seo";
const ViewAllSubCategory = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const { data, isLoading, isError, error, refetch } = useGetApi({
    queryKey: "ViewAllSubCategory",
    endpoint: `${apiPath.listSubCategory}?page=${pagination ? pagination.current : 1}&pageSize=${pagination ? pagination.pageSize : 10}`,
  });

  useEffect(() => {
    if (data?.status && !isError) {
      setList(data?.data?.docs ?? []);
    }
  }, [data]);

  if (isLoading)
    return (
      <Main>
        <Loader />
      </Main>
    );

  if (isError) return <p>Error: {error.message}</p>;
  return (
    <>
      <Helmet>
        {/* 🔹 Primary Meta Tags */}
        <title>{SEO.subCategoryDetailsPage.primary.title}</title>
        <meta name="description" content={SEO.subCategoryDetailsPage.primary.description} />
        <meta name="keywords" content={SEO.subCategoryDetailsPage.primary.keywords} />

        {/* 🔹 Open Graph (for Facebook, WhatsApp, etc.) */}
        <meta property="og:title" content={SEO.subCategoryDetailsPage.openGraph.title} />
        <meta property="og:description" content={SEO.subCategoryDetailsPage.openGraph.description} />
        <meta property="og:image" content={SEO.subCategoryDetailsPage.openGraph.image} />
        <meta property="og:url" content={SEO.subCategoryDetailsPage.openGraph.url} />
        <meta property="og:type" content={SEO.subCategoryDetailsPage.openGraph.type} />
        <meta property="og:site_name" content={SEO.subCategoryDetailsPage.openGraph.site_name} />

        {/* 🔹 Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.subCategoryDetailsPage.twitter.title} />
        <meta name="twitter:description" content={SEO.subCategoryDetailsPage.twitter.description} />
        <meta name="twitter:image" content={SEO.subCategoryDetailsPage.twitter.image} />
        <meta name="twitter:url" content={SEO.subCategoryDetailsPage.twitter.url} />
        <meta name="twitter:type" content={SEO.subCategoryDetailsPage.twitter.type} />
        <meta name="twitter:site_name" content={SEO.subCategoryDetailsPage.twitter.site_name} />

        {/* 🔹 Canonical & Language Tags */}
        <link rel="canonical" href={SEO.common.url} />
        <meta name="robots" content={SEO.common.robots} />
        <meta name="language" content={SEO.common.language} />
        <meta name="author" content={SEO.common.author} />
      </Helmet>
      <Main>
        <div className="bg-black min-h-screen text-white px-6 py-8">
          <h2 className="text-2xl font-bold mb-6 text-white">Browse all</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {list?.map((item, idx) => (
              <div
                key={idx}
                className={`relative rounded-lg overflow-hidden cursor-pointer group p-4 h-40 ${FormattedBgColor[item.bg_color] || "bg-gray-600"} hover:scale-105 transition-transform duration-300`}
                onClick={() => navigate(`/sub-category/details/${item?.name}/${item._id}`)}
              >
                {/* Text at top-left */}
                <h3 className="text-lg font-bold text-white z-10 relative">{item.name}</h3>

                {/* Image at full height & rotated, bottom-right pinned */}
                <img src={item.image} alt={item.name} className="absolute bottom-0 right-0 w-[80px] h-[80px] rotate-[25deg] shadow-xl object-cover" />
              </div>
            ))}
          </div>
        </div>
      </Main>
    </>
  );
};

export default ViewAllSubCategory;
