import React, { useEffect, useMemo, useState } from "react";
import Main from "../../components/layout/Main";
import { useNavigate } from "react-router";
import { useGetApi } from "../../hooks/useRequest";
import apiPath from "../../constants/apiPath";
import Prouser from "../../assets/images/user.png";
import { Helmet } from "react-helmet-async";
import { SEO } from "../../constants/seo";

const ViewAllOccasion = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  const { data, isLoading, isError } = useGetApi({
    queryKey: "occasionData",
    endpoint: `${apiPath.getOccasionData}?page=1&pageSize=40`,
  });

  useEffect(() => {
    if (data?.status && !isError) {
      setList(data?.data?.docs ?? []);
    }
  }, [data, isError]);

  const occasions = useMemo(
    () =>
      list.map((item) => ({
        id: item?._id,
        name: item?.name || "Occasion",
        description: item?.description || "Celebrate every feeling with meaningful shayari curated for this special moment.",
        image: item?.image || Prouser,
      })),
    [list],
  );

  return (
    <>
      <Helmet>
        <title>{SEO.viewAllOccasionsPage.primary.title}</title>
        <meta name="description" content={SEO.viewAllOccasionsPage.primary.description} />
        <meta name="keywords" content={SEO.viewAllOccasionsPage.primary.keywords} />

        <meta property="og:title" content={SEO.viewAllOccasionsPage.openGraph.title} />
        <meta property="og:description" content={SEO.viewAllOccasionsPage.openGraph.description} />
        <meta property="og:image" content={SEO.viewAllOccasionsPage.openGraph.image} />
        <meta property="og:url" content={SEO.viewAllOccasionsPage.openGraph.url} />
        <meta property="og:type" content={SEO.viewAllOccasionsPage.openGraph.type} />
        <meta property="og:site_name" content={SEO.viewAllOccasionsPage.openGraph.site_name} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.viewAllOccasionsPage.twitter.title} />
        <meta name="twitter:description" content={SEO.viewAllOccasionsPage.twitter.description} />
        <meta name="twitter:image" content={SEO.viewAllOccasionsPage.twitter.image} />
        <meta name="twitter:url" content={SEO.viewAllOccasionsPage.twitter.url} />
        <meta name="twitter:type" content={SEO.viewAllOccasionsPage.twitter.type} />
        <meta name="twitter:site_name" content={SEO.viewAllOccasionsPage.twitter.site_name} />

        <link rel="canonical" href={SEO.common.url} />
        <meta name="robots" content={SEO.common.robots} />
        <meta name="language" content={SEO.common.language} />
        <meta name="author" content={SEO.common.author} />
      </Helmet>

      <Main>
        <section className="min-h-screen bg-[#0B0B0B] px-4 py-10 md:px-6">
          <div className="bd-container">
            <header className="mb-10 text-center">
              <h1 className="poetic-heading text-4xl font-semibold text-[#D4AF37] md:text-5xl">Dil Se Har Lamha Ke Liye</h1>
              <p className="mt-3 text-base text-white/80 md:text-lg">Explore Shayari for Every Occasion</p>
            </header>

            {isLoading ? (
              <div
                className="grid gap-6"
                style={{
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                }}
              >
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="h-[350px] animate-pulse rounded-[18px] border border-[#2A2A2A] bg-[#161616]" />
                ))}
              </div>
            ) : isError ? (
              <p className="text-center text-white/80">Unable to load occasions right now.</p>
            ) : (
              <div
                className="grid gap-6"
                style={{
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                }}
              >
                {occasions.map((occasion) => (
                  <article
                    key={occasion.id}
                    className="group overflow-hidden rounded-[18px] border border-[#D4AF37] bg-[#161616] shadow-[0_10px_24px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-[6px] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img src={occasion.image} alt={occasion.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    </div>

                    <div className="flex min-h-[190px] flex-col p-5">
                      <h3 className="poetic-heading text-2xl leading-tight text-white">{occasion.name}</h3>
                      <p className="mt-3 line-clamp-3 text-sm text-white/80">{occasion.description}</p>

                      <button
                        onClick={() => navigate(`/occasion/details/${occasion.name}/${occasion.id}`)}
                        className="mt-auto inline-flex w-fit items-center rounded-full border border-[#D4AF37] bg-[#D4AF37] px-4 py-2 text-xs font-semibold tracking-wide text-black transition-all duration-300 hover:border-[#FFD700] hover:bg-[#FFD700] hover:shadow-[0_0_12px_rgba(255,215,0,0.45)]"
                        type="button"
                      >
                        Explore Shayari ->
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </Main>
    </>
  );
};

export default ViewAllOccasion;
