"use client";

import React, { useEffect, useState } from "react";
import { BookOpen, Mic, Languages, Layers, Award, ArrowRight } from "lucide-react";
import { LangCode, ReviewItem, SiteOverview } from "@/lib/types";
import { LANGUAGES, getLanguageMeta, getUIStrings } from "@/lib/i18n";
import { api } from "@/lib/api";
import Navbar from "./Navbar";
import BiographySection from "./BiographySection";
import BooksSection from "./BooksSection";
import WorksGenresSection from "./WorksGenresSection";
import QuotesMetaphorsSection from "./QuotesMetaphorsSection";
import PhotoGallerySection from "./PhotoGallerySection";
import TeledidarPodcastSection from "./TeledidarPodcastSection";
import ReaderReviewsSection from "./ReaderReviewsSection";
import Footer from "./Footer";

const LANG_STORAGE_KEY = "didar_lang";

interface HomePortalProps {
  initialData: SiteOverview | null;
}

export default function HomePortal({ initialData }: HomePortalProps) {
  const [data, setData] = useState<SiteOverview | null>(initialData);
  const [lang, setLang] = useState<LangCode>("kk");
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.localStorage?.getItem === "function") {
      const saved = window.localStorage.getItem(LANG_STORAGE_KEY) as LangCode | null;
      if (saved && LANGUAGES.some((l) => l.code === saved)) {
        setLang(saved);
      }
    }
    // Always fetch fresh overview on mount so admin edits show immediately on navigation back
    api
      .getOverview()
      .then((fresh) => {
        setData(fresh);
        setLoading(false);
      })
      .catch((err) => {
        if (!initialData) setError(err?.message || "Деректерді жүктеу мүмкін болмады");
        setLoading(false);
      });
  }, [initialData]);

  const handleChangeLang = (newLang: LangCode) => {
    setLang(newLang);
    if (typeof window !== "undefined" && typeof window.localStorage?.setItem === "function") {
      window.localStorage.setItem(LANG_STORAGE_KEY, newLang);
    }
  };

  const handleReviewAdded = (review: ReviewItem) => {
    setData((prev) =>
      prev ? { ...prev, reviews: [review, ...prev.reviews] } : prev
    );
  };

  const ui = getUIStrings(lang);
  const langMeta = getLanguageMeta(lang);

  return (
    <div dir={langMeta.rtl ? "rtl" : "ltr"} className="min-h-screen flex flex-col">
      <Navbar lang={lang} onChangeLang={handleChangeLang} ui={ui} />

      <main id="top" className="flex-1">
        {/* Hero Editorial Section */}
        <section className="relative overflow-hidden border-b border-borderWarm bg-gradient-to-b from-parchment via-parchment to-sand/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ivory border border-borderWarm text-[11px] font-bold tracking-[0.16em] text-bronze uppercase shadow-sm">
                  {ui.heroBadge}
                </div>

                <div>
                  <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-[1.1]">
                    {ui.heroTitle}
                  </h1>
                  <p className="font-serif italic text-lg sm:text-2xl text-bronze mt-3">
                    {ui.heroRole}
                  </p>
                </div>

                <p className="text-muted text-base sm:text-lg leading-relaxed max-w-2xl">
                  {ui.heroDesc}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href="#books"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-midnight hover:bg-bronze text-parchment text-sm font-semibold transition-colors shadow-sm"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>{ui.heroPrimaryBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#podcast"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ivory border border-borderWarm hover:border-bronze text-ink text-sm font-semibold transition-colors shadow-sm"
                  >
                    <Mic className="w-4 h-4 text-bronze" />
                    <span>{ui.heroSecondaryBtn}</span>
                  </a>
                </div>

                {/* Translation Languages Strip */}
                <div className="pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {LANGUAGES.map((item) => (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => handleChangeLang(item.code)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                          item.code === lang
                            ? "bg-bronze text-white"
                            : "bg-ivory/80 border border-borderWarm text-muted hover:text-ink hover:border-bronze"
                        }`}
                      >
                        {item.kazakhName}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hero Author Visual Card */}
              <div className="lg:col-span-5">
                <div className="relative max-w-sm mx-auto">
                  <div className="absolute -inset-3 rounded-[2rem] border border-bronze/30 rotate-2 pointer-events-none" />
                  <div className="relative rounded-3xl overflow-hidden bg-ivory border border-borderWarm shadow-xl">
                    <img
                      src="/images/didar-amantay.jpg"
                      alt="Дидар Амантай"
                      className="w-full h-[380px] object-cover object-top"
                    />
                    <div className="p-5 bg-midnight text-parchment">
                      <blockquote className="font-serif italic text-sm text-[#E2C99E] leading-relaxed">
                        «Философия – әдебиеттен, әдебиет – философиядан басталады.»
                      </blockquote>
                      <div className="text-[11px] uppercase tracking-wider text-parchment/60 mt-2">
                        — Дидар Амантай • didaramantay.kz
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Metrics Strip */}
            <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-2xl bg-ivory border border-borderWarm p-4 sm:p-5 flex items-center gap-3.5 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-bronze/10 text-bronze flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-serif text-2xl font-bold text-ink">
                    {data?.stats.books_count ?? 7}+
                  </div>
                  <div className="text-xs text-muted">{ui.statBooks}</div>
                </div>
              </div>

              <div className="rounded-2xl bg-ivory border border-borderWarm p-4 sm:p-5 flex items-center gap-3.5 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-bronze/10 text-bronze flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-serif text-2xl font-bold text-ink">11</div>
                  <div className="text-xs text-muted">{ui.statGenres}</div>
                </div>
              </div>

              <div className="rounded-2xl bg-ivory border border-borderWarm p-4 sm:p-5 flex items-center gap-3.5 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-bronze/10 text-bronze flex items-center justify-center shrink-0">
                  <Languages className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-serif text-2xl font-bold text-ink">14</div>
                  <div className="text-xs text-muted">{ui.statLanguages}</div>
                </div>
              </div>

              <div className="rounded-2xl bg-ivory border border-borderWarm p-4 sm:p-5 flex items-center gap-3.5 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-bronze/10 text-bronze flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-serif text-base sm:text-lg font-bold text-ink leading-tight">
                    1999 / 2007
                  </div>
                  <div className="text-xs text-muted">{ui.statAwards}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="kazakh-border-pattern w-full" />
        </section>

        {loading && !data && (
          <div className="py-24 text-center text-muted text-sm">
            Деректер жүктелуде...
          </div>
        )}

        {error && !data && (
          <div className="py-24 text-center text-red-700 text-sm">
            {error}
          </div>
        )}

        {data && (
          <>
            <BooksSection books={data.books} lang={lang} ui={ui} />
            <BiographySection ui={ui} />
            <WorksGenresSection works={data.works} lang={lang} ui={ui} />
            <QuotesMetaphorsSection quotes={data.quotes} lang={lang} ui={ui} />
            <PhotoGallerySection gallery={data.gallery} lang={lang} ui={ui} />
            <TeledidarPodcastSection podcasts={data.podcasts} lang={lang} ui={ui} />
            <ReaderReviewsSection
              reviews={data.reviews}
              books={data.books}
              lang={lang}
              ui={ui}
              onReviewAdded={handleReviewAdded}
            />
          </>
        )}
      </main>

      <Footer ui={ui} />
    </div>
  );
}
