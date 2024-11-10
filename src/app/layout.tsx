import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "./Provider";
import Header from "./components/Header";
import apple from "./favicon/apple-touch-icon.png"
import favicon from "./favicon/favicon-96x96.png"
import icon from "./favicon/favicon.svg"
import shortcut from "./favicon/favicon.ico"
import manifest from "./favicon/web-app-manifest-512x512.png"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "InnoVerse",
  description: "Share Your InnoVation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href={favicon.src} sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href={icon.src} />
        <link rel="shortcut icon" href={shortcut.src} />
        <link rel="apple-touch-icon" sizes="180x180" href={apple.src} />
        <link rel="manifest" href={manifest.src} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
