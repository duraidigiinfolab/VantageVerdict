import type { Metadata } from "next";
import "./globals.css";
import "./components.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ThemeProvider from "@/components/common/ThemeProvider";

export const metadata: Metadata = {
  title: {
    default: "VantageVerdict — Honest Reviews That Matter",
    template: "%s | VantageVerdict",
  },
  description:
    "Your trusted source for in-depth reviews of products, places, events, recipes, and culture. Real opinions, honest verdicts.",
  keywords: [
    "reviews",
    "product reviews",
    "travel reviews",
    "food reviews",
    "culture reviews",
    "event reviews",
    "honest reviews",
    "VantageVerdict",
  ],
  authors: [{ name: "VantageVerdict Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "VantageVerdict",
    title: "VantageVerdict — Honest Reviews That Matter",
    description:
      "Your trusted source for in-depth reviews of products, places, events, recipes, and culture.",
  },
  twitter: {
    card: "summary_large_image",
    title: "VantageVerdict — Honest Reviews That Matter",
    description:
      "Your trusted source for in-depth reviews of products, places, events, recipes, and culture.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
