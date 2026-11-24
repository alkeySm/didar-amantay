"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Globe, ChevronDown, ShieldCheck, Menu, X, Check } from "lucide-react";
import { LANGUAGES, UIStrings, getLanguageMeta } from "@/lib/i18n";
import { LangCode } from "@/lib/types";

interface NavbarProps {
  lang: LangCode;
  onChangeLang: (lang: LangCode) => void;
  ui: UIStrings;
}

export default function Navbar({ lang, onChangeLang, ui }: NavbarProps) {
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = getLanguageMeta(lang);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navItems = [
    { href: "#biography", label: ui.navBio },
    { href: "#books", label: ui.navBooks },
    { href: "#works", label: ui.navWorks },
    { href: "#quotes", label: ui.navQuotes },
    { href: "#gallery", label: ui.navGallery },
    { href: "#podcast", label: ui.navPodcast },
    { href: "#reviews", label: ui.navReviews },
  ];

  return (
    <header className="sticky top-0 z-40 bg-parchment/90 backdrop-blur-md border-b border-borderWarm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <a href="#top" className="flex items-center gap-3 shrink-0 group">
            <div className="w-9 h-9 rounded-full bg-midnight text-parchment flex items-center justify-center font-serif font-bold text-base border border-bronze/50 group-hover:bg-bronze transition-colors">
              ДА
            </div>
            <div>
              <div className="font-serif font-bold text-base sm:text-lg tracking-tight text-ink leading-none">
                {ui.heroTitle}
              </div>
              <div className="text-[11px] uppercase tracking-[0.14em] text-bronze font-medium mt-0.5">
                didaramantay.kz
              </div>
            </div>
          </a>

          <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-muted">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-bronze transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            {/* 14-Language Switcher */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                data-testid="lang-switcher"
                onClick={() => setLangOpen((prev) => !prev)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-borderWarm bg-ivory hover:border-bronze text-xs sm:text-sm font-medium text-ink transition-all shadow-sm"
                aria-label={ui.langLabel}
              >
                <Globe className="w-4 h-4 text-bronze" />
                <span className="font-semibold uppercase">{currentLang.code}</span>
                <span className="hidden sm:inline text-muted truncate max-w-[115px]">
                  · {currentLang.nativeName}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-muted transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>

              {langOpen && (
                <div
                  data-testid="lang-menu"
                  className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-ivory border border-borderWarm shadow-xl p-3 z-50"
                >
                  <div className="px-2 pb-2 mb-2 border-b border-borderWarm flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-bronze">
                      {ui.langLabel} (14)
                    </span>
                    <span className="text-[11px] text-muted">Шығармашылық тілдері</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 max-h-80 overflow-y-auto">
                    {LANGUAGES.map((l) => {
                      const active = l.code === lang;
                      return (
                        <button
                          key={l.code}
                          type="button"
                          data-testid={`lang-option-${l.code}`}
                          onClick={() => {
                            onChangeLang(l.code);
                            setLangOpen(false);
                          }}
                          className={`flex items-center justify-between px-2.5 py-2 rounded-xl text-left text-xs transition-colors ${
                            active
                              ? "bg-bronze text-white font-semibold"
                              : "hover:bg-sand text-ink"
                          }`}
                        >
                          <div className="truncate">
                            <div className="truncate">{l.nativeName}</div>
                            <div
                              className={`text-[10px] truncate ${
                                active ? "text-parchment/80" : "text-muted"
                              }`}
                            >
                              {l.kazakhName}
                            </div>
                          </div>
                          {active && <Check className="w-3.5 h-3.5 shrink-0 ml-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-midnight hover:bg-bronze text-parchment text-xs sm:text-sm font-medium transition-colors shadow-sm"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{ui.adminBtn}</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="xl:hidden p-2 rounded-lg border border-borderWarm bg-ivory text-ink"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="xl:hidden pb-4 pt-2 border-t border-borderWarm flex flex-wrap gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-1.5 rounded-full bg-ivory border border-borderWarm text-xs font-medium text-ink hover:border-bronze"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
