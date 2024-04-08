import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import "./globals.css";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Genshin Impact Achievements",
  description: "Genshin Impact Achievement Tracker",
  verification: {
    google: "ofIwoRAwnQ5gsEvR3V98Rh1tOOyePPAHJ3mKN6mnCKk",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
