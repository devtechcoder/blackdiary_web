import { Button } from "antd";
import React, { useState } from "react";
import { FaCog } from "react-icons/fa";
import Main from "../../components/layout/Main";
import { useAuthContext } from "../../context/AuthContext";
import Prouser from "../../assets/images/user.png";
import { useNavigate } from "react-router";
import ProfileActionModal from "../../modals/ProfileActionModal";
import { Helmet } from "react-helmet-async";
import { SEO } from "../../constants/seo";
const Profile = () => {
  const { setIsLoggedIn, refreshUser, userProfile } = useAuthContext();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  return (
    <Main>
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          {/* Profile Image and Story */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md overflow-hidden">
              <img src={userProfile?.image ?? Prouser} alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-center gap-4 flex-wrap">
              <h2 className="text-xl font-semibold text-white">{userProfile?.user_name ?? ""}</h2>
              <Button variant="outline" size="sm" onClick={() => navigate(`/account/edit-profile/${userProfile?.user_name}/${userProfile?._id}`)}>
                Edit profile
              </Button>

              <FaCog className="text-xl cursor-pointer" onClick={() => setShow(true)} />
            </div>
            {/* Posts, Followers, Following */}
            <div className="flex gap-6 mt-4 text-sm md:text-base">
              <div>
                <strong>8</strong> posts
              </div>
              <div>
                <strong>0</strong> Connected
              </div>
              <div>
                <strong>2</strong> Connections
              </div>
            </div>
            <div className="mt-3">
              <h3 className="font-bold text-lg text-white">{userProfile?.name ?? ""}</h3>
              <p className="text-sm text-gray-600 text-white-600">Writer</p>
              <p className="text-sm mt-1">{userProfile?.bio}</p>
            </div>
          </div>
        </div>

        {/* Tabs (Posts, Reels, etc.) */}
        <div className="border-t mt-6 pt-4 flex justify-around text-sm font-medium text-gray-600">
          <span className="cursor-pointer">POSTS</span>
          <span className="cursor-pointer">REELS</span>
          <span className="cursor-pointer">SAVED</span>
          <span className="cursor-pointer">TAGGED</span>
        </div>

        {/* Posts Placeholder */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {Array(6)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="bg-black aspect-square flex items-center justify-center text-white text-xl">
                🎬
              </div>
            ))}
        </div>
      </div>
      {show && <ProfileActionModal show={show} hide={() => setShow(false)} />}
    </Main>
  );
};

export default Profile;
