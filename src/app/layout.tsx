import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Genshin Impact Achievements",
  description: "Genshin Impact Achievement Tracker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="google-site-verification"
          content="ofIwoRAwnQ5gsEvR3V98Rh1tOOyePPAHJ3mKN6mnCKk"
        />
      </Head>
      <body className={font.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
