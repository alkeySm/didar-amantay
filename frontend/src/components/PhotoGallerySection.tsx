"use client";

import React, { useState } from "react";
import { Camera, X } from "lucide-react";
import { GalleryEntry, LangCode } from "@/lib/types";
import { UIStrings, localizeRecord } from "@/lib/i18n";

interface PhotoGallerySectionProps {
  gallery: GalleryEntry[];
  lang: LangCode;
  ui: UIStrings;
}

export default function PhotoGallerySection({
  gallery,
  lang,
  ui,
}: PhotoGallerySectionProps) {
  const [selected, setSelected] = useState<GalleryEntry | null>(null);

  return (
    <section id="gallery" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-bronze">
          <Camera className="w-3.5 h-3.5" />
          ARCHIVE
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink mt-1">
          {ui.galleryHeading}
        </h2>
        <p className="text-muted text-sm sm:text-base mt-2 max-w-2xl">
          {ui.gallerySub}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {gallery.map((item) => (
          <figure
            key={item.id}
            onClick={() => setSelected(item)}
            className="group cursor-pointer rounded-2xl overflow-hidden bg-ivory border border-borderWarm shadow-sm hover:border-bronze transition-all"
          >
            <div className="aspect-[4/3] overflow-hidden bg-sand">
              <img
                src={item.image_url}
                alt={localizeRecord(item, "caption", lang)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <figcaption className="p-4">
              {item.year && (
                <span className="text-[11px] font-bold text-bronze uppercase tracking-wider">
                  {item.year}
                </span>
              )}
              <p className="text-xs sm:text-sm text-ink font-medium mt-1 line-clamp-2 leading-relaxed">
                {localizeRecord(item, "caption", lang)}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/85 backdrop-blur-sm p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-3xl w-full rounded-3xl overflow-hidden bg-ivory border border-borderWarm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-midnight/80 text-white hover:bg-bronze"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selected.image_url}
              alt={localizeRecord(selected, "caption", lang)}
              className="w-full max-h-[70vh] object-contain bg-midnight"
            />
            <div className="p-5 sm:p-6">
              {selected.year && (
                <div className="text-xs font-bold text-bronze mb-1">{selected.year}</div>
              )}
              <p className="font-serif text-base sm:text-lg text-ink">
                {localizeRecord(selected, "caption", lang)}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
