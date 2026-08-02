# NextSem Academy — Ad Placement Strategy & Roadmap (`ad_placement.md`)

## 📌 Executive Summary

NextSem Academy utilizes a **Smart Hybrid Ad Monetization Strategy**. Depending on the execution environment detected at runtime via `Capacitor.isNativePlatform()`, the application dynamically toggles between **Google AdSense** (for Web / PWA visitors) and **Google AdMob** (for native Android and iOS mobile app users).

---

## 🎯 Hybrid Platform Strategy Matrix

| Metric / Aspect | 🌐 Web Platform (`nextsem.online`) | 📱 Native Mobile App (Android / iOS) |
| :--- | :--- | :--- |
| **Ad Engine** | Google AdSense (HTML5 `adsbygoogle.js`) | Google AdMob (`@capacitor-community/admob`) |
| **Detection Method** | `!Capacitor.isNativePlatform()` | `Capacitor.isNativePlatform() === true` |
| **Rendering Mechanism** | Dynamic DOM `<ins class="adsbygoogle">` | Native Android/iOS System Overlays |
| **Banner Behavior** | Embedded in page grid with fallback adblock detection | Fixed Native `TOP_CENTER` overlay with `50px` padding adjustment |

---

## 📋 Active Production Ad Units & Credentials

### 1. Google AdMob Credentials (Native Mobile Apps)

* **Publisher Account ID**: `pub-4242865347895866`
* **Android Application ID**: `ca-app-pub-4242865347895866~7674001100` *(Configured in `AndroidManifest.xml`)*

| Ad Format | Purpose & Trigger | Active Production Ad Unit ID | Target Components |
| :--- | :--- | :--- | :--- |
| **Adaptive Banner** | Continuous revenue banner at top of viewport | `ca-app-pub-4242865347895866/1125281920` | [`AdSenseBanner.tsx`](file:///c:/jbrs-landing-page/src/components/AdSenseBanner.tsx) |
| **Rewarded Video** | Unlocks "Download Lesson PDF" feature | `ca-app-pub-4242865347895866/5641573985` | [`GitLessonClient.tsx`](file:///c:/jbrs-landing-page/src/components/GitLessonClient.tsx), [`CliLessonClient.tsx`](file:///c:/jbrs-landing-page/src/components/CliLessonClient.tsx), [`PaginatedSections.tsx`](file:///c:/jbrs-landing-page/src/components/PaginatedSections.tsx) |
| **Interstitial** | Displayed upon marking a lesson/chapter complete | `ca-app-pub-4242865347895866/3489485149` | [`MarkCompleteButton.tsx`](file:///c:/jbrs-landing-page/src/components/MarkCompleteButton.tsx) |

---

## 🏗️ Technical Component Implementation Details

### 1. Adaptive Native Banner (`AdSenseBanner.tsx`)
```typescript
if (isNative) {
  // Initialize and display native top-center banner
  await AdMob.initialize({});
  await AdMob.showBanner({
    adId: 'ca-app-pub-4242865347895866/1125281920',
    adSize: BannerAdSize.BANNER,
    position: BannerAdPosition.TOP_CENTER,
    margin: 0,
    isTesting: false
  });
  document.body.style.paddingTop = '50px';
}
```

### 2. Rewarded Video Ads (`GitLessonClient.tsx`, `CliLessonClient.tsx`)
```typescript
const handlePdfDownload = async () => {
  if (isNative) {
    await AdMob.prepareRewardVideoAd({
      adId: 'ca-app-pub-4242865347895866/5641573985',
      isTesting: false
    });
    
    let rewardEarned = false;
    const rewardListener = await AdMob.addListener('rewardedVideoReward', () => {
      rewardEarned = true;
    });

    const closeListener = await AdMob.addListener('rewardedVideoClosed', () => {
      rewardListener.remove();
      closeListener.remove();
      if (rewardEarned) triggerPdfPrint();
    });

    await AdMob.showRewardVideoAd();
  }
};
```

### 3. Interstitial Ads (`MarkCompleteButton.tsx`)
```typescript
const handleMarkComplete = async () => {
  if (isNative) {
    await AdMob.prepareInterstitial({
      adId: 'ca-app-pub-4242865347895866/3489485149',
      isTesting: false
    });
    await AdMob.showInterstitial();
  }
};
```

---

## 🚀 Roadmap for Future Ad Placement Optimizations

* `[ ]` **Phase 1: Frequency Capping for Interstitials**:
  - Implement a counter in `ProgressContext` to trigger interstitial ads every **3 completed lessons** instead of every lesson to maximize user retention.
* `[ ]` **Phase 2: App-Open Ad Integration**:
  - Add AdMob App-Open Ads during cold boot startup on native mobile builds.
* `[ ]` **Phase 3: Native In-Feed Native Advanced Ads**:
  - Integrate native custom templates inside card carousels in [`PaginatedSections.tsx`](file:///c:/jbrs-landing-page/src/components/PaginatedSections.tsx).
* `[ ]` **Phase 4: Ad Analytics & Fill Rate Monitoring**:
  - Connect Firebase Analytics events (`ad_impression`, `rewarded_video_complete`) to monitor fill rates and ARPU (Average Revenue Per User).

only on mobile and pwa also ad  permanent ad between the page in content space but it should not be obvious.
only on mobile and pwa also add a permanent ad at the bottom of the page in content space but it should not be obvious.
only on mobile and pwa i want to add ads after evry 1 lesson.
only on mobile and pwa that is after the page content is displayed then it should be displayed at the bottom of the page in content space but it should not be obvious.
only on mobile and pwa add app open ad.and make sure ad shoud not be obvious.