"use client";

import React from "react";

interface BookCoverProps {
  title: string;
  subtitle?: string;
  year: number;
  publisher?: string;
  coverUrl?: string | null;
  coverColor?: string;
  isNew?: boolean;
  newLabel?: string;
  className?: string;
}

export default function BookCover({
  title,
  subtitle,
  year,
  publisher,
  coverUrl,
  coverColor = "#1D352E",
  isNew = false,
  newLabel = "Жаңа",
  className = "",
}: BookCoverProps) {
  if (coverUrl) {
    return (
      <div
        className={`relative aspect-[3/4] rounded-xl overflow-hidden shadow-md border border-borderWarm bg-sand ${className}`}
      >
        <img
          src={coverUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        {isNew && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-bronze text-white text-[10px] font-bold uppercase tracking-wider shadow">
            {newLabel}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      style={{ backgroundColor: coverColor || "#1D352E" }}
      className={`relative aspect-[3/4] rounded-r-xl rounded-l-sm overflow-hidden shadow-lg flex flex-col justify-between p-5 text-parchment select-none ${className}`}
    >
      {/* Book spine shading */}
      <div className="absolute inset-y-0 left-0 w-3.5 bg-gradient-to-r from-black/45 via-black/15 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 left-3.5 w-[1px] bg-white/15 pointer-events-none" />

      {/* Inner gold frame */}
      <div className="absolute inset-3 border border-[#D4B483]/45 rounded-sm pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between pl-2">
        <span className="text-[10px] tracking-[0.22em] uppercase text-[#E2C99E] font-medium">
          ДИДАР АМАНТАЙ
        </span>
        {isNew && (
          <span className="px-2 py-0.5 rounded-full bg-[#C89B62] text-midnight text-[9px] font-bold uppercase tracking-wider">
            {newLabel}
          </span>
        )}
      </div>

      <div className="relative z-10 pl-2 my-auto py-4">
        <div className="w-8 h-[1px] bg-[#D4B483]/70 mb-3" />
        <h4 className="font-serif font-bold text-lg sm:text-xl leading-snug text-[#FAF7F2] line-clamp-4">
          {title}
        </h4>
        {subtitle && (
          <p className="text-[11px] text-[#E2C99E]/85 mt-2 line-clamp-2 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      <div className="relative z-10 pl-2 flex items-end justify-between text-[10px] text-[#D4B483]/90">
        <span className="truncate max-w-[70%]">{publisher || "Қазақ әдебиеті"}</span>
        <span className="font-serif font-semibold text-xs">{year}</span>
      </div>
    </div>
  );
}
