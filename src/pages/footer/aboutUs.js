import React from "react";
import { Helmet } from "react-helmet-async";
import PublicLayout from "../../components/layout/publicLayout";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Black Diary</title>
        <meta name="description" content="Learn about the story, mission, and vision of Black Diary. A platform dedicated to poets, writers, and lovers of words." />
      </Helmet>

      <PublicLayout>
        <div className="bg-white text-gray-800 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">About Black Diary</h1>
              <p className="text-lg text-gray-600">A sanctuary for words, emotions, and the stories that connect us all.</p>
            </div>

            {/* Main Content Sections */}
            <div className="space-y-10">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-indigo-600 pl-4">Our Story</h2>
                <p className="text-gray-700 leading-relaxed">
                  Black Diary was born from a simple yet profound love for the written word. In a world bustling with noise, we yearned for a quiet corner on the internet dedicated to poetry, shayari,
                  and the raw, unfiltered expression of human emotion. We envisioned a platform where both seasoned poets and budding writers could share their craft, find inspiration, and connect
                  with a community that understands the power of language.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-indigo-600 pl-4">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed">
                  Our mission is to empower expression by providing a beautiful, intuitive, and supportive platform for writers and readers. We strive to be a digital haven where creativity
                  flourishes, diverse voices are celebrated, and the art of poetry is preserved and cherished for generations to come.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-indigo-600 pl-4">Join Our Community</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Whether you're here to read, to write, or simply to feel, we welcome you. Black Diary is more than a website; it's a community of kindred spirits. Share your first poem, discover a
                  new favorite shayar, or lose yourself in a sea of emotions. Your voice has a home here.
                </p>
                <Link to="/" className="inline-block bg-indigo-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors duration-300">
                  Start Writing Today
                </Link>
              </section>
            </div>
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default AboutUs;
