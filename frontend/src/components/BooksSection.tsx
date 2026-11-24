"use client";

import React, { useMemo, useState } from "react";
import { BookOpen, Sparkles, Globe, FileText } from "lucide-react";
import { BookItem, LangCode } from "@/lib/types";
import { LANGUAGES, UIStrings, localizeRecord } from "@/lib/i18n";
import BookCover from "./BookCover";
import BookModal from "./BookModal";

interface BooksSectionProps {
  books: BookItem[];
  lang: LangCode;
  ui: UIStrings;
}

export default function BooksSection({ books, lang, ui }: BooksSectionProps) {
  const [filterMode, setFilterMode] = useState<"all" | "new">("all");
  const [filterLang, setFilterLang] = useState<string>("all");
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);

  const featuredBook = useMemo(
    () => books.find((b) => b.is_featured) || books[0] || null,
    [books]
  );

  const filteredBooks = useMemo(() => {
    return books.filter((b) => {
      if (filterMode === "new" && !b.is_new) return false;
      if (filterLang !== "all" && !(b.available_languages || []).includes(filterLang)) {
        return false;
      }
      return true;
    });
  }, [books, filterMode, filterLang]);

  return (
    <section id="books" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-bronze">
            {ui.statBooks} • {books.length}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink mt-1">
            {ui.booksHeading}
          </h2>
          <p className="text-muted text-sm sm:text-base mt-2 max-w-2xl">
            {ui.booksSub}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setFilterMode("all")}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
              filterMode === "all"
                ? "bg-midnight text-parchment"
                : "bg-ivory border border-borderWarm text-ink hover:border-bronze"
            }`}
          >
            {ui.filterAll}
          </button>
          <button
            type="button"
            onClick={() => setFilterMode("new")}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
              filterMode === "new"
                ? "bg-bronze text-white"
                : "bg-ivory border border-borderWarm text-ink hover:border-bronze"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {ui.filterNew}
          </button>
          <div className="relative flex items-center">
            <Globe className="w-3.5 h-3.5 text-bronze absolute left-3 pointer-events-none" />
            <select
              value={filterLang}
              onChange={(e) => setFilterLang(e.target.value)}
              className="pl-8 pr-4 py-2 rounded-full bg-ivory border border-borderWarm text-xs sm:text-sm text-ink focus:outline-none focus:border-bronze"
              aria-label={ui.filterLangAll}
            >
              <option value="all">{ui.filterLangAll}</option>
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.kazakhName} ({l.nativeName})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Featured Book Spotlight */}
      {featuredBook && filterMode === "all" && filterLang === "all" && (
        <div className="mb-12 rounded-3xl bg-ivory border border-borderWarm shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 items-center">
            <div className="lg:col-span-4 max-w-[260px] mx-auto w-full">
              <BookCover
                title={localizeRecord(featuredBook, "title", lang)}
                subtitle={featuredBook.subtitle_kk}
                year={featuredBook.year}
                publisher={featuredBook.publisher}
                coverUrl={featuredBook.cover_url}
                coverColor={featuredBook.cover_color}
                isNew={featuredBook.is_new}
                newLabel={ui.newReleaseBadge}
              />
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bronze/10 text-bronze text-xs font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                {ui.featuredLabel} • {featuredBook.year}
              </div>

              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-ink">
                {localizeRecord(featuredBook, "title", lang)}
              </h3>
              {featuredBook.subtitle_kk && (
                <p className="text-sm sm:text-base font-medium text-bronze">
                  {featuredBook.subtitle_kk}
                </p>
              )}

              <p className="text-muted text-sm sm:text-base leading-relaxed">
                {localizeRecord(featuredBook, "description", lang)}
              </p>

              {featuredBook.excerpt_kk && (
                <blockquote className="border-l-2 border-bronze pl-4 py-1 font-serif italic text-sm sm:text-base text-ink/80 line-clamp-3">
                  {featuredBook.excerpt_kk}
                </blockquote>
              )}

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedBook(featuredBook)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-midnight text-parchment text-sm font-medium hover:bg-bronze transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  {ui.readExcerptBtn}
                </button>
                {featuredBook.pdf_url && (
                  <a
                    href={featuredBook.pdf_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-borderWarm bg-parchment text-ink text-sm font-medium hover:border-bronze transition-colors"
                  >
                    <FileText className="w-4 h-4 text-bronze" />
                    {ui.openPdfBtn}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book) => {
          const title = localizeRecord(book, "title", lang);
          const desc = localizeRecord(book, "description", lang);
          return (
            <article
              key={book.id}
              data-testid={`book-card-${book.id}`}
              className="group rounded-2xl bg-ivory border border-borderWarm p-5 flex flex-col justify-between hover:shadow-md hover:border-bronze/60 transition-all"
            >
              <div>
                <div
                  className="cursor-pointer mb-4"
                  onClick={() => setSelectedBook(book)}
                >
                  <BookCover
                    title={title}
                    subtitle={book.subtitle_kk}
                    year={book.year}
                    publisher={book.publisher}
                    coverUrl={book.cover_url}
                    coverColor={book.cover_color}
                    isNew={book.is_new}
                    newLabel={ui.newReleaseBadge}
                    className="group-hover:-translate-y-1 transition-transform duration-300"
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-muted mb-1">
                  <span>{book.year}</span>
                  <span>{(book.available_languages || []).length} {ui.langLabel.toLowerCase()}</span>
                </div>

                <h3
                  onClick={() => setSelectedBook(book)}
                  className="font-serif font-bold text-lg text-ink group-hover:text-bronze transition-colors cursor-pointer line-clamp-2"
                >
                  {title}
                </h3>

                <p className="text-xs text-muted mt-1.5 line-clamp-3 leading-relaxed">
                  {desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-borderWarm/70 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedBook(book)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-bronze hover:text-bronzeDark"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  {ui.readExcerptBtn}
                </button>
                <div className="flex items-center gap-1">
                  {(book.available_languages || []).slice(0, 3).map((code) => (
                    <span
                      key={code}
                      className="px-1.5 py-0.5 rounded bg-sand text-[10px] font-medium uppercase text-muted"
                    >
                      {code}
                    </span>
                  ))}
                  {(book.available_languages || []).length > 3 && (
                    <span className="text-[10px] text-muted">
                      +{(book.available_languages || []).length - 3}
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <BookModal
        book={selectedBook}
        lang={lang}
        ui={ui}
        onClose={() => setSelectedBook(null)}
      />
    </section>
  );
}
