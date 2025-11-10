import { Button } from "antd";
import React, { useState, useEffect } from "react";
import { FaCog } from "react-icons/fa";
import Main from "../../components/layout/Main";
import { useAuthContext } from "../../context/AuthContext";
import Prouser from "../../assets/images/user.png";
import { useNavigate, useParams } from "react-router";
import ProfileActionModal from "../../modals/ProfileActionModal";
import { Helmet } from "react-helmet-async";
import { SEO } from "../../constants/seo";
import apiPath from "../../constants/apiPath";
import { useGetApi } from "../../hooks/useRequest";
import Loader from "../../components/Loader";
import { getOriginalUserName } from "../../helper/functions";

const Profile = () => {
  const { isLoggedIn, userProfile: loggedInUserProfile } = useAuthContext();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);

  // API hook to fetch the profile data for the user in the URL
  const { data, isLoading, isError, error, refetch } = useGetApi({
    queryKey: ["get-user-profile", username],
    endpoint: `${apiPath.common.getUserProfile}?q=${getOriginalUserName(username)}`,
    enabled: !!username, // Only run if a username is present in the URL
  });

  useEffect(() => {
    if (data?.status && !isError) {
      setProfileData(data.data);
    }
  }, [data, isError]);

  // Determine if the logged-in user is viewing their own profile
  const isOwnProfile = isLoggedIn && loggedInUserProfile?.user_name === profileData?.user_name;

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
      <div className="max-w-4xl mx-auto p-4 text-white">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-8">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-2 border-gray-700 bg-black shadow-lg overflow-hidden">
              <img src={profileData?.image ?? Prouser} alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
              <div className="flex flex-col">
                <h3 className="font-semibold text-lg">{profileData?.user_name ?? ""}</h3>
                <h2 className="text-2xl font-light">{profileData?.name ?? ""}</h2>
              </div>
              {isOwnProfile && (
                <>
                  <Button className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700" onClick={() => navigate(`/account/edit-profile/${profileData?.user_name}/${profileData?._id}`)}>
                    Edit profile
                  </Button>
                  <FaCog className="text-xl cursor-pointer hover:text-gray-400" onClick={() => setShow(true)} />
                </>
              )}
            </div>
            {/* Posts, Followers, Following */}
            <div className="flex gap-4 md:gap-8 mt-4 text-sm md:text-base">
              <div>
                <strong>8</strong> posts
              </div>
              <div>
                <strong>{profileData?.followers_count || 0}</strong> followers
              </div>
              <div>
                <strong>{profileData?.following_count || 0}</strong> following
              </div>
            </div>
            <div className="mt-4 text-center sm:text-left">
              <p className="text-sm text-gray-400">Writer</p>
              <p className="text-sm mt-1 whitespace-pre-wrap">{profileData?.bio}</p>
            </div>
          </div>
        </div>

        {/* Tabs (Posts, Reels, etc.) */}
        <div className="border-t border-gray-700 mt-8 pt-4 flex justify-center sm:justify-around gap-8 text-sm font-medium text-gray-400">
          <span className="cursor-pointer">DIARIES</span>
          <span className="cursor-pointer">SAVED</span>
          <span className="cursor-pointer">TAGGED</span>
        </div>

        {/* Posts Placeholder */}
        <div className="grid grid-cols-3 gap-1 md:gap-4 mt-4">
          {Array(6)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="bg-gray-900 aspect-square flex items-center justify-center text-white text-2xl">
                {/* Placeholder for a post */}
              </div>
            ))}
        </div>
      </div>
      {show && <ProfileActionModal show={show} hide={() => setShow(false)} />}
    </Main>
  );
};

export default Profile;
