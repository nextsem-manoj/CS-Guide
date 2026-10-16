import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter, Lora, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ProgressProvider } from "@/context/ProgressContext";
import { GamificationProvider } from "@/context/GamificationContext";
import { StudentProgressProvider } from "@/context/StudentProgressContext";
import OfflineGuard from "@/components/OfflineGuard";
import { FontScaleHydrator } from "@/components/FontSizeControl";
import SplashScreen from "@/components/SplashScreen";
import GlobalNavigationWidget from "@/components/layout/GlobalNavigationWidget";
import BottomNavigation from "@/components/layout/BottomNavigation";
import SearchWidget from "@/components/SearchWidget";
import GoogleOneTapPrompt from "@/components/auth/GoogleOneTapPrompt";
import AndroidBackButtonHandler from "@/components/AndroidBackButtonHandler";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://ignou-study-notes-by-nextsem.web.app"),
  title: "CS Guide by NextSem | University Computer Science (BCA & MCA) | Er. Manoj Kumar",
  description: "Universal University Computer Science curriculum, line-by-line textbook units, practical coding labs, and interactive simulators for all CS students by Er. Manoj Kumar.",
  manifest: "/manifest.json",
  keywords: [
    "ignou",
    "ignou bca",
    "ignou bca free study materials",
    "ignou bca lessons",
    "ignou bca notes",
    "ignou bca solved assignments",
    "ignou bca 1st semester",
    "bcs-111 ignou computer basics",
    "bcs-011 ignou computer basics and pc software",
    "bcs-012 ignou basic mathematics",
    "bcsl-013 ignou software lab",
    "begla-136 ignou english",
    "bevae-181 ignou environmental studies",
    "ignou bca study hub online",
    "ignou study notes by er manoj kumar",
    "ignou bca previous year question papers",
    "ignou bca syllabus semester wise",
    "ignou online learning free"
  ],
  authors: [{ name: "Er. Manoj Kumar", url: "https://ignou-study-notes-by-nextsem.web.app" }],
  creator: "Er. Manoj Kumar",
  publisher: "Nextsem Academy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "CS Guide by NextSem | University Computer Science (BCA & MCA)",
    description: "Universal University Computer Science curriculum, textbook units, practical labs, and interactive simulators by Er. Manoj Kumar.",
    url: "https://ignou-study-notes-by-nextsem.web.app",
    siteName: "Nextsem Academy",
    images: [
      {
        url: "https://nextsem.online/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nextsem Academy - Multilingual Coding & IT Education Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IGNOU BCA 1st Semester Hub | Er. Manoj Kumar",
    description: "Bilingual IGNOU BCA 1st Semester courses, lab simulators, and interactive MCQs.",
    images: ["https://nextsem.online/og-image.png"],
    creator: "@nextsemacademy",
  },
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
  icons: {
    icon: "/icon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  viewportFit: "cover",
};

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,300..900;1,300..900&family=Source+Code+Pro:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${lora.variable} ${outfit.variable} min-h-full flex flex-col bg-background text-foreground transition-colors`}>
        {/* Anti-Crash Stylesheet recovery & Theme Auto-Initializer script */}
        <Script
          id="theme-anti-crash-initializer"
          src="/theme-init.js"
          strategy="beforeInteractive"
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="theme"
          disableTransitionOnChange
        >
          <ProgressProvider>
            <GamificationProvider>
              <StudentProgressProvider>
                <FontScaleHydrator />
                <OfflineGuard />
                <SplashScreen />
                <AndroidBackButtonHandler />

                {/* Global Sticky Navigation (Search bar + Subject Selector) */}
                <GlobalNavigationWidget />

                <div className="flex-1 w-full pb-20 md:pb-0">
                  {children}
                </div>

                <SearchWidget />
                <BottomNavigation />
                <GoogleOneTapPrompt />
              </StudentProgressProvider>
            </GamificationProvider>
          </ProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
