import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import PublicLayout from "../../components/layout/publicLayout";
import { useRequest } from "../../hooks/useReduxRequest";
import apiPath from "../../constants/apiPath";
import Prouser from "../../assets/images/user.png";
import { useSelector } from "react-redux";

const Leadership = () => {
  const [list, setList] = useState([]);
  const [pagination] = useState({ current: 1, pageSize: 10 });
  const headingData = useSelector((state) => state.masterData.allPageHeadings?.find((item) => ["leadership", "our_leadership", "user_leadership"].includes(item.type)));

  const { response: data, loading } = useRequest(`${apiPath.getLeadershipList}?page=${pagination ? pagination.current : 1}&pageSize=${pagination ? pagination.pageSize : 10}`);

  useEffect(() => {
    if (data?.status) {
      setList(data?.data?.docs ?? []);
    }
  }, [data]);

  return (
    <>
      <Helmet>
        <title>{headingData?.title || "Our Leadership"} - Black Diary</title>
        <meta name="description" content="Meet the team behind Black Diary. Our leaders are passionate about creating a space for creativity and expression." />
      </Helmet>

      <PublicLayout>
        <section className="min-h-screen bg-[#0B0B0B] py-12">
          <div className="bd-container px-4">
            <div className="mb-14 text-center">
              <h1 className="poetic-heading text-[36px] font-semibold text-[#D4AF37]">{headingData?.title || "Our Leadership"}</h1>
              <p className="mt-2 text-[14px] text-[#9ca3af]">{headingData?.sub_title || "The passionate team bringing poetry to the world."}</p>
            </div>

            <div
              className="grid gap-7"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              }}
            >
              {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="animate-pulse rounded-[18px] border border-[rgba(212,175,55,0.25)] bg-[#161616] p-6">
                      <div className="mx-auto mb-4 h-[90px] w-[90px] rounded-full bg-[#232323]" />
                      <div className="mx-auto mb-3 h-5 w-36 rounded bg-[#232323]" />
                      <div className="mx-auto mb-4 h-4 w-28 rounded bg-[#232323]" />
                      <div className="mx-auto mb-2 h-3 w-full rounded bg-[#232323]" />
                      <div className="mx-auto h-3 w-4/5 rounded bg-[#232323]" />
                    </div>
                  ))
                : !!list?.length &&
                  list?.map((leader, index) => (
                    <article
                      key={leader?._id || index}
                      className="rounded-[18px] border border-[rgba(212,175,55,0.25)] bg-[#161616] p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(212,175,55,0.25)]"
                    >
                      <img
                        src={leader?.image || Prouser}
                        alt={leader?.name || "Leader"}
                        className="mx-auto h-[90px] w-[90px] rounded-full border-[3px] border-[#D4AF37] object-cover"
                      />

                      <h3 className="mt-[10px] text-[18px] font-semibold text-white">{leader?.name || ""}</h3>
                      <p className="text-[13px] text-[#D4AF37]">{leader?.designation || ""}</p>

                      <p className="mt-[6px] text-[13px] leading-relaxed text-[#9ca3af]" dangerouslySetInnerHTML={{ __html: leader?.description || "" }} />
                    </article>
                  ))}

              {!loading && !list?.length && <div className="text-center text-[#9ca3af]">No leadership data available right now.</div>}
            </div>
          </div>
        </section>
      </PublicLayout>
    </>
  );
};

export default Leadership;
