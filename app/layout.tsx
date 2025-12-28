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

const metaDesc =
  "Manage your customer's orders with ease at Veroca, a simple and powerful order management system.";

export const metadata: Metadata = {
  title: {
    default: "Veroca",
    template: "%s | Veroca",
  },
  description: metaDesc,
  keywords: [
    "veroca",
    "veroca order management system",
    "order management system",
  ],
  alternates: {
    canonical: "https://veroca.vercel.app/",
  },
  openGraph: {
    title: "Veroca: Order Management System",
    description: metaDesc,
    url: "https://veroca.vercel.app/",
    siteName: "Veroca: Order Management System",
    images: [
      {
        url: "/images/preview.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veroca: Order Management System",
    description: metaDesc,
    images: ["/images/preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
