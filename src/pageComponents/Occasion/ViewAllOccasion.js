"use client";

import React, { useEffect, useMemo, useState } from "react";
import Main from "../../components/layout/Main";
import { useNavigate } from "react-router";
import { useGetApi } from "../../hooks/useRequest";
import apiPath from "../../constants/apiPath";
import Prouser from "../../assets/images/user.png";import AppImage from "../../components/AppImage";

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
                    className="occasion-card group overflow-hidden transition-all duration-300 hover:-translate-y-[6px]"
                  >
                    <div className="occasion-card-media relative overflow-hidden">
                      <AppImage src={occasion.image} alt={occasion.name} fill sizes="(max-width: 1024px) 100vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    </div>

                    <div className="occasion-card-body flex flex-col px-5 pb-5 pt-4">
                      <h3 className="poetic-heading text-2xl leading-tight text-white">{occasion.name}</h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-7 text-white/80">{occasion.description}</p>

                      <button
                        onClick={() => navigate(`/occasion/details/${occasion.name}/${occasion.id}`)}
                        className="occasion-card-button mt-5 inline-flex w-fit items-center rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-300"
                        type="button"
                      >
                        Explore Shayari {"->"}
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

