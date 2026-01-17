import React, { useEffect, useState } from "react";
import Main from "../../components/layout/Main";
import { useNavigate } from "react-router";
import { useGetApi } from "../../hooks/useRequest";
import apiPath from "../../constants/apiPath";
import Prouser from "../../assets/images/user.png";
import { Helmet } from "react-helmet-async";
import { SEO } from "../../constants/seo";
const AllPoets = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const { data, isLoading, isError, error, refetch } = useGetApi({
    queryKey: "poetData",
    endpoint: `${apiPath.getPoetData}?page=${pagination ? pagination.current : 1}&pageSize=${pagination ? pagination.pageSize : 10}`,
  });

  useEffect(() => {
    if (data?.status && !isError) {
      setList(data?.data?.docs ?? []);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  return (
    <>
      <Helmet>
        {/* 🔹 Primary Meta Tags */}
        <title>{SEO.AllPoetsPage.primary.title}</title>
        <meta name="description" content={SEO.AllPoetsPage.primary.description} />
        <meta name="keywords" content={SEO.AllPoetsPage.primary.keywords} />

        {/* 🔹 Open Graph (for Facebook, WhatsApp, etc.) */}
        <meta property="og:title" content={SEO.AllPoetsPage.openGraph.title} />
        <meta property="og:description" content={SEO.AllPoetsPage.openGraph.description} />
        <meta property="og:image" content={SEO.AllPoetsPage.openGraph.image} />
        <meta property="og:url" content={SEO.AllPoetsPage.openGraph.url} />
        <meta property="og:type" content={SEO.AllPoetsPage.openGraph.type} />
        <meta property="og:site_name" content={SEO.AllPoetsPage.openGraph.site_name} />

        {/* 🔹 Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.AllPoetsPage.twitter.title} />
        <meta name="twitter:description" content={SEO.AllPoetsPage.twitter.description} />
        <meta name="twitter:image" content={SEO.AllPoetsPage.twitter.image} />
        <meta name="twitter:url" content={SEO.AllPoetsPage.twitter.url} />
        <meta name="twitter:type" content={SEO.AllPoetsPage.twitter.type} />
        <meta name="twitter:site_name" content={SEO.AllPoetsPage.twitter.site_name} />

        {/* 🔹 Canonical & Language Tags */}
        <link rel="canonical" href={SEO.common.url} />
        <meta name="robots" content={SEO.common.robots} />
        <meta name="language" content={SEO.common.language} />
        <meta name="author" content={SEO.common.author} />
      </Helmet>

      <Main>
        <div className="bg-black min-h-screen text-white px-6 py-8">
          <h2 className="text-2xl font-bold mb-6 text-white">Shayari Ke Sitare</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {list?.map((item) => (
              <div key={item?._id} className="bg-zinc-900 rounded-lg overflow-hidden relative group cursor-pointer hover:bg-zinc-800 transition-all duration-300">
                <img src={item?.image ?? Prouser} alt={item?.name} className="object-cover w-full h-40 md:h-48" />

                {/* Play button */}
                <div className="absolute right-3 bottom-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-green-500 p-3 rounded-full shadow-lg" onClick={() => navigate(`/shayar/details/${item.name}/${item._id}`)}>
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6 4l10 6-10 6V4z" />
                    </svg>
                  </div>
                </div>

                {/* Text Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold truncate">{item.name}</h3>
                  <p className="text-sm text-gray-400 mt-1 truncate">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Main>
    </>
  );
};

export default AllPoets;
