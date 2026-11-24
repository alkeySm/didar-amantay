"use client";

import React, { useState } from "react";
import { Quote as QuoteIcon, Sparkles } from "lucide-react";
import { LangCode, QuoteItem } from "@/lib/types";
import { UIStrings, localizeRecord } from "@/lib/i18n";

interface QuotesMetaphorsSectionProps {
  quotes: QuoteItem[];
  lang: LangCode;
  ui: UIStrings;
}

export default function QuotesMetaphorsSection({
  quotes,
  lang,
  ui,
}: QuotesMetaphorsSectionProps) {
  const [activeTab, setActiveTab] = useState<"oi" | "metafora">("oi");

  const visibleQuotes = quotes.filter((q) => q.category === activeTab);

  return (
    <section id="quotes" className="py-16 sm:py-20 bg-sand/60 border-y border-borderWarm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-bronze">
              <Sparkles className="w-3.5 h-3.5" />
              {ui.navNew}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink mt-1">
              {ui.quotesHeading}
            </h2>
            <p className="text-muted text-sm sm:text-base mt-2 max-w-2xl">
              {ui.quotesSub}
            </p>
          </div>

          <div className="inline-flex rounded-full bg-ivory border border-borderWarm p-1 shadow-sm self-start">
            <button
              type="button"
              onClick={() => setActiveTab("oi")}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === "oi"
                  ? "bg-midnight text-parchment"
                  : "text-muted hover:text-ink"
              }`}
            >
              {ui.tabThoughts}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("metafora")}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === "metafora"
                  ? "bg-bronze text-white"
                  : "text-muted hover:text-ink"
              }`}
            >
              {ui.tabMetaphors}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleQuotes.map((q) => (
            <blockquote
              key={q.id}
              className="rounded-3xl bg-ivory border border-borderWarm p-6 sm:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden"
            >
              <QuoteIcon className="w-8 h-8 text-bronze/25 mb-3" />
              <p className="font-serif text-lg sm:text-xl leading-relaxed text-ink italic">
                «{localizeRecord(q, "text", lang)}»
              </p>
              <footer className="mt-5 pt-4 border-t border-borderWarm/70 flex items-center justify-between text-xs">
                <span className="font-semibold text-bronze">{q.source_kk || "Дидар Амантай"}</span>
                <span className="uppercase tracking-wider text-muted text-[10px]">
                  {q.category === "oi" ? ui.tabThoughts : ui.tabMetaphors}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
