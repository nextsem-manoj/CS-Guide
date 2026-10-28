# 🌐 Hosting CS-Guide on `cs.nextsem.online`

Yeh step-by-step setup guide hai taaki aapka **CS-Guide** repository directly **`https://cs.nextsem.online`** par live serve ho.

---

## 🚀 1. Codebase Updates (Already Completed ✅)

* **Root Metadata Base**: [`src/app/layout.tsx`](file:///c:/Users/Manoj/Nextsem%20Repositories/CS-Guide/src/app/layout.tsx) set to `https://cs.nextsem.online`.
* **Sitemap & Robots**: [`src/app/sitemap.ts`](file:///c:/Users/Manoj/Nextsem%20Repositories/CS-Guide/src/app/sitemap.ts) and [`src/app/robots.ts`](file:///c:/Users/Manoj/Nextsem%20Repositories/CS-Guide/src/app/robots.ts) point to `https://cs.nextsem.online/sitemap.xml`.
* **Canonical URLs & OpenGraph**: All 16+ pages, dynamic routes, lesson clients, and WhatsApp/Mobile companion bars updated to `https://cs.nextsem.online`.

---

## ⚡ 2. Firebase Console Configuration (2 Minutes)

1. Open [Firebase Console](https://console.firebase.google.com/).
2. Project select karein: **`ignou-study-notes-by-nextsem`**.
3. Left sidebar me **Build** ❯ **Hosting** par click karein.
4. **Domains** card ke andar **"Add custom domain"** button par click karein.
5. Domain input field me type karein:
   ```
   cs.nextsem.online
   ```
6. *(Important)* "Redirect `cs.nextsem.online` to an existing website" ko **UNCHECKED** rakhein (kyunki hume ispar apna actual CS content host karna hai).
7. **Continue** par click karein. Firebase aapko ek DNS verification value dikhayega (usually CNAME ya A record).

---

## 📡 3. DNS Provider Configuration (Where `nextsem.online` is managed)

Aapka `nextsem.online` jahan par bhi registered/managed hai (Cloudflare, GoDaddy, Hostinger, Namecheap):

1. **DNS Management / Zone Editor** me jaayein.
2. **Add New Record** par click karein:
   * **Type**: `CNAME`
   * **Name / Host**: `cs`
   * **Target / Value**: `ignou-study-notes-by-nextsem.web.app` (ya Firebase console me jo target/IP diya ho)
   * **TTL**: Auto ya `3600`
3. *(Agar Cloudflare use kar rahe hain)*: Proxy Status ko **DNS Only** (Gray Cloud ☁️) par set karein taaki Firebase Let's Encrypt SSL certificate issue kar sake.

---

## 🔒 4. Free SSL & Activation

* DNS record add karne ke 5-15 minute ke andar Firebase verification complete kar lega.
* Firebase automatic free Google SSL certificate provision karega.
* Status **"Active / Connected"** ho jaayega.

---

## 📦 5. Deploy Production Build

Whenever you want to push updates to `cs.nextsem.online`:

```bash
cd "c:\Users\Manoj\Nextsem Repositories\CS-Guide"
npm run deploy:prod
```
