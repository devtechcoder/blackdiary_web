import React from "react";

const TabsNavigation = ({ activeTab, onChange }) => {
  const tabs = [
    { id: "shayari", label: "Shayari" },
    { id: "post", label: "Posts" },
  ];

  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
  const tabWidth = 100 / tabs.length;

  return (
    <section className="sticky top-0 z-20 rounded-2xl border border-[#2a2a2a] bg-[#0f0f0f]/95 px-2 py-2 backdrop-blur">
      <div className="relative grid grid-cols-2">
        <span
          className="pointer-events-none absolute bottom-0 left-0 h-[2px] rounded-full bg-[#E6B422] transition-transform duration-300 ease-out"
          style={{ width: `${tabWidth}%`, transform: `translateX(${Math.max(activeIndex, 0) * 100}%)` }}
        />
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`relative rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
              activeTab === tab.id ? "text-[#f2d483]" : "text-[#8f8f8f] hover:text-[#d0d0d0]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default TabsNavigation;
