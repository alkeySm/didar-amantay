"use client";

import React, { useState } from "react";
import { MessageSquareQuote, Star, Send, CheckCircle2 } from "lucide-react";
import { BookItem, LangCode, ReviewItem } from "@/lib/types";
import { UIStrings, localizeRecord } from "@/lib/i18n";
import { api } from "@/lib/api";

interface ReaderReviewsSectionProps {
  reviews: ReviewItem[];
  books: BookItem[];
  lang: LangCode;
  ui: UIStrings;
  onReviewAdded: (review: ReviewItem) => void;
}

export default function ReaderReviewsSection({
  reviews,
  books,
  lang,
  ui,
  onReviewAdded,
}: ReaderReviewsSectionProps) {
  const [authorName, setAuthorName] = useState("");
  const [authorRole, setAuthorRole] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (!authorName.trim() || !content.trim()) {
      setError("Аты-жөніңіз бен пікір мәтінін толтырыңыз.");
      return;
    }

    setSubmitting(true);
    try {
      const created = await api.submitReview({
        author_name: authorName.trim(),
        author_role: authorRole.trim() || "Оқырман",
        book_title: bookTitle.trim() || undefined,
        rating,
        content: content.trim(),
      });
      onReviewAdded(created);
      setAuthorName("");
      setAuthorRole("");
      setBookTitle("");
      setRating(5);
      setContent("");
      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || "Қате орын алды");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-bronze">
          <MessageSquareQuote className="w-3.5 h-3.5" />
          ПІКІР • ОҚЫРМАН
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink mt-1">
          {ui.reviewsHeading}
        </h2>
        <p className="text-muted text-sm sm:text-base mt-2 max-w-2xl">
          {ui.reviewsSub}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Existing Reviews */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {reviews.map((rev) => (
            <article
              key={rev.id}
              className="rounded-2xl bg-ivory border border-borderWarm p-5 flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center gap-1 text-bronze mb-2.5">
                  {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="font-serif text-sm sm:text-base text-ink leading-relaxed">
                  «{rev.content}»
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-borderWarm/70">
                <div className="font-semibold text-sm text-ink">{rev.author_name}</div>
                <div className="text-xs text-muted flex flex-wrap gap-1 mt-0.5">
                  {rev.author_role && <span>{rev.author_role}</span>}
                  {rev.book_title && (
                    <span className="text-bronze font-medium">• «{rev.book_title}»</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Review Submission Form */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-5 rounded-3xl bg-ivory border border-borderWarm p-6 sm:p-7 shadow-sm space-y-4"
        >
          <h3 className="font-serif text-xl font-bold text-ink">
            {ui.reviewFormTitle}
          </h3>

          <div>
            <label className="block text-xs font-semibold text-muted mb-1">
              {ui.reviewNameLabel} *
            </label>
            <input
              type="text"
              required
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-borderWarm bg-parchment text-sm text-ink focus:outline-none focus:border-bronze"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-muted mb-1">
                {ui.reviewRoleLabel}
              </label>
              <input
                type="text"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-borderWarm bg-parchment text-sm text-ink focus:outline-none focus:border-bronze"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted mb-1">
                {ui.reviewBookLabel}
              </label>
              <select
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-borderWarm bg-parchment text-sm text-ink focus:outline-none focus:border-bronze"
              >
                <option value="">—</option>
                {books.map((b) => {
                  const t = localizeRecord(b, "title", lang);
                  return (
                    <option key={b.id} value={b.title_kk}>
                      {t}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-muted">
                {ui.reviewContentLabel} *
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`p-0.5 ${star <= rating ? "text-bronze" : "text-borderWarm"}`}
                    aria-label={`Rate ${star}`}
                  >
                    <Star className="w-4 h-4 fill-current" />
                  </button>
                ))}
              </div>
            </div>
            <textarea
              rows={4}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-borderWarm bg-parchment text-sm text-ink focus:outline-none focus:border-bronze"
            />
          </div>

          {error && <p className="text-xs text-red-700 font-medium">{error}</p>}
          {success && (
            <p className="text-xs text-emerald-700 font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              {ui.reviewSuccess}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-midnight hover:bg-bronze text-parchment text-sm font-semibold transition-colors disabled:opacity-60"
          >
            <Send className="w-4 h-4" />
            {ui.reviewSubmitBtn}
          </button>
        </form>
      </div>
    </section>
  );
}
