import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReviewRadar — The full picture, in one place",
  description:
    "ReviewRadar aggregates product reviews from across the internet so you can make confident purchasing decisions without the endless tab-switching.",
  keywords: [
    "product reviews",
    "review aggregator",
    "compare reviews",
    "trusted reviews",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
