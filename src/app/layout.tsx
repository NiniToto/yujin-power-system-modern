import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";
import QuickMenu from "@/components/layout/QuickMenu";
import ScrollToTop from "@/components/layout/ScrollToTop";

export const metadata: Metadata = {
  title: "유진파워시스템 - 기술과 혁신으로 미래를 창조합니다",
  description: "유진파워시스템은 전력 시스템, 자동화 시스템, 부품 국산화 등 혁신적인 기술로 산업 발전에 기여합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-screen flex flex-col">
        <LanguageProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <QuickMenu />
          <ScrollToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}
