import React from "react";
import leaderShipImage from "../../assets/images/dummy/leadership.jpeg";
import aadiImage from "../../assets/images/dummy/photo_6080378836265667813_x.jpg";
import { Helmet } from "react-helmet-async";
import PublicLayout from "../../components/layout/publicLayout";

const leaders = [
  {
    name: "Shivraj Jajra",
    title: "Founder & CEO",
    imageUrl: leaderShipImage,
    bio: "Shivraj is the visionary behind Black Diary, driving the company's mission to provide a unique platform for poets and writers.",
  },
  {
    name: "Jyotiraditya  Choudhary",
    title: "Chief Technology Officer",
    imageUrl: aadiImage,
    bio: "Jyotiraditya leads our technology team, ensuring our platform is robust, scalable, and secure for all our users.",
  },
  {
    name: "Zaheer Khan",
    title: "Head of Content",
    imageUrl: leaderShipImage,
    bio: "Zaheer curates the beautiful poetry and content you see on Black Diary, working with poets from around the world.",
  },
  {
    name: "Priya Patel",
    title: "Lead UX/UI Designer",
    imageUrl: leaderShipImage,
    bio: "Priya is the creative mind behind our user-friendly and elegant design, making your experience seamless.",
  },
  {
    name: "Chen Wang",
    title: "Head of Marketing",
    imageUrl: leaderShipImage,
    bio: "Chen spreads the word about Black Diary, connecting with our community and growing our audience.",
  },
  {
    name: "Fatima Al-Sayed",
    title: "Community Manager",
    imageUrl: leaderShipImage,
    bio: "Fatima engages with our vibrant community, ensuring everyone feels welcome and heard.",
  },
];

const Leadership = () => {
  return (
    <>
      <Helmet>
        <title>Our Leadership - Black Diary</title>
        <meta name="description" content="Meet the team behind Black Diary. Our leaders are passionate about creating a space for creativity and expression." />
      </Helmet>

      {/* MAIN PAGE CONTAINER */}
      <PublicLayout>
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* PAGE HEADER */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900">Our Leadership</h1>
            <p className="text-gray-600 mt-2 text-lg">The passionate team dedicated to bringing poetry to the world.</p>
          </div>

          {/* LEADERS GRID */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {leaders.map((leader, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <img src={leader.imageUrl} alt={leader.name} className="w-36 h-36 object-cover rounded-full shadow-sm mb-6" />

                <h3 className="text-xl font-semibold text-gray-900">{leader.name}</h3>
                <p className="text-indigo-600 font-medium mt-1">{leader.title}</p>

                <p className="text-gray-600 text-sm mt-4 leading-relaxed">{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default Leadership;
