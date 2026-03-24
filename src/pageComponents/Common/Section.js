import { useNavigate } from "react-router";
import { LikeShareActionIcon } from "../../components/ButtonField";
import Prouser from "../../assets/images/user.png";
import Slider from "react-slick";
import { useEffect, useRef, useState } from "react";
import { useGetApi } from "../../hooks/useRequest";
import apiPath from "../../constants/apiPath";
import dayjs from "dayjs";
import AppImage from "../../components/AppImage";
import { FaQuoteLeft } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { stripHtml } from "../../helper/functions";

const getDiaryCarouselMeta = (type, title) => {
  if (type === "liked") {
    return {
      eyebrow: "Your vibe, remembered",
      description: "A smoother ribbon of diary entries shaped around what readers keep coming back to.",
      accent: "",
    };
  }

  if (type === "recently_viewed") {
    return {
      eyebrow: "Picked from the diary",
      description: "Quick access to diary notes that are drawing repeat attention right now.",
      accent: "Popular now",
    };
  }

  return {
    eyebrow: "Curated diaries",
    description: `A refined carousel experience for ${String(title || "diary entries").toLowerCase()}.`,
    accent: "Editor's ribbon",
  };
};

export const ViewSliderDairy = ({ data, title, viewBtnName = "Show all", type }) => {
  const sliderRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = data?.length || 0;
  const settings = {
    dots: totalSlides > 1,
    infinite: totalSlides > 1,
    autoplay: totalSlides > 1,
    autoplaySpeed: 4200,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    pauseOnHover: true,
    beforeChange: (_, next) => setActiveSlide(next),
    appendDots: (dots) => (
      <div className="mt-6">
        <ul className="flex items-center justify-center gap-2"> {dots} </ul>
      </div>
    ),
    customPaging: (index) => (
      <button
        type="button"
        aria-label={`Go to diary slide ${index + 1}`}
        className={`h-2.5 rounded-full transition-all duration-300 ${index === activeSlide ? "w-8 bg-[#d4af37]" : "w-2.5 bg-[rgba(255,255,255,0.22)] hover:bg-[rgba(255,215,0,0.45)]"}`}
      />
    ),
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const navigate = useNavigate();
  const carouselMeta = getDiaryCarouselMeta(type, title);

  return (
    <section className="mt-8 px-3 sm:px-4">
      <div className="relative overflow-hidden rounded-[30px] border border-[rgba(212,175,55,0.12)] bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.08),transparent_30%),linear-gradient(180deg,#121212_0%,#090909_100%)] shadow-[0_22px_70px_rgba(0,0,0,0.28)]">
        <div className="relative border-b border-[rgba(212,175,55,0.08)] px-4 py-5 sm:px-6 sm:py-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(212,175,55,0.14)] bg-[rgba(212,175,55,0.06)] px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-[#f1d98d] sm:text-[11px]">
                <HiSparkles className="text-sm" />
                {carouselMeta.eyebrow}
              </div>
              <h2 className="poetic-heading mt-3 text-[1.28rem] leading-tight text-[#fff3d3] sm:text-[1.55rem] md:text-[1.7rem]">{title}</h2>
              <p className="mt-2 max-w-2xl text-[12px] leading-5 text-[#aea38c] sm:text-[13px] sm:leading-6">{carouselMeta.description}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => sliderRef.current?.slickPrev()}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(212,175,55,0.18)] bg-[rgba(255,255,255,0.03)] text-[#f4d57d] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[rgba(212,175,55,0.08)]"
                  aria-label="Previous diary"
                >
                  <FiArrowLeft className="text-base" />
                </button>
                <button
                  type="button"
                  onClick={() => sliderRef.current?.slickNext()}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(212,175,55,0.18)] bg-[rgba(255,255,255,0.03)] text-[#f4d57d] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[rgba(212,175,55,0.08)]"
                  aria-label="Next diary"
                >
                  <FiArrowRight className="text-base" />
                </button>
              </div>

              <button
                type="button"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[rgba(212,175,55,0.18)] bg-[rgba(212,175,55,0.08)] px-4 py-2.5 text-sm font-semibold text-[#ffe7a0] transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(255,215,0,0.34)] hover:bg-[rgba(212,175,55,0.14)] sm:w-auto"
                onClick={() => navigate(`/diary-by-type/${type ?? ""}`)}
              >
                {viewBtnName}
                <FiArrowRight />
              </button>
            </div>
          </div>
        </div>

        <div className="relative px-3 py-4 sm:px-4 sm:py-5">
          {totalSlides ? (
            <Slider ref={sliderRef} className="bd-diary-slider" {...settings}>
              {data?.map((item, index) => {
                const authorName = item?.author?.username || item?.author?.user_name || item?.author?.name || "Unknown";
                const postedAt = item?.created_at || item?.createdAt;
                const plainText = stripHtml(item?.content || "");
                const timeAgo = postedAt ? dayjs(postedAt).fromNow() : "Freshly written";

                return (
                  <div key={item?._id || index} className="px-2 pb-1">
                    <article className="group mx-auto max-w-3xl overflow-hidden rounded-[28px] border border-[rgba(212,175,55,0.1)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-[1px] shadow-[0_14px_32px_rgba(0,0,0,0.24)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(0,0,0,0.32)]">
                      <div className="relative overflow-hidden rounded-[27px] bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.07),transparent_28%),linear-gradient(180deg,rgba(18,18,18,0.98),rgba(11,11,11,0.98))] p-4 sm:p-5">
                        <div className="relative flex items-center gap-3">
                          <AppImage
                            src={item?.author?.image || Prouser}
                            alt="Profile"
                            width={44}
                            height={44}
                            className="h-11 w-11 rounded-full border border-[rgba(212,175,55,0.22)] object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-3">
                              <div className="min-w-0">
                                <p className="truncate text-[1rem] font-semibold text-[#fbf1d4]">{authorName}</p>
                                <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-[#978760]">{timeAgo}</p>
                              </div>
                              {type !== "liked" && carouselMeta.accent ? (
                                <span className="inline-flex shrink-0 items-center rounded-full border border-[rgba(212,175,55,0.14)] bg-[rgba(212,175,55,0.06)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f0d98d]">
                                  {carouselMeta.accent}
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </div>

                        <div className="relative mt-4 rounded-[22px] border border-[rgba(212,175,55,0.08)] bg-[rgba(255,255,255,0.02)] px-4 py-5 sm:px-5">
                          <FaQuoteLeft className="absolute left-4 top-4 text-base text-[rgba(212,175,55,0.18)]" />
                          <p
                            className="poetic-heading pl-6 text-[1.02rem] leading-[1.75] text-[#f7efde] sm:text-[1.16rem] md:text-[1.24rem]"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {plainText || "A quiet page from the diary is waiting here."}
                          </p>
                        </div>

                        <div className="mt-4 border-t border-[rgba(212,175,55,0.08)] pt-4">
                          <LikeShareActionIcon item={item} variant="diary" showMeta={false} showLabels fullWidth={true} />
                        </div>
                      </div>
                    </article>
                  </div>
                );
              })}
            </Slider>
          ) : (
            <div className="rounded-[26px] border border-[rgba(212,175,55,0.12)] bg-[rgba(255,255,255,0.03)] px-5 py-12 text-center">
              <p className="poetic-heading text-3xl text-[#fff1cb]">No diary entries here yet</p>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#a89d82]">This section will glow up as soon as the diary feed picks up entries worth revisiting.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export const ViewListDiary = ({ list }) => {
  return (
    <div className="flex flex-col gap-4 px-2">
      {list?.map((item, index) => {
        const postedAt = item?.created_at || item?.createdAt;
        const timeAgo = postedAt ? dayjs(postedAt)?.fromNow() : "";
        return (
          <div
            key={index}
            className="w-[90%] sm:w-[600px] mx-auto bg-[#161616] text-white rounded-[18px] p-6 border border-[rgba(212,175,55,0.15)] shadow-[0_10px_22px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-[6px] hover:shadow-[0_0_20px_rgba(212,175,55,0.25)]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <AppImage src={item?.author?.image || Prouser} alt="Profile" width={40} height={40} className="h-10 w-10 rounded-full object-cover border border-[#D4AF37]" />
                <div>
                  <p className="text-sm font-semibold text-[#F5F5F5]">{item?.author?.username ?? (item?.author?.name || "Unknown")}</p>
                  <p className="text-xs text-[#9CA3AF]">{timeAgo && `Uploaded ${timeAgo}`}</p>
                </div>
              </div>
            </div>

            <div style={{ maxHeight: "180px" }} className="overflow-y-auto pr-2 text-[17px] leading-relaxed text-[#F5F5F5] whitespace-pre-line font-[500]">
              <p dangerouslySetInnerHTML={{ __html: item?.content }} />
              <p className="text-sm text-[#9CA3AF] font-semibold mt-3">- {item?.author?.name}</p>
            </div>

            <div className="mt-4 border-t border-[rgba(212,175,55,0.15)] pt-3">
              <LikeShareActionIcon item={item} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const BannerSection = ({ type }) => {
  const [list, setList] = useState([]);
  const [pagination] = useState({ current: 1, pageSize: 10 });

  const { data, isLoading, isError, error } = useGetApi({
    queryKey: "BannerSection",
    endpoint: `${apiPath.listBanner}?page=${pagination ? pagination.current : 1}&pageSize=${pagination ? pagination.pageSize : 10}`,
  });

  useEffect(() => {
    if (data?.status && !isError) {
      setList(data?.data?.docs ?? []);
    }
  }, [data, isError]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="w-full bg-black py-4">
      <Slider className="owl-theme" {...settings}>
        {list?.map((item, index) => (
          <div key={index} className="px-2">
            <div className="relative h-[200px] w-full md:h-[300px]">
              <AppImage src={item.image} alt={`Banner ${index}`} fill sizes="100vw" className="rounded-xl object-cover shadow-lg" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
