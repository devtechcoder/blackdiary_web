"use client";

import React, { useState, useEffect } from "react";
import Main from "../../components/layout/Main";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router";
import ProfileActionModal from "../../modals/ProfileActionModal";
import apiPath from "../../constants/apiPath";
import { useGetApi } from "../../hooks/useRequest";
import Loader from "../../components/Loader";
import { getOriginalUserName } from "../../helper/functions";
import ProfileHeader from "../../components/profile/ProfileHeader";
import TabsNavigation from "../../components/profile/TabsNavigation";
import ShayariGrid from "../../components/profile/ShayariGrid";

const Profile = () => {
  const { isLoggedIn, userProfile: loggedInUserProfile } = useAuthContext();
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState("shayari");
  const [feedMeta, setFeedMeta] = useState({
    shayari: { totalDocs: 0 },
    post: { totalDocs: 0 },
  });
  const navigate = useNavigate();
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);

  // API hook to fetch the profile data for the user in the URL
  const { data, isLoading, isError, error } = useGetApi({
    queryKey: ["get-user-profile", username],
    endpoint: `${apiPath.common.getUserProfile}?q=${getOriginalUserName(username)}`,
    enabled: !!username, // Only run if a username is present in the URL
  });

  useEffect(() => {
    if (data?.status && !isError) {
      setProfileData(data?.data?._id ? data.data : null);
    }
  }, [data, isError]);

  // Determine if the logged-in user is viewing their own profile
  const isOwnProfile = isLoggedIn && loggedInUserProfile?.user_name === profileData?.user_name;
  const totalPosts = (feedMeta?.shayari?.totalDocs || 0) + (feedMeta?.post?.totalDocs || 0);

  if (isLoading) {
    return (
      <Main>
        <Loader />
      </Main>
    );
  }

  if (isError) {
    return (
      <Main>
        <div className="text-center text-red-500 p-8">Error: {error.message || "Failed to load profile."}</div>
      </Main>
    );
  }

  if (!profileData) {
    return (
      <Main>
        <div className="text-center text-gray-400 p-8">User not found.</div>
      </Main>
    );
  }

  return (
    <Main>
      <div className="mx-auto max-w-5xl space-y-6 px-2 pb-4 text-white md:px-4">
        {/*
          Encode the username so the follow pages open reliably even if the handle
          contains special characters.
        */}
        <ProfileHeader
          profileData={profileData}
          isOwnProfile={isOwnProfile}
          totalPosts={totalPosts}
          onEditProfile={() => navigate(`/account/edit-profile/${profileData?.user_name}/${profileData?._id}`)}
          onOpenSettings={() => setShow(true)}
          onFollowersClick={`/view-follow/follower/${profileData?._id}/${encodeURIComponent(profileData?.user_name || "")}`}
          onFollowingClick={`/view-follow/following/${profileData?._id}/${encodeURIComponent(profileData?.user_name || "")}`}
        />

        <div className="space-y-5">
          <TabsNavigation activeTab={activeTab} onChange={setActiveTab} />
          <ShayariGrid
            userId={profileData?._id}
            activeTab={activeTab}
            onMetaChange={(type, meta) => {
              setFeedMeta((prev) => ({
                ...prev,
                [type]: {
                  ...prev[type],
                  ...meta,
                },
              }));
            }}
          />
        </div>
      </div>
      {show && <ProfileActionModal show={show} hide={() => setShow(false)} />}
    </Main>
  );
};

export default Profile;
