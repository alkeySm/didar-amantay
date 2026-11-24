import type { Metadata } from "next";
import { Lora, Noto_Sans } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
});

const notoSans = Noto_Sans({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto",
});

export const metadata: Metadata = {
  title: "Дидар Амантай — Ресми әдеби портал | didaramantay.kz",
  description:
    "Қазақтың көрнекті жазушысы, кинодраматург, философ Дидар Амантайдың ресми сайты. «Гүлдер мен кітаптар», «Пұт-кітап», «Майдақоңыр», 11 жанр, Teledidar.kz подкасты.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kk" className={`${lora.variable} ${notoSans.variable}`}>
      <body className="font-sans antialiased bg-parchment text-ink selection:bg-bronze/20 selection:text-ink">
        {children}
      </body>
    </html>
  );
}
