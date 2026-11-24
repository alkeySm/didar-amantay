"use client";

import React from "react";
import { Award, GraduationCap, Film, BookMarked, Newspaper } from "lucide-react";
import { UIStrings } from "@/lib/i18n";

interface BiographySectionProps {
  ui: UIStrings;
}

const TIMELINE = [
  {
    year: "1969",
    title_kk: "Дүниеге келуі",
    desc_kk: "5 ақпанда Қарағанды облысы, Қарқаралы ауданында дүниеге келді.",
    icon: BookMarked,
  },
  {
    year: "1989–1994",
    title_kk: "ҚазҰУ — Философия және саясаттану",
    desc_kk: "Әл-Фараби атындағы Қазақ ұлттық университетін үздік бітірді.",
    icon: GraduationCap,
  },
  {
    year: "1994–1997",
    title_kk: "Т. Жүргенов атындағы Өнер академиясы",
    desc_kk: "«Кинодраматург» мамандығын тәмамдады; 1996 ж. «Post Scriptum» кітабы жарық көрді.",
    icon: Film,
  },
  {
    year: "1999–2007",
    title_kk: "«Дарын», «Тарлан» және «Гүлдер мен кітаптар»",
    desc_kk: "Мемлекеттік «Дарын» (1999) және «Тарлан» (2007) сыйлықтарын иеленді; «Гүлдер мен кітаптар» (2003) романын жариялады.",
    icon: Award,
  },
  {
    year: "2008–2026",
    title_kk: "«Қазақфильм», көптомдықтар және Teledidar.kz",
    desc_kk: "«Қазақфильм» бас редакторы, «Майдақоңыр» (2023), «Пұт-кітап» (2024) кітаптары мен Teledidar.kz подкасты.",
    icon: Newspaper,
  },
];

export default function BiographySection({ ui }: BiographySectionProps) {
  return (
    <section id="biography" className="py-16 sm:py-20 bg-sand/55 border-y border-borderWarm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Author Portrait + Awards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl overflow-hidden border border-borderWarm bg-ivory shadow-md max-w-sm mx-auto lg:max-w-none">
              <img
                src="/images/didar-amantay.jpg"
                alt="Дидар Амантай"
                className="w-full h-[420px] object-cover object-top"
              />
              <div className="p-5 bg-ivory border-t border-borderWarm">
                <div className="font-serif font-bold text-xl text-ink">Дидар Амантай</div>
                <div className="text-xs text-bronze font-semibold uppercase tracking-wider mt-1">
                  05.02.1969 • Қарқаралы — Алматы
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-ivory border border-borderWarm p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-bronze mb-3 flex items-center gap-2">
                <Award className="w-4 h-4" />
                {ui.bioAwardsTitle}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-parchment border border-borderWarm">
                  <div className="font-serif font-bold text-ink">«Дарын» сыйлығы</div>
                  <div className="text-xs text-muted mt-0.5">1999 • Мемлекеттік жастар сыйлығы</div>
                </div>
                <div className="p-3 rounded-xl bg-parchment border border-borderWarm">
                  <div className="font-serif font-bold text-ink">«Тарлан» сыйлығы</div>
                  <div className="text-xs text-muted mt-0.5">2007 • Тәуелсіз меценаттар сыйлығы</div>
                </div>
              </div>
            </div>
          </div>

          {/* Literary Biography & Timeline */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-bronze">
                05.02.1969
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink mt-1">
                {ui.bioHeading}
              </h2>
              <p className="text-bronze font-medium text-sm sm:text-base mt-1">
                {ui.bioSub}
              </p>
            </div>

            <div className="space-y-4 text-ink/90 text-sm sm:text-base leading-relaxed">
              <p>{ui.bioParagraph1}</p>
              <p>{ui.bioParagraph2}</p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-bronze mb-4">
                {ui.bioTimelineTitle}
              </h3>
              <div className="space-y-3">
                {TIMELINE.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.year}
                      className="flex items-start gap-4 p-4 rounded-2xl bg-ivory border border-borderWarm"
                    >
                      <div className="w-10 h-10 rounded-xl bg-bronze/10 text-bronze flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold px-2 py-0.5 rounded bg-midnight text-parchment">
                            {item.year}
                          </span>
                          <span className="font-serif font-bold text-ink">
                            {item.title_kk}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-muted mt-1 leading-relaxed">
                          {item.desc_kk}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
