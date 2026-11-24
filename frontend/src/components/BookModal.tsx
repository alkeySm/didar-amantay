"use client";

import React from "react";
import { X, BookOpen, FileText, Globe, Calendar, Building2 } from "lucide-react";
import { BookItem, LangCode } from "@/lib/types";
import { UIStrings, getLanguageMeta, localizeRecord } from "@/lib/i18n";
import BookCover from "./BookCover";

interface BookModalProps {
  book: BookItem | null;
  lang: LangCode;
  ui: UIStrings;
  onClose: () => void;
}

export default function BookModal({ book, lang, ui, onClose }: BookModalProps) {
  if (!book) return null;

  const title = localizeRecord(book, "title", lang);
  const description = localizeRecord(book, "description", lang);
  const excerpt = localizeRecord(book, "excerpt", lang) || book.excerpt_kk;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/75 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-parchment border border-borderWarm shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-ivory border border-borderWarm text-muted hover:text-ink transition-colors"
          aria-label={ui.closeBtn}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-4 max-w-[220px] mx-auto w-full">
            <BookCover
              title={title}
              subtitle={book.subtitle_kk}
              year={book.year}
              publisher={book.publisher}
              coverUrl={book.cover_url}
              coverColor={book.cover_color}
              isNew={book.is_new}
              newLabel={ui.newReleaseBadge}
            />
          </div>

          <div className="md:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {book.is_featured && (
                <span className="px-2.5 py-0.5 rounded-full bg-bronze/15 text-bronze text-xs font-semibold">
                  {ui.featuredLabel}
                </span>
              )}
              {book.is_new && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-700/10 text-emerald-800 text-xs font-semibold">
                  {ui.newReleaseBadge}
                </span>
              )}
              <span className="text-xs text-muted flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {book.year}
              </span>
              {book.pages && (
                <span className="text-xs text-muted">
                  • {book.pages} {ui.pagesUnit}
                </span>
              )}
            </div>

            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
                {title}
              </h3>
              {book.subtitle_kk && (
                <p className="text-sm text-bronze font-medium mt-1">
                  {book.subtitle_kk}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
              {book.publisher && (
                <span className="inline-flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-bronze" />
                  {book.publisher}
                </span>
              )}
              {book.isbn && <span>ISBN: {book.isbn}</span>}
            </div>

            <p className="text-sm sm:text-base text-ink/90 leading-relaxed">
              {description}
            </p>

            <div>
              <div className="text-xs font-semibold text-muted mb-2 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-bronze" />
                {ui.translatedInto}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(book.available_languages || ["kk"]).map((code) => {
                  const meta = getLanguageMeta(code as LangCode);
                  return (
                    <span
                      key={code}
                      className="px-2.5 py-1 rounded-full bg-ivory border border-borderWarm text-xs font-medium text-ink"
                    >
                      {meta.kazakhName}
                    </span>
                  );
                })}
              </div>
            </div>

            {book.pdf_url && (
              <div className="pt-1">
                <a
                  href={book.pdf_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-midnight text-parchment text-sm font-medium hover:bg-bronze transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  {ui.openPdfBtn}
                </a>
              </div>
            )}
          </div>
        </div>

        {excerpt && (
          <div className="mt-8 pt-6 border-t border-borderWarm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-bronze mb-3">
              <BookOpen className="w-4 h-4" />
              {ui.readExcerptBtn}
            </div>
            <blockquote className="rounded-2xl bg-ivory border border-borderWarm p-5 sm:p-6 font-serif text-base sm:text-lg leading-relaxed text-ink whitespace-pre-line">
              {excerpt}
            </blockquote>
          </div>
        )}
      </div>
    </div>
  );
}
