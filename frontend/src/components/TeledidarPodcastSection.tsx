"use client";

import React from "react";
import { Mic, Play, ExternalLink, Clock } from "lucide-react";
import { LangCode, PodcastItem } from "@/lib/types";
import { UIStrings, localizeRecord } from "@/lib/i18n";

interface TeledidarPodcastSectionProps {
  podcasts: PodcastItem[];
  lang: LangCode;
  ui: UIStrings;
}

export default function TeledidarPodcastSection({
  podcasts,
  lang,
  ui,
}: TeledidarPodcastSectionProps) {
  return (
    <section id="podcast" className="py-16 sm:py-20 bg-midnight text-parchment">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bronze/20 border border-bronze/40 text-[#E2C99E] text-xs font-bold tracking-widest uppercase">
              <Mic className="w-3.5 h-3.5" />
              TELEDIDAR.KZ • ПОДКАСТ
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-3">
              {ui.podcastHeading}
            </h2>
            <p className="text-parchment/75 text-sm sm:text-base mt-2 max-w-2xl">
              {ui.podcastSub}
            </p>
          </div>

          <a
            href="https://teledidar.kz"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-bronze hover:bg-bronzeDark text-white text-sm font-semibold transition-colors self-start"
          >
            <span>{ui.podcastCta}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {podcasts.map((ep) => (
            <div
              key={ep.id}
              className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:border-bronze/60 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#D4B483] mb-3">
                  <span className="font-bold tracking-wider uppercase">
                    Эпизод #{ep.episode_number} • {ep.published_date}
                  </span>
                  <span className="inline-flex items-center gap-1 text-parchment/70">
                    <Clock className="w-3.5 h-3.5" />
                    {ep.duration}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-white leading-snug">
                  {localizeRecord(ep, "title", lang)}
                </h3>

                <p className="text-sm text-parchment/75 mt-2 leading-relaxed">
                  {ep.description_kk}
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-white/10 flex items-center justify-between">
                <a
                  href={ep.video_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#E2C99E] hover:text-white transition-colors"
                >
                  <span className="w-8 h-8 rounded-full bg-bronze/25 flex items-center justify-center">
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </span>
                  {ui.podcastWatch}
                </a>
                <span className="text-[11px] text-parchment/50">teledidar.kz</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
