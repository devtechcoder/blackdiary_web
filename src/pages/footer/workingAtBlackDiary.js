import React from "react";
import { Helmet } from "react-helmet-async";
import PublicLayout from "../../components/layout/publicLayout";
import { Link } from "react-router-dom";

const values = [
  {
    title: "Empower Expression",
    description: "We build tools that give a voice to creators and help them share their stories with the world.",
  },
  {
    title: "Foster Community",
    description: "We believe in the power of connection and strive to create a welcoming space for all.",
  },
  {
    title: "Innovate with Purpose",
    description: "We merge technology and art to create meaningful experiences for our users.",
  },
  {
    title: "Embrace Diversity",
    description: "We celebrate unique perspectives and believe they make our platform and community stronger.",
  },
];

const openPositions = [
  {
    title: "Senior Frontend Engineer",
    location: "Remote",
    department: "Engineering",
  },
  {
    title: "Content Curator (Poetry & Shayari)",
    location: "Remote",
    department: "Content",
  },
  {
    title: "Community Manager",
    location: "Remote",
    department: "Marketing",
  },
];

const WorkingAtBlackDiary = () => {
  return (
    <>
      <Helmet>
        <title>Work at Black Diary - Careers</title>
        <meta name="description" content="Join our passionate team at Black Diary and help us build the future of digital poetry and expression. Explore our culture, values, and open positions." />
      </Helmet>

      <PublicLayout>
        <div className="bg-white text-gray-800 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Shape the Future of Expression</h1>
              <p className="text-lg text-gray-600">Join us at Black Diary and be part of a team that's passionate about words, technology, and community.</p>
            </div>

            {/* Our Values Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Our Core Values</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {values.map((value, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-indigo-600 mb-2">{value.title}</h3>
                    <p className="text-gray-700">{value.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Open Positions Section */}
            <section>
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Open Positions</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg">
                <div className="divide-y divide-gray-200">
                  {openPositions.map((position, index) => (
                    <div key={index} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-gray-100">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{position.title}</h3>
                        <p className="text-gray-600 mt-1">
                          {position.department} &middot; {position.location}
                        </p>
                      </div>
                      <Link to="#" className="mt-4 sm:mt-0 inline-block bg-indigo-600 text-white font-semibold px-5 py-2 rounded-full hover:bg-indigo-700 transition-colors duration-300 text-sm">
                        Apply Now
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default WorkingAtBlackDiary;
