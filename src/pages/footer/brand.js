import React from "react";
import { Helmet } from "react-helmet-async";
import PublicLayout from "../../components/layout/publicLayout";

const Brand = () => {
  const colors = [
    { name: "Primary Indigo", hex: "#4F46E5", class: "bg-indigo-600" },
    { name: "Dark Charcoal", hex: "#1F2937", class: "bg-gray-800" },
    { name: "Medium Gray", hex: "#6B7280", class: "bg-gray-500" },
    { name: "Light Gray", hex: "#F3F4F6", class: "bg-gray-100" },
    { name: "Pure White", hex: "#FFFFFF", class: "bg-white border" },
  ];

  return (
    <>
      <Helmet>
        <title>Brand Assets - Black Diary</title>
        <meta name="description" content="Find our official brand assets, including logos, color palettes, and typography guidelines for Black Diary." />
      </Helmet>

      <PublicLayout>
        <div className="bg-white text-gray-800 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Brand Assets</h1>
              <p className="text-lg text-gray-600">Guidelines for using Black Diary's brand and assets.</p>
            </div>

            {/* Main Content Sections */}
            <div className="space-y-12">
              {/* Logo Section */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-l-4 border-indigo-600 pl-4">Our Logo</h2>
                <div className="p-8 bg-gray-50 rounded-lg flex flex-col md:flex-row items-center justify-center gap-8">
                  <div className="w-32 h-32 bg-gray-900 text-white flex items-center justify-center rounded-full text-4xl font-serif">BD</div>
                  <div>
                    <p className="text-gray-700 leading-relaxed max-w-md">
                      This is our primary logo. Please don't alter, rotate, or add effects to it. Use the version that provides the most contrast with the background.
                    </p>
                  </div>
                </div>
              </section>

              {/* Color Palette Section */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-l-4 border-indigo-600 pl-4">Color Palette</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
                  {colors.map((color) => (
                    <div key={color.name}>
                      <div className={`h-24 w-full rounded-lg shadow-inner ${color.class}`}></div>
                      <p className="font-semibold mt-2 text-sm text-gray-800">{color.name}</p>
                      <p className="text-xs text-gray-500">{color.hex}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Typography Section */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-l-4 border-indigo-600 pl-4">Typography</h2>
                <div className="bg-gray-50 p-8 rounded-lg space-y-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Headings</p>
                    <h1 className="text-4xl font-bold">Inter Bold</h1>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Body Text</p>
                    <p className="text-base leading-relaxed">Inter Regular - The quick brown fox jumps over the lazy dog.</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default Brand;
