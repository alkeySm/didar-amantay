"use client";

import React from "react";
import { Mail, Phone, Globe } from "lucide-react";
import { UIStrings } from "@/lib/i18n";

interface FooterProps {
  ui: UIStrings;
}

export default function Footer({ ui }: FooterProps) {
  return (
    <footer id="contact" className="bg-midnight text-parchment border-t border-bronze/30">
      <div className="kazakh-border-pattern w-full" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5 space-y-3">
            <div className="font-serif text-2xl font-bold text-white">
              {ui.heroTitle}
            </div>
            <p className="text-sm text-parchment/75 leading-relaxed max-w-md">
              {ui.footerTagline}
            </p>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4B483]">
              {ui.footerContactTitle}
            </h3>
            <ul className="space-y-2.5 text-sm text-parchment/85">
              <li>
                <a
                  href="mailto:didaramantay@gmail.com"
                  className="inline-flex items-center gap-2 hover:text-[#D4B483] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#D4B483]" />
                  didaramantay@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+77770011097"
                  className="inline-flex items-center gap-2 hover:text-[#D4B483] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#D4B483]" />
                  +7 777 001 10 97 (8 777 001 10 97)
                </a>
              </li>
              <li>
                <a
                  href="tel:+77089140601"
                  className="inline-flex items-center gap-2 hover:text-[#D4B483] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#D4B483]" />
                  +7 708 914 06 01 (8 708 914 06 01)
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4B483]">
              {ui.footerDomainsTitle}
            </h3>
            <ul className="space-y-2.5 text-sm text-parchment/85">
              <li>
                <a
                  href="https://didaramantay.kz"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#D4B483] transition-colors"
                >
                  <Globe className="w-4 h-4 text-[#D4B483]" />
                  didaramantay.kz
                </a>
              </li>
              <li>
                <a
                  href="https://teledidar.kz"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#D4B483] transition-colors"
                >
                  <Globe className="w-4 h-4 text-[#D4B483]" />
                  teledidar.kz (Подкаст)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-parchment/60">
          <span>{ui.footerRights}</span>
          <span>Қазақстан • 14 тілдегі әдеби портал</span>
        </div>
      </div>
    </footer>
  );
}
