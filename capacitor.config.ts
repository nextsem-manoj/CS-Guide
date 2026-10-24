import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'online.nextsem.csguide',
  appName: 'CSguide by Nextsem',
  webDir: 'mobile-shell',
  server: {
    // Load content from live production server instead of bundling 100MB+ of web assets
    // This keeps the AAB under 10MB while all features remain fully functional
    url: 'https://ignou-study-notes-by-nextsem.web.app',
    cleartext: false,
    androidScheme: 'https',
  },
  plugins: {
    GoogleAuth: {
      scopes: ["profile", "email"],
      clientId: "983453487133-2ffe4796abuhkbidvtc7mo8n8kvo82ir.apps.googleusercontent.com",
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
