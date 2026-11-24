"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Layers,
  Quote as QuoteIcon,
  Mic,
  Camera,
  MessageSquareQuote,
  Plus,
  Pencil,
  Trash2,
  LogOut,
  Upload,
  Check,
  Eye,
  EyeOff,
  Lock,
} from "lucide-react";
import {
  BookItem,
  GalleryEntry,
  GenreSlug,
  PodcastItem,
  QuoteItem,
  ReviewItem,
  SiteOverview,
  WorkItem,
} from "@/lib/types";
import { GENRE_ORDER, LANGUAGES, getUIStrings } from "@/lib/i18n";
import { api, getStoredToken, setStoredToken } from "@/lib/api";
import BookCover from "@/components/BookCover";

type AdminTab = "books" | "works" | "quotes" | "media" | "reviews";

const EMPTY_BOOK_FORM = {
  title_kk: "",
  subtitle_kk: "",
  year: new Date().getFullYear(),
  publisher: "",
  isbn: "",
  pages: "",
  genre: "romandar",
  cover_color: "#1D352E",
  cover_url: "",
  pdf_url: "",
  is_new: true,
  is_featured: false,
  available_languages: ["kk", "ru", "en"],
  description_kk: "",
  excerpt_kk: "",
  title_ru: "",
  description_ru: "",
  title_en: "",
  description_en: "",
};

export default function AdminPage() {
  const ui = getUIStrings("kk");

  const [token, setToken] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<AdminTab>("books");
  const [data, setData] = useState<SiteOverview | null>(null);
  const [allReviews, setAllReviews] = useState<ReviewItem[]>([]);
  const [statusMsg, setStatusMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Book form state
  const [editingBookId, setEditingBookId] = useState<number | null>(null);
  const [bookForm, setBookForm] = useState(EMPTY_BOOK_FORM);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [savingBook, setSavingBook] = useState(false);

  // Work form state
  const [workForm, setWorkForm] = useState({
    genre: "angime_novella" as GenreSlug,
    year: new Date().getFullYear(),
    is_new: true,
    title_kk: "",
    summary_kk: "",
    content_kk: "",
    title_ru: "",
    title_en: "",
  });

  // Quote form state
  const [quoteForm, setQuoteForm] = useState({
    category: "oi" as "oi" | "metafora",
    text_kk: "",
    text_ru: "",
    text_en: "",
    source_kk: "",
  });

  // Podcast & Gallery forms
  const [podcastForm, setPodcastForm] = useState({
    episode_number: 5,
    title_kk: "",
    description_kk: "",
    video_url: "https://teledidar.kz",
    duration: "45:00",
    published_date: "2026-11",
  });
  const [galleryForm, setGalleryForm] = useState({
    image_url: "",
    caption_kk: "",
    year: "2026",
    category: "archive",
  });

  const loadData = async (activeToken: string) => {
    const [overview, reviews] = await Promise.all([
      api.getOverview(),
      api.listAllReviews(activeToken),
    ]);
    setData(overview);
    setAllReviews(reviews);
  };

  useEffect(() => {
    const saved = getStoredToken();
    if (!saved) {
      setAuthReady(true);
      return;
    }
    api
      .me(saved)
      .then(async () => {
        setToken(saved);
        await loadData(saved);
      })
      .catch(() => {
        setStoredToken(null);
      })
      .finally(() => setAuthReady(true));
  }, []);

  const flash = (msg: string) => {
    setErrorMsg("");
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(""), 4000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);
    try {
      const res = await api.login(username.trim(), password);
      setStoredToken(res.access_token);
      setToken(res.access_token);
      await loadData(res.access_token);
    } catch (err: any) {
      setLoginError(err?.message || "Кіру сәтсіз аяқталды");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setStoredToken(null);
    setToken(null);
    setPassword("");
  };

  const handleBookFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    target: "cover" | "pdf" | "gallery"
  ) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;
    if (target === "cover") setUploadingCover(true);
    if (target === "pdf") setUploadingPdf(true);
    try {
      const res = await api.uploadFile(token, file);
      if (target === "cover") setBookForm((f) => ({ ...f, cover_url: res.url }));
      if (target === "pdf") setBookForm((f) => ({ ...f, pdf_url: res.url }));
      if (target === "gallery") setGalleryForm((f) => ({ ...f, image_url: res.url }));
      flash(`Файл жүктелді: ${res.filename}`);
    } catch (err: any) {
      setErrorMsg(err?.message || "Файл жүктеу қатесі");
    } finally {
      setUploadingCover(false);
      setUploadingPdf(false);
    }
  };

  const toggleBookLanguage = (code: string) => {
    setBookForm((prev) => {
      const exists = prev.available_languages.includes(code);
      const next = exists
        ? prev.available_languages.filter((c) => c !== code)
        : [...prev.available_languages, code];
      return { ...prev, available_languages: next.length ? next : ["kk"] };
    });
  };

  const handleSaveBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSavingBook(true);
    setErrorMsg("");
    try {
      const payload: Partial<BookItem> = {
        title_kk: bookForm.title_kk.trim(),
        subtitle_kk: bookForm.subtitle_kk.trim(),
        year: Number(bookForm.year) || 2026,
        publisher: bookForm.publisher.trim(),
        isbn: bookForm.isbn.trim() || null,
        pages: bookForm.pages ? Number(bookForm.pages) : null,
        genre: bookForm.genre,
        cover_color: bookForm.cover_color,
        cover_url: bookForm.cover_url.trim() || null,
        pdf_url: bookForm.pdf_url.trim() || null,
        is_new: bookForm.is_new,
        is_featured: bookForm.is_featured,
        available_languages: bookForm.available_languages,
        description_kk: bookForm.description_kk.trim(),
        excerpt_kk: bookForm.excerpt_kk.trim(),
        title_ru: bookForm.title_ru.trim(),
        description_ru: bookForm.description_ru.trim(),
        title_en: bookForm.title_en.trim(),
        description_en: bookForm.description_en.trim(),
      };
      if (editingBookId) {
        await api.updateBook(token, editingBookId, payload);
        flash("Кітап сәтті жаңартылды!");
      } else {
        await api.createBook(token, payload);
        flash("Жаңа кітап сәтті қосылды!");
      }
      setEditingBookId(null);
      setBookForm(EMPTY_BOOK_FORM);
      await loadData(token);
    } catch (err: any) {
      setErrorMsg(err?.message || "Сақтау қатесі");
    } finally {
      setSavingBook(false);
    }
  };

  const startEditBook = (b: BookItem) => {
    setEditingBookId(b.id);
    setBookForm({
      title_kk: b.title_kk,
      subtitle_kk: b.subtitle_kk || "",
      year: b.year,
      publisher: b.publisher || "",
      isbn: b.isbn || "",
      pages: b.pages ? String(b.pages) : "",
      genre: b.genre || "romandar",
      cover_color: b.cover_color || "#1D352E",
      cover_url: b.cover_url || "",
      pdf_url: b.pdf_url || "",
      is_new: b.is_new,
      is_featured: b.is_featured,
      available_languages: b.available_languages?.length ? b.available_languages : ["kk"],
      description_kk: b.description_kk || "",
      excerpt_kk: b.excerpt_kk || "",
      title_ru: b.title_ru || "",
      description_ru: b.description_ru || "",
      title_en: b.title_en || "",
      description_en: b.description_en || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteBook = async (id: number) => {
    if (!token) return;
    await api.deleteBook(token, id);
    await loadData(token);
    flash("Кітап өшірілді.");
  };

  const handleCreateWork = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    await api.createWork(token, {
      ...workForm,
      available_languages: ["kk", "ru", "en"],
    });
    setWorkForm({
      genre: "angime_novella",
      year: new Date().getFullYear(),
      is_new: true,
      title_kk: "",
      summary_kk: "",
      content_kk: "",
      title_ru: "",
      title_en: "",
    });
    await loadData(token);
    flash("Жаңа шығарма қосылды!");
  };

  const handleCreateQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    await api.createQuote(token, quoteForm);
    setQuoteForm({ category: "oi", text_kk: "", text_ru: "", text_en: "", source_kk: "" });
    await loadData(token);
    flash("Ой / Метафора қосылды!");
  };

  const handleCreatePodcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    await api.createPodcast(token, podcastForm);
    setPodcastForm({
      episode_number: (data?.podcasts.length || 0) + 2,
      title_kk: "",
      description_kk: "",
      video_url: "https://teledidar.kz",
      duration: "45:00",
      published_date: "2026-11",
    });
    await loadData(token);
    flash("Teledidar.kz эпизоды қосылды!");
  };

  const handleCreateGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !galleryForm.image_url) return;
    await api.createGallery(token, galleryForm);
    setGalleryForm({ image_url: "", caption_kk: "", year: "2026", category: "archive" });
    await loadData(token);
    flash("Фотосурет қосылды!");
  };

  if (!authReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-parchment text-muted">
        Жүктелуде...
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-parchment px-4">
        <div className="w-full max-w-md rounded-3xl bg-ivory border border-borderWarm shadow-xl p-8 space-y-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-bronze hover:text-bronzeDark"
            >
              <ArrowLeft className="w-4 h-4" />
              Сайтқа оралу
            </Link>
            <span className="text-xs font-bold uppercase tracking-wider text-muted">
              didaramantay.kz
            </span>
          </div>

          <div>
            <div className="w-11 h-11 rounded-2xl bg-midnight text-parchment flex items-center justify-center mb-3">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-ink">
              Әкімші панелі (Admin)
            </h1>
            <p className="text-xs sm:text-sm text-muted mt-1">
              Жаңа кітаптар, шығармалар, ойлар мен подкасттарды басқару жүйесі.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-muted mb-1">
                Логин (Username)
              </label>
              <input
                type="text"
                required
                data-testid="admin-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-borderWarm bg-parchment text-sm text-ink focus:outline-none focus:border-bronze"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted mb-1">
                Құпиясөз (Password)
              </label>
              <input
                type="password"
                required
                data-testid="admin-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-borderWarm bg-parchment text-sm text-ink focus:outline-none focus:border-bronze"
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-700 font-medium">{loginError}</p>
            )}

            <button
              type="submit"
              disabled={loggingIn}
              data-testid="admin-login-btn"
              className="w-full py-2.5 rounded-full bg-midnight hover:bg-bronze text-parchment text-sm font-semibold transition-colors disabled:opacity-60"
            >
              {loggingIn ? "Тексерілуде..." : "Кіру"}
            </button>
          </form>

          <div className="pt-4 border-t border-borderWarm text-[11px] text-muted">
            Әдепкі кіру деректері: <code className="font-semibold text-ink">admin</code> /{" "}
            <code className="font-semibold text-ink">didar2026</code>
          </div>
        </div>
      </div>
    );
  }

  const tabs: { id: AdminTab; label: string; icon: any }[] = [
    { id: "books", label: `Кітаптар (${data?.books.length || 0})`, icon: BookOpen },
    { id: "works", label: `11 Жанр (${data?.works.length || 0})`, icon: Layers },
    { id: "quotes", label: `Ойлар (${data?.quotes.length || 0})`, icon: QuoteIcon },
    { id: "media", label: "Teledidar & Фото", icon: Mic },
    { id: "reviews", label: `Пікірлер (${allReviews.length})`, icon: MessageSquareQuote },
  ];

  return (
    <div className="min-h-screen bg-parchment">
      {/* Admin Top Header */}
      <header className="sticky top-0 z-40 bg-midnight text-parchment border-b border-bronze/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-bronze text-xs font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Сайтқа өту
            </Link>
            <div className="font-serif font-bold text-lg">
              Дидар Амантай — Admin CMS
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/10 text-xs font-medium"
          >
            <LogOut className="w-3.5 h-3.5" />
            Шығу
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Notifications */}
        {statusMsg && (
          <div className="px-4 py-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium flex items-center gap-2">
            <Check className="w-4 h-4" />
            {statusMsg}
          </div>
        )}
        {errorMsg && (
          <div className="px-4 py-3 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm font-medium">
            {errorMsg}
          </div>
        )}

        {/* Admin Tabs */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
                  active
                    ? "bg-bronze text-white shadow-sm"
                    : "bg-ivory border border-borderWarm text-ink hover:border-bronze"
                }`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: BOOKS CRUD */}
        {activeTab === "books" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Add / Edit Book Form */}
            <form
              onSubmit={handleSaveBook}
              className="lg:col-span-7 rounded-3xl bg-ivory border border-borderWarm p-6 sm:p-8 shadow-sm space-y-5"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl font-bold text-ink">
                  {editingBookId ? "Кітапты өңдеу" : "Жаңа кітап қосу"}
                </h2>
                {editingBookId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingBookId(null);
                      setBookForm(EMPTY_BOOK_FORM);
                    }}
                    className="text-xs font-semibold text-bronze hover:underline"
                  >
                    Болдырмау
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-muted mb-1">
                    Кітап атауы (Қазақша) *
                  </label>
                  <input
                    type="text"
                    required
                    data-testid="book-title-kk"
                    value={bookForm.title_kk}
                    onChange={(e) => setBookForm({ ...bookForm, title_kk: e.target.value })}
                    placeholder="Мысалы: Таулар мен ойлар"
                    className="w-full px-3.5 py-2 rounded-xl border border-borderWarm bg-parchment text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-muted mb-1">
                    Қосымша атауы / Жанрлық анықтамасы
                  </label>
                  <input
                    type="text"
                    value={bookForm.subtitle_kk}
                    onChange={(e) => setBookForm({ ...bookForm, subtitle_kk: e.target.value })}
                    placeholder="Философиялық роман"
                    className="w-full px-3.5 py-2 rounded-xl border border-borderWarm bg-parchment text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted mb-1">
                    Жылы *
                  </label>
                  <input
                    type="number"
                    required
                    data-testid="book-year"
                    value={bookForm.year}
                    onChange={(e) => setBookForm({ ...bookForm, year: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-borderWarm bg-parchment text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted mb-1">
                    Баспа (Publisher)
                  </label>
                  <input
                    type="text"
                    data-testid="book-publisher"
                    value={bookForm.publisher}
                    onChange={(e) => setBookForm({ ...bookForm, publisher: e.target.value })}
                    placeholder="Дәуір / Орхон"
                    className="w-full px-3.5 py-2 rounded-xl border border-borderWarm bg-parchment text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted mb-1">
                    Жанры
                  </label>
                  <select
                    value={bookForm.genre}
                    onChange={(e) => setBookForm({ ...bookForm, genre: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-borderWarm bg-parchment text-sm"
                  >
                    {GENRE_ORDER.map((g) => (
                      <option key={g} value={g}>
                        {ui.genres[g]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-muted mb-1">
                      Бет саны
                    </label>
                    <input
                      type="number"
                      value={bookForm.pages}
                      onChange={(e) => setBookForm({ ...bookForm, pages: e.target.value })}
                      placeholder="320"
                      className="w-full px-3 py-2 rounded-xl border border-borderWarm bg-parchment text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted mb-1">
                      Мұқаба түсі
                    </label>
                    <input
                      type="color"
                      value={bookForm.cover_color}
                      onChange={(e) => setBookForm({ ...bookForm, cover_color: e.target.value })}
                      className="w-full h-[38px] p-1 rounded-xl border border-borderWarm bg-parchment cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Cover & PDF Upload */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-parchment border border-borderWarm">
                <div>
                  <label className="block text-xs font-semibold text-muted mb-1.5">
                    Мұқаба суреті (Upload JPG/PNG)
                  </label>
                  <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ivory border border-borderWarm hover:border-bronze text-xs font-semibold cursor-pointer">
                    <Upload className="w-3.5 h-3.5 text-bronze" />
                    {uploadingCover ? "Жүктелуде..." : "Сурет таңдау"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleBookFileUpload(e, "cover")}
                    />
                  </label>
                  {bookForm.cover_url && (
                    <div className="text-[11px] text-emerald-700 mt-1 truncate">
                      {bookForm.cover_url}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted mb-1.5">
                    Кітап PDF файлы (Upload PDF)
                  </label>
                  <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ivory border border-borderWarm hover:border-bronze text-xs font-semibold cursor-pointer">
                    <Upload className="w-3.5 h-3.5 text-bronze" />
                    {uploadingPdf ? "Жүктелуде..." : "PDF таңдау"}
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => handleBookFileUpload(e, "pdf")}
                    />
                  </label>
                  {bookForm.pdf_url && (
                    <div className="text-[11px] text-emerald-700 mt-1 truncate">
                      {bookForm.pdf_url}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted mb-1">
                  Аннотация / Сипаттамасы (Қазақша) *
                </label>
                <textarea
                  rows={3}
                  data-testid="book-description-kk"
                  value={bookForm.description_kk}
                  onChange={(e) => setBookForm({ ...bookForm, description_kk: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-borderWarm bg-parchment text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted mb-1">
                  Кітаптан үзінді (Excerpt)
                </label>
                <textarea
                  rows={3}
                  data-testid="book-excerpt-kk"
                  value={bookForm.excerpt_kk}
                  onChange={(e) => setBookForm({ ...bookForm, excerpt_kk: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-borderWarm bg-parchment text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-muted mb-1">
                    Атауы (Орысша / RU)
                  </label>
                  <input
                    type="text"
                    value={bookForm.title_ru}
                    onChange={(e) => setBookForm({ ...bookForm, title_ru: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-borderWarm bg-parchment text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted mb-1">
                    Title (English / EN)
                  </label>
                  <input
                    type="text"
                    value={bookForm.title_en}
                    onChange={(e) => setBookForm({ ...bookForm, title_en: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-borderWarm bg-parchment text-sm"
                  />
                </div>
              </div>

              {/* 14-Language Availability */}
              <div>
                <label className="block text-xs font-semibold text-muted mb-2">
                  Қолжетімді / аударылған тілдер (14 тіл):
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {LANGUAGES.map((l) => {
                    const checked = bookForm.available_languages.includes(l.code);
                    return (
                      <button
                        key={l.code}
                        type="button"
                        onClick={() => toggleBookLanguage(l.code)}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                          checked
                            ? "bg-bronze text-white"
                            : "bg-parchment border border-borderWarm text-muted"
                        }`}
                      >
                        {l.kazakhName}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-wrap gap-6 pt-1">
                <label className="inline-flex items-center gap-2 text-sm text-ink cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bookForm.is_new}
                    onChange={(e) => setBookForm({ ...bookForm, is_new: e.target.checked })}
                    className="rounded border-borderWarm text-bronze"
                  />
                  Жаңа туынды (New Release)
                </label>

                <label className="inline-flex items-center gap-2 text-sm text-ink cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bookForm.is_featured}
                    onChange={(e) => setBookForm({ ...bookForm, is_featured: e.target.checked })}
                    className="rounded border-borderWarm text-bronze"
                  />
                  Басты кітап (Featured)
                </label>
              </div>

              <button
                type="submit"
                disabled={savingBook}
                data-testid="save-book-btn"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-midnight hover:bg-bronze text-parchment text-sm font-semibold transition-colors disabled:opacity-60"
              >
                <Plus className="w-4 h-4" />
                {editingBookId ? "Өзгерістерді сақтау" : "Кітапты жариялау"}
              </button>
            </form>

            {/* Live Cover Preview + Books List */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl bg-ivory border border-borderWarm p-6 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-bronze mb-4">
                  Мұқаба үлгісі (Live Preview)
                </div>
                <div className="max-w-[200px] mx-auto">
                  <BookCover
                    title={bookForm.title_kk || "Кітап атауы"}
                    subtitle={bookForm.subtitle_kk}
                    year={Number(bookForm.year) || 2026}
                    publisher={bookForm.publisher}
                    coverUrl={bookForm.cover_url || null}
                    coverColor={bookForm.cover_color}
                    isNew={bookForm.is_new}
                  />
                </div>
              </div>

              <div className="rounded-3xl bg-ivory border border-borderWarm p-6 shadow-sm space-y-3">
                <h3 className="font-serif text-lg font-bold text-ink">
                  Барлық кітаптар ({data?.books.length || 0})
                </h3>
                <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
                  {(data?.books || []).map((b) => (
                    <div
                      key={b.id}
                      className="p-3.5 rounded-2xl bg-parchment border border-borderWarm flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="font-serif font-bold text-sm text-ink truncate">
                          {b.title_kk}
                        </div>
                        <div className="text-xs text-muted">
                          {b.year} • {b.publisher || "—"}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => startEditBook(b)}
                          className="p-2 rounded-lg bg-ivory border border-borderWarm text-ink hover:border-bronze"
                          aria-label="Edit book"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          data-testid={`delete-book-${b.id}`}
                          onClick={() => handleDeleteBook(b.id)}
                          className="p-2 rounded-lg bg-ivory border border-borderWarm text-red-700 hover:bg-red-50"
                          aria-label="Delete book"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: WORKS (11 GENRES) */}
        {activeTab === "works" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <form
              onSubmit={handleCreateWork}
              className="lg:col-span-5 rounded-3xl bg-ivory border border-borderWarm p-6 space-y-4"
            >
              <h2 className="font-serif text-xl font-bold text-ink">
                11 жанр бойынша жаңа туынды қосу
              </h2>
              <div>
                <label className="block text-xs font-semibold text-muted mb-1">Жанр</label>
                <select
                  value={workForm.genre}
                  onChange={(e) => setWorkForm({ ...workForm, genre: e.target.value as GenreSlug })}
                  className="w-full px-3.5 py-2 rounded-xl border border-borderWarm bg-parchment text-sm"
                >
                  {GENRE_ORDER.map((g) => (
                    <option key={g} value={g}>
                      {ui.genres[g]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted mb-1">Атауы (Қазақша) *</label>
                <input
                  type="text"
                  required
                  value={workForm.title_kk}
                  onChange={(e) => setWorkForm({ ...workForm, title_kk: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-borderWarm bg-parchment text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted mb-1">Қысқаша сипаттамасы</label>
                <textarea
                  rows={2}
                  value={workForm.summary_kk}
                  onChange={(e) => setWorkForm({ ...workForm, summary_kk: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-borderWarm bg-parchment text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted mb-1">Мәтін / Толық мазмұны</label>
                <textarea
                  rows={3}
                  value={workForm.content_kk}
                  onChange={(e) => setWorkForm({ ...workForm, content_kk: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-borderWarm bg-parchment text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-midnight hover:bg-bronze text-parchment text-sm font-semibold"
              >
                Шығарма қосу
              </button>
            </form>

            <div className="lg:col-span-7 rounded-3xl bg-ivory border border-borderWarm p-6 space-y-3">
              <h3 className="font-serif text-lg font-bold text-ink">
                Барлық шығармалар ({data?.works.length || 0})
              </h3>
              <div className="space-y-2 max-h-[540px] overflow-y-auto">
                {(data?.works || []).map((w: WorkItem) => (
                  <div
                    key={w.id}
                    className="p-3.5 rounded-2xl bg-parchment border border-borderWarm flex items-center justify-between gap-3"
                  >
                    <div>
                      <span className="text-[11px] font-bold text-bronze">
                        {ui.genres[w.genre as GenreSlug] || w.genre}
                      </span>
                      <div className="font-serif font-bold text-sm text-ink">{w.title_kk}</div>
                    </div>
                    <button
                      type="button"
                      onClick={async () => {
                        await api.deleteWork(token, w.id);
                        await loadData(token);
                        flash("Шығарма өшірілді.");
                      }}
                      className="p-2 rounded-lg bg-ivory border border-borderWarm text-red-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: QUOTES & METAPHORS */}
        {activeTab === "quotes" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <form
              onSubmit={handleCreateQuote}
              className="lg:col-span-5 rounded-3xl bg-ivory border border-borderWarm p-6 space-y-4"
            >
              <h2 className="font-serif text-xl font-bold text-ink">
                Ой немесе Метафора қосу
              </h2>
              <select
                value={quoteForm.category}
                onChange={(e) => setQuoteForm({ ...quoteForm, category: e.target.value as "oi" | "metafora" })}
                className="w-full px-3.5 py-2 rounded-xl border border-borderWarm bg-parchment text-sm"
              >
                <option value="oi">Ойлары (Афоризм)</option>
                <option value="metafora">Метафоралары</option>
              </select>
              <textarea
                rows={4}
                required
                placeholder="Қазақша мәтін..."
                value={quoteForm.text_kk}
                onChange={(e) => setQuoteForm({ ...quoteForm, text_kk: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-borderWarm bg-parchment text-sm"
              />
              <input
                type="text"
                placeholder="Дереккөзі (мысалы: «Гүлдер мен кітаптар»)"
                value={quoteForm.source_kk}
                onChange={(e) => setQuoteForm({ ...quoteForm, source_kk: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-borderWarm bg-parchment text-sm"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-midnight hover:bg-bronze text-parchment text-sm font-semibold"
              >
                Қосу
              </button>
            </form>

            <div className="lg:col-span-7 rounded-3xl bg-ivory border border-borderWarm p-6 space-y-3">
              {(data?.quotes || []).map((q: QuoteItem) => (
                <div
                  key={q.id}
                  className="p-4 rounded-2xl bg-parchment border border-borderWarm flex items-start justify-between gap-3"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase text-bronze">
                      {q.category === "oi" ? "Ойлары" : "Метафоралары"}
                    </span>
                    <p className="font-serif text-sm text-ink mt-1">«{q.text_kk}»</p>
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      await api.deleteQuote(token, q.id);
                      await loadData(token);
                      flash("Өшірілді.");
                    }}
                    className="p-2 rounded-lg bg-ivory border border-borderWarm text-red-700 shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TELEDIDAR PODCAST & PHOTO GALLERY */}
        {activeTab === "media" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-3xl bg-ivory border border-borderWarm p-6 space-y-4">
              <h2 className="font-serif text-xl font-bold text-ink flex items-center gap-2">
                <Mic className="w-5 h-5 text-bronze" /> Teledidar.kz подкаст қосу
              </h2>
              <form onSubmit={handleCreatePodcast} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Эпизод атауы (Қазақша)"
                  value={podcastForm.title_kk}
                  onChange={(e) => setPodcastForm({ ...podcastForm, title_kk: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-borderWarm bg-parchment text-sm"
                />
                <textarea
                  rows={2}
                  placeholder="Сипаттама"
                  value={podcastForm.description_kk}
                  onChange={(e) => setPodcastForm({ ...podcastForm, description_kk: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-borderWarm bg-parchment text-sm"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="URL (https://teledidar.kz/...)"
                    value={podcastForm.video_url}
                    onChange={(e) => setPodcastForm({ ...podcastForm, video_url: e.target.value })}
                    className="px-3.5 py-2 rounded-xl border border-borderWarm bg-parchment text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Ұзақтығы (45:00)"
                    value={podcastForm.duration}
                    onChange={(e) => setPodcastForm({ ...podcastForm, duration: e.target.value })}
                    className="px-3.5 py-2 rounded-xl border border-borderWarm bg-parchment text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full bg-midnight hover:bg-bronze text-parchment text-sm font-semibold"
                >
                  Эпизод қосу
                </button>
              </form>
              <div className="space-y-2 pt-3 border-t border-borderWarm">
                {(data?.podcasts || []).map((ep: PodcastItem) => (
                  <div
                    key={ep.id}
                    className="p-3 rounded-xl bg-parchment border border-borderWarm flex items-center justify-between"
                  >
                    <span className="text-sm font-semibold text-ink">
                      #{ep.episode_number} {ep.title_kk}
                    </span>
                    <button
                      type="button"
                      onClick={async () => {
                        await api.deletePodcast(token, ep.id);
                        await loadData(token);
                      }}
                      className="text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-ivory border border-borderWarm p-6 space-y-4">
              <h2 className="font-serif text-xl font-bold text-ink flex items-center gap-2">
                <Camera className="w-5 h-5 text-bronze" /> Фотогалереяға сурет қосу
              </h2>
              <form onSubmit={handleCreateGallery} className="space-y-3">
                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-parchment border border-borderWarm hover:border-bronze text-xs font-semibold cursor-pointer">
                  <Upload className="w-4 h-4 text-bronze" />
                  Сурет жүктеу
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleBookFileUpload(e, "gallery")}
                  />
                </label>
                <input
                  type="text"
                  required
                  placeholder="Немесе сурет URL"
                  value={galleryForm.image_url}
                  onChange={(e) => setGalleryForm({ ...galleryForm, image_url: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-borderWarm bg-parchment text-sm"
                />
                <input
                  type="text"
                  required
                  placeholder="Сурет сипаттамасы (Қазақша)"
                  value={galleryForm.caption_kk}
                  onChange={(e) => setGalleryForm({ ...galleryForm, caption_kk: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-borderWarm bg-parchment text-sm"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full bg-midnight hover:bg-bronze text-parchment text-sm font-semibold"
                >
                  Фотосурет қосу
                </button>
              </form>
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-borderWarm">
                {(data?.gallery || []).map((g: GalleryEntry) => (
                  <div key={g.id} className="relative rounded-xl overflow-hidden border border-borderWarm">
                    <img src={g.image_url} alt={g.caption_kk} className="w-full h-24 object-cover" />
                    <button
                      type="button"
                      onClick={async () => {
                        await api.deleteGallery(token, g.id);
                        await loadData(token);
                      }}
                      className="absolute top-1.5 right-1.5 p-1.5 rounded-full bg-midnight/80 text-white"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: REVIEWS MODERATION */}
        {activeTab === "reviews" && (
          <div className="rounded-3xl bg-ivory border border-borderWarm p-6 space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">
              Оқырман пікірлерін модерациялау
            </h2>
            {allReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-4 rounded-2xl bg-parchment border border-borderWarm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="font-semibold text-sm text-ink">
                    {rev.author_name}{" "}
                    <span className="text-xs text-muted font-normal">
                      {rev.author_role ? `(${rev.author_role})` : ""}
                    </span>
                  </div>
                  <p className="text-sm text-ink/85 mt-1">{rev.content}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={async () => {
                      await api.toggleReview(token, rev.id, !rev.is_approved);
                      await loadData(token);
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                      rev.is_approved
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-stone-200 text-stone-700"
                    }`}
                  >
                    {rev.is_approved ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    {rev.is_approved ? "Көрініп тұр" : "Жасырылған"}
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      await api.deleteReview(token, rev.id);
                      await loadData(token);
                    }}
                    className="p-2 rounded-lg bg-ivory border border-borderWarm text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
