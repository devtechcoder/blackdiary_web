import React from "react";
import { m } from "framer-motion";
import AppImage from "../../components/AppImage";
import Prouser from "../../assets/images/user.png";

const TeamCard = ({ member, index = 0 }) => {
  return (
    <m.article
      initial={{ opacity: 0, y: 18, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-[26px] border border-[rgba(212,175,55,0.18)] bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-4 text-center shadow-[0_18px_60px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:p-5"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.14),transparent_45%)] opacity-60" />
      <div className="pointer-events-none absolute -left-10 top-0 h-28 w-28 rounded-full bg-[rgba(212,175,55,0.08)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 right-[-18px] h-32 w-32 rounded-full bg-[rgba(212,175,55,0.08)] blur-3xl" />

      <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-[rgba(212,175,55,0.5)] bg-[rgba(212,175,55,0.08)] p-1 shadow-[0_0_28px_rgba(212,175,55,0.24)] sm:h-28 sm:w-28">
        <AppImage
          src={member?.image || Prouser}
          alt={member?.name || "Team member"}
          width={112}
          height={112}
          className="h-20 w-20 rounded-full object-cover ring-1 ring-[rgba(212,175,55,0.35)] sm:h-24 sm:w-24"
        />
      </div>

      <div className="relative mt-4 sm:mt-5">
        <h3 className="poetic-heading text-xl font-semibold text-[#F7E4AE] sm:text-[1.5rem]">{member?.name || ""}</h3>
        <p className="mt-1 text-xs font-medium text-[#C8A84F] sm:text-sm">{member?.designation || ""}</p>
      </div>

      <div
        className="relative mt-2 text-xs leading-5 text-[#B9B9B9] sm:mt-3 sm:text-sm sm:leading-6"
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 3,
          overflow: "hidden",
        }}
        dangerouslySetInnerHTML={{ __html: member?.description || "" }}
      />
    </m.article>
  );
};

export default TeamCard;
