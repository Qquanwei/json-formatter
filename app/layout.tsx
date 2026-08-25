import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "JSON Formatter & Validator — Free Online JSON Beautifier",
    template: "%s — JSON Formatter",
  },
  description:
    "Free online JSON formatter, validator, minifier, and beautifier with syntax highlighting and a tree view. Supports JavaScript-style JSON with comments, unquoted keys, and trailing commas. No data leaves your browser.",
  keywords: [
    "json formatter",
    "json validator",
    "json beautifier",
    "json minifier",
    "format json",
    "json pretty print",
  ],
  openGraph: {
    title: "JSON Formatter & Validator — Free Online JSON Beautifier",
    description:
      "Free online JSON formatter, validator, minifier, and beautifier with syntax highlighting and a tree view.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
