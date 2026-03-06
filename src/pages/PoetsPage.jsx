import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import Main from "../components/layout/Main";
import UserCard from "../components/UserCard";
import apiPath from "../constants/apiPath";
import { SEO } from "../constants/seo";
import { useGetApi } from "../hooks/useRequest";
import useRequest from "../hooks/useRequest";
import { useAuthContext } from "../context/AuthContext";
import { Severty, ShowToast } from "../helper/toast";

const PoetsPage = () => {
  const navigate = useNavigate();
  const [pagination] = useState({ current: 1, pageSize: 50 });
  const [users, setUsers] = useState([]);
  const [followState, setFollowState] = useState({});
  const [followLoading, setFollowLoading] = useState({});
  const { request } = useRequest();
  const { isLoggedIn } = useAuthContext();

  const { data, isLoading, isError } = useGetApi({
    queryKey: "poetData",
    endpoint: `${apiPath.getPoetData}?page=${pagination.current}&pageSize=${pagination.pageSize}`,
  });

  const normalizedUsers = useMemo(
    () =>
      (users || []).map((item) => ({
        id: item?._id || item?.id,
        name: item?.name || item?.full_name || "Unknown Poet",
        username: item?.user_name || item?.username || item?.name?.replace(/\s+/g, "").toLowerCase() || "poet",
        profileImage: item?.image || item?.profileImage || "",
        slug: item?.name || "poet",
        apiFollowing: Boolean(item?.is_follow),
      })),
    [users],
  );

  useEffect(() => {
    if (data?.status && Array.isArray(data?.data?.docs)) {
      const docs = data.data.docs;
      setUsers(docs);

      const initialFollowState = docs.reduce((acc, user) => {
        const id = user?._id || user?.id;
        if (id) acc[id] = Boolean(user?.is_follow);
        return acc;
      }, {});
      setFollowState(initialFollowState);
    }
  }, [data]);

  const toggleFollow = (id) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    setFollowLoading((prev) => ({ ...prev, [id]: true }));
    request({
      url: apiPath.toggleFollow,
      method: "POST",
      data: {
        following_id: id,
      },
      onSuccess: (response) => {
        setFollowLoading((prev) => ({ ...prev, [id]: false }));
        if (response?.status) {
          setFollowState((prev) => ({
            ...prev,
            [id]: !prev[id],
          }));
          ShowToast(response?.message || "Follow state updated", Severty.SUCCESS);
        } else {
          ShowToast(response?.message || "Unable to update follow state", Severty.ERROR);
        }
      },
      onError: (error) => {
        setFollowLoading((prev) => ({ ...prev, [id]: false }));
        ShowToast(error?.response?.data?.message || "Unable to update follow state", Severty.ERROR);
      },
    });
  };

  return (
    <>
      <Helmet>
        <title>{SEO.AllPoetsPage.primary.title}</title>
        <meta name="description" content={SEO.AllPoetsPage.primary.description} />
        <meta name="keywords" content={SEO.AllPoetsPage.primary.keywords} />

        <meta property="og:title" content={SEO.AllPoetsPage.openGraph.title} />
        <meta property="og:description" content={SEO.AllPoetsPage.openGraph.description} />
        <meta property="og:image" content={SEO.AllPoetsPage.openGraph.image} />
        <meta property="og:url" content={SEO.AllPoetsPage.openGraph.url} />
        <meta property="og:type" content={SEO.AllPoetsPage.openGraph.type} />
        <meta property="og:site_name" content={SEO.AllPoetsPage.openGraph.site_name} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.AllPoetsPage.twitter.title} />
        <meta name="twitter:description" content={SEO.AllPoetsPage.twitter.description} />
        <meta name="twitter:image" content={SEO.AllPoetsPage.twitter.image} />
        <meta name="twitter:url" content={SEO.AllPoetsPage.twitter.url} />
        <meta name="twitter:type" content={SEO.AllPoetsPage.twitter.type} />
        <meta name="twitter:site_name" content={SEO.AllPoetsPage.twitter.site_name} />

        <link rel="canonical" href={SEO.common.url} />
        <meta name="robots" content={SEO.common.robots} />
        <meta name="language" content={SEO.common.language} />
        <meta name="author" content={SEO.common.author} />
      </Helmet>

      <Main>
        <section className="min-h-screen bg-[#0D0D0D] py-10">
          <div className="bd-container px-2 md:px-4">
            <div className="mb-8">
              <h1 className="poetic-heading text-4xl font-semibold text-[#F5F5F5]">Shayari Ke Sitare</h1>
              <p className="mt-2 text-sm text-[#CFCFCF]">Vo awaazein jo alfaazon ko rooh deti hain.</p>
            </div>

            {isLoading ? (
              <p className="text-[#CFCFCF]">Loading poets...</p>
            ) : isError ? (
              <p className="text-[#CFCFCF]">Unable to load poets right now.</p>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                {normalizedUsers.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    isFollowing={followState[user.id] ?? user.apiFollowing}
                    loading={!!followLoading[user.id]}
                    onToggleFollow={() => toggleFollow(user.id)}
                    onOpenProfile={() => navigate(`/poets/details/${user.slug}/${user.id}`)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </Main>
    </>
  );
};

export default PoetsPage;
