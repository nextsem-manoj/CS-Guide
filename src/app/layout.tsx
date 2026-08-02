import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter, Lora, Outfit } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 0.5,
  maximumScale: 5,
  userScalable: true,
};


export const metadata: Metadata = {
  metadataBase: new URL("https://nextsem.online"),
  title: {
    default: "Nextsem Academy — India's #1 Free Multilingual Full Stack Learning Platform",
    template: "%s | Nextsem Academy",
  },
  description: "Learn Full Stack Web Development for FREE in Hindi, Hinglish & English. HTML, CSS, JavaScript, React, Node.js, Next.js, Python, DSA, SQL, MongoDB & more — with interactive lessons, MCQ quizzes, and Kid + Pro mode. India's #1 multilingual developer learning platform.",
  keywords: [
    "full stack web development course free",
    "learn html css javascript in hindi",
    "react js course hindi",
    "node js tutorial hindi hinglish",
    "free coding course india",
    "nextsem academy",
    "bca b.tech computer science notes",
    "mern stack tutorial hindi",
    "next.js course free",
    "dsa course hindi free",
    "web development course for beginners india",
    "multilingual coding platform india",
    "python tutorial hindi free",
    "mongodb tutorial hindi",
    "typescript course free hindi",
    "devops docker course hindi",
    "sql database tutorial hindi",
    "git github tutorial hindi free",
    "system design course hindi",
    "windows cmd cli tutorial hindi",
  ],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Nextsem Academy — India's #1 Free Multilingual Full Stack Platform",
    description: "Learn Full Stack Web Development FREE in Hindi, Hinglish & English. HTML, CSS, JS, React, Node.js, Next.js, Python, DSA, SQL, MongoDB & more — interactive lessons with MCQ quizzes.",
    url: "https://nextsem.online",
    siteName: "Nextsem Academy",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Nextsem Academy — Free Full Stack Web Dev in Hindi" }],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    site: "@nextsem",
    title: "Nextsem Academy — Free Full Stack Course in Hindi & English",
    description: "India's #1 multilingual coding platform. Learn HTML, React, Node.js, Python, DSA & more for FREE!",
    images: ["/og-image.png"],
  },
  verification: {
    google: "FjEmb6Ud3RTb754EJVil2PWI7iZoNiNs-C--fAatkzo",
  },
  alternates: {
    canonical: "https://nextsem.online",
  },
  category: "education",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "google-adsense-account": "ca-pub-4242865347895866",
  },
};


import Script from "next/script";
import { ThemeProvider } from "../components/ThemeProvider";
import { ProgressProvider } from "../context/ProgressContext";
import BottomNavigation from "../components/BottomNavigation";
import AndroidBackButtonHandler from "../components/AndroidBackButtonHandler";
import CookieBanner from "../components/CookieBanner";


import TranslateWidget from "../components/TranslateWidget";
import SearchWidget from "../components/SearchWidget";
import GlobalNavigationWidget from "../components/GlobalNavigationWidget";
import OnboardingTour from "../components/OnboardingTour";
import UpdateBanner from "../components/UpdateBanner";
import SplashScreen from "../components/SplashScreen";

import RateAppPrompt from "../components/RateAppPrompt";
import OfflineGuard from "../components/OfflineGuard";
import { FontScaleHydrator } from "../components/FontSizeControl";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${lora.variable} ${outfit.variable} min-h-full flex flex-col bg-background text-foreground transition-colors`}>
        {/* Anti-Crash Stylesheet recovery & Theme Auto-Initializer script */}
        <Script
          id="theme-anti-crash-initializer"
          src="/theme-init.js"
          strategy="beforeInteractive"
        />

        <Script
          id="amp-ad-script"
          async
          src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
          custom-element="amp-ad"
          strategy="afterInteractive"
        />

        {/* Google AdSense Verification */}
        <Script
          id="adsense-verification"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4242865347895866"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />


        <ThemeProvider
          attribute="class"
          themes={["dark"]}
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ProgressProvider>
            <FontScaleHydrator />
            <OfflineGuard />
            <SplashScreen />

            <RateAppPrompt />
            <UpdateBanner />
            {children}
            <CookieBanner />
            <AndroidBackButtonHandler />
            <TranslateWidget />
            <SearchWidget />
            <GlobalNavigationWidget />

            <BottomNavigation />
          </ProgressProvider>
        </ThemeProvider>
      </body>



    </html>
  );
}
