"use client";

import React, { useMemo, useState } from "react";
import { Search, Sparkles, X, BookText, Film, Tv } from "lucide-react";
import { GenreSlug, LangCode, WorkItem } from "@/lib/types";
import { GENRE_ORDER, UIStrings, localizeRecord } from "@/lib/i18n";

interface WorksGenresSectionProps {
  works: WorkItem[];
  lang: LangCode;
  ui: UIStrings;
}

export default function WorksGenresSection({ works, lang, ui }: WorksGenresSectionProps) {
  const [activeGenre, setActiveGenre] = useState<GenreSlug | "all">("all");
  const [search, setSearch] = useState("");
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

  const genreCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const g of GENRE_ORDER) counts[g] = 0;
    for (const w of works) {
      counts[w.genre] = (counts[w.genre] || 0) + 1;
    }
    return counts;
  }, [works]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return works.filter((w) => {
      if (activeGenre !== "all" && w.genre !== activeGenre) return false;
      if (q) {
        const title = localizeRecord(w, "title", lang).toLowerCase();
        const summary = localizeRecord(w, "summary", lang).toLowerCase();
        if (!title.includes(q) && !summary.includes(q)) return false;
      }
      return true;
    });
  }, [works, activeGenre, search, lang]);

  const getGenreIcon = (g: string) => {
    if (g === "korkem_filmder" || g === "derekti_filmder" || g === "kinoscenariyler") {
      return Film;
    }
    if (g === "telehabarlar") return Tv;
    return BookText;
  };

  return (
    <section id="works" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-bronze">
            {ui.statGenres} • 11
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink mt-1">
            {ui.worksHeading}
          </h2>
          <p className="text-muted text-sm sm:text-base mt-2 max-w-2xl">
            {ui.worksSub}
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Іздеу / Search..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-ivory border border-borderWarm text-sm text-ink placeholder:text-muted/70 focus:outline-none focus:border-bronze"
          />
        </div>
      </div>

      {/* All 11 Genres Tab Pills */}
      <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label={ui.worksHeading}>
        <button
          type="button"
          data-testid="genre-tab-all"
          onClick={() => setActiveGenre("all")}
          className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
            activeGenre === "all"
              ? "bg-midnight text-parchment shadow-sm"
              : "bg-ivory border border-borderWarm text-ink hover:border-bronze"
          }`}
        >
          {ui.filterAll} ({works.length})
        </button>

        {GENRE_ORDER.map((genre) => {
          const active = activeGenre === genre;
          return (
            <button
              key={genre}
              type="button"
              data-testid={`genre-tab-${genre}`}
              onClick={() => setActiveGenre(genre)}
              className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                active
                  ? "bg-bronze text-white shadow-sm"
                  : "bg-ivory border border-borderWarm text-ink hover:border-bronze"
              }`}
            >
              {ui.genres[genre]} ({genreCounts[genre] || 0})
            </button>
          );
        })}
      </div>

      {/* Works Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((work) => {
          const Icon = getGenreIcon(work.genre);
          const genreLabel =
            ui.genres[work.genre as GenreSlug] || work.genre;
          return (
            <article
              key={work.id}
              onClick={() => setSelectedWork(work)}
              className="cursor-pointer rounded-2xl bg-ivory border border-borderWarm p-5 hover:border-bronze hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sand text-ink text-xs font-medium">
                    <Icon className="w-3.5 h-3.5 text-bronze" />
                    {genreLabel}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {work.is_new && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-bronze/15 text-bronze text-[11px] font-semibold">
                        <Sparkles className="w-3 h-3" />
                        {ui.newReleaseBadge}
                      </span>
                    )}
                    {work.year && (
                      <span className="text-xs font-medium text-muted">
                        {work.year}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="font-serif font-bold text-lg text-ink leading-snug">
                  {localizeRecord(work, "title", lang)}
                </h3>

                <p className="text-xs sm:text-sm text-muted mt-2 line-clamp-3 leading-relaxed">
                  {localizeRecord(work, "summary", lang)}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-borderWarm/70 flex items-center justify-between">
                <span className="text-xs font-semibold text-bronze">
                  {ui.readWorkBtn} →
                </span>
                <div className="flex gap-1">
                  {(work.available_languages || ["kk"]).slice(0, 4).map((c) => (
                    <span
                      key={c}
                      className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-parchment border border-borderWarm text-muted"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Work Detail Modal */}
      {selectedWork && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/75 backdrop-blur-sm p-4"
          onClick={() => setSelectedWork(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl bg-parchment border border-borderWarm p-6 sm:p-8 shadow-2xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedWork(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-ivory border border-borderWarm text-muted hover:text-ink"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs font-bold uppercase tracking-wider text-bronze mb-2">
              {ui.genres[selectedWork.genre as GenreSlug] || selectedWork.genre}
              {selectedWork.year ? ` • ${selectedWork.year}` : ""}
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
              {localizeRecord(selectedWork, "title", lang)}
            </h3>
            <p className="text-sm sm:text-base text-muted mt-3 leading-relaxed">
              {localizeRecord(selectedWork, "summary", lang)}
            </p>

            {(localizeRecord(selectedWork, "content", lang) || selectedWork.content_kk) && (
              <div className="mt-5 p-5 rounded-2xl bg-ivory border border-borderWarm font-serif text-base leading-relaxed text-ink whitespace-pre-line">
                {localizeRecord(selectedWork, "content", lang) || selectedWork.content_kk}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
