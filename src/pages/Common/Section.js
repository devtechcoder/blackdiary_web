import { useNavigate } from "react-router";
import { LikeShareActionIcon, ViewActionIcon } from "../../components/ButtonField";
import Prouser from "../../assets/images/user.png";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import { useGetApi } from "../../hooks/useRequest";
import apiPath from "../../constants/apiPath";
import dayjs from "dayjs";

export const ViewSliderDairy = ({ data, title, viewBtnName = "Show all", type }) => {
  const settings = {
    dots: false,
    infinite: data?.length > 5,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
    ],
  };
  const navigate = useNavigate();
  return (
    <>
      <div className="mt-6 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-2xl font-bold text-white">{title}</h2>
          <button className="text-xs sm:text-sm text-blue-500 hover:underline" onClick={() => navigate(`/diary-by-type/${type ?? ""}`)}>
            {viewBtnName}
          </button>
        </div>

        <Slider {...settings}>
          {data?.map((item, index) => (
            <div key={index} className="px-2">
              <div className="space-y-4">
                <div key={item?._id} className="bg-zinc-800 text-white rounded-2xl p-5 shadow-md">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={item?.author?.image || Prouser} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                    <p className="text-sm font-semibold text-white">{item?.author?.username || item?.author?.name || "Unknown"}</p>
                  </div>
                  <div style={{ height: "176px" }} className="overflow-y-auto pr-1">
                    <p className="text-lg whitespace-pre-line" dangerouslySetInnerHTML={{ __html: item?.content }} />
                  </div>

                  <LikeShareActionIcon item={item} />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export const ViewListDiary = ({ list }) => {
  return (
    <>
      <div className="flex flex-col gap-4 px-2">
        {list?.map((item, index) => {
          const postedAt = item?.created_at || item?.createdAt;
          const timeAgo = postedAt ? dayjs(postedAt)?.fromNow() : "";
          return (
            <div
              key={index}
              className="w-[90%] sm:w-[600px] mx-auto bg-gradient-to-br from-[#0f0f0f] to-[#1c1c1c] text-white rounded-2xl p-6 shadow-[0_0_15px_rgba(255,255,255,0.06)] border border-zinc-700 transition-transform hover:scale-[1.01]"
            >
              {/* Profile + Time */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img src={item?.author?.image || Prouser} alt="Profile" className="w-10 h-10 rounded-full object-cover border border-zinc-600" />
                  <div>
                    <p className="text-sm font-semibold">{item?.author?.username ?? (item?.author?.name || "Unknown")}</p>
                    <p className="text-xs text-zinc-400">{timeAgo && `Uploaded ${timeAgo}`}</p>
                  </div>
                </div>
              </div>

              {/* Shayari Content */}
              <div style={{ maxHeight: "180px" }} className="overflow-y-auto pr-2 text-[17px] leading-relaxed text-zinc-100 whitespace-pre-line font-[500]">
                <p dangerouslySetInnerHTML={{ __html: item?.content }} />
                <p className="text-sm text-zinc-500 font-semibold mt-3">— {item?.author?.name}</p>
              </div>

              {/* Actions */}
              <div className="mt-4 border-t border-zinc-700 pt-3">
                <LikeShareActionIcon item={item} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export const BannerSection = ({ type }) => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const { data, isLoading, isError, error, refetch } = useGetApi({
    queryKey: "BannerSection",
    endpoint: `${apiPath.listBanner}?page=${pagination ? pagination.current : 1}&pageSize=${pagination ? pagination.pageSize : 10}`,
  });

  useEffect(() => {
    if (data?.status && !isError) {
      setList(data?.data?.docs ?? []);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000, // 3 seconds
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
            <img src={item.image} alt={`Banner ${index}`} className="w-full h-[200px] md:h-[300px] object-cover rounded-xl shadow-lg" />
          </div>
        ))}
      </Slider>
    </div>
  );
};
