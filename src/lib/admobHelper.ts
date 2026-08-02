import { AdMob, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

// Official Google AdMob Test Ad Unit IDs (Guaranteed 100% Fill Rate on BlueStacks, Emulators, & Test Devices)
const TEST_REWARDED_ID = 'ca-app-pub-3940256099942544/5224354917';
const TEST_INTERSTITIAL_ID = 'ca-app-pub-3940256099942544/1033173712';
const TEST_APP_OPEN_ID = 'ca-app-pub-3940256099942544/9257395921';

// Production AdMob Unit IDs — v20 (2.3.0)
export const PROD_REWARDED_ID = 'ca-app-pub-4242865347895866/5641573985';
export const PROD_INTERSTITIAL_ID = 'ca-app-pub-4242865347895866/7073253343';
export const PROD_BANNER_ID = 'ca-app-pub-4242865347895866/6549409087';
export const PROD_REWARDED_INTERSTITIAL_ID = 'ca-app-pub-4242865347895866/7318318434'; // Rewarded Interstitial (BETA)
export const PROD_APP_OPEN_ID = 'ca-app-pub-4242865347895866/7054474411';              // App Open Ad

let isInitialized = false;
let isBannerShowing = false;

/**
 * Ensures AdMob SDK is initialized before any ad request.
 */
export async function ensureAdMobInitialized() {
  if (isInitialized) return;
  if (Capacitor.isNativePlatform()) {
    try {
      await AdMob.initialize({});
      isInitialized = true;
    } catch (e) {
      console.warn("AdMob SDK Initialization Notice:", e);
    }
  }
}

/**
 * Non-blocking safe banner display guard preventing native thread locks & UI freezing.
 */
export async function showBannerAd() {
  if (!Capacitor.isNativePlatform()) return;
  if (isBannerShowing) return;
  await ensureAdMobInitialized();
  try {
    isBannerShowing = true;
    await AdMob.showBanner({
      adId: PROD_BANNER_ID,
      adSize: BannerAdSize.BANNER,
      position: BannerAdPosition.TOP_CENTER,
      margin: 0,
      isTesting: false
    });
  } catch (e) {
    isBannerShowing = false;
    console.warn("Banner show notice:", e);
  }
}

/**
 * Safely hides active AdMob banner without UI thread locks.
 */
export async function hideBannerAd() {
  if (!Capacitor.isNativePlatform()) return;
  try {
    isBannerShowing = false;
    await AdMob.hideBanner();
  } catch (e) {}
}

/**
 * Shows a Rewarded Video Ad with automatic fallback for BlueStacks/test environments.
 */
export async function showRewardedAd(
  onRewardEarned: () => void,
  onAdClosed?: () => void
): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) return false;

  await ensureAdMobInitialized();

  // Hide banner while watching rewarded video ad
  hideBannerAd();

  let rewardGiven = false;

  // Register listeners
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rewardListener = await AdMob.addListener('rewardedVideoReward' as any, () => {
    rewardGiven = true;
    onRewardEarned();
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const closeListener = await AdMob.addListener('rewardedVideoClosed' as any, () => {
    try {
      rewardListener.remove();
      closeListener.remove();
    } catch (e) { console.error(e); }

    if (onAdClosed) onAdClosed();
  });

  // 1. Try Production Rewarded Ad ID first
  try {
    await AdMob.prepareRewardVideoAd({
      adId: PROD_REWARDED_ID,
      isTesting: false
    });
    await AdMob.showRewardVideoAd();
    return true;
  } catch (prodErr) {
    console.warn("Production Rewarded Ad failed (retrying with AdMob Test ID for BlueStacks/test fill):", prodErr);
    
    // 2. Fallback to official AdMob Test Rewarded ID for 100% fill on BlueStacks / Test devices
    try {
      await AdMob.prepareRewardVideoAd({
        adId: TEST_REWARDED_ID,
        isTesting: true
      });
      await AdMob.showRewardVideoAd();
      return true;
    } catch (testErr) {
      console.error("Test Rewarded Ad failed:", testErr);
      try {
        rewardListener.remove();
        closeListener.remove();
      } catch (e) { console.error(e); }
      return false;
    }
  }
}

/**
 * Shows an Interstitial Ad with automatic fallback for BlueStacks/test environments.
 */
export async function showInterstitialAd(): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) return false;

  await ensureAdMobInitialized();

  // Hide banner while watching interstitial ad
  hideBannerAd();

  try {
    await AdMob.prepareInterstitial({
      adId: PROD_INTERSTITIAL_ID,
      isTesting: false
    });
    await AdMob.showInterstitial();
    return true;
  } catch (prodErr) {
    console.warn("Production Interstitial Ad failed (retrying with AdMob Test ID):", prodErr);
    try {
      await AdMob.prepareInterstitial({
        adId: TEST_INTERSTITIAL_ID,
        isTesting: true
      });
      await AdMob.showInterstitial();
      return true;
    } catch (testErr) {
      console.error("Test Interstitial Ad failed:", testErr);
      return false;
    }
  }
}

/**
 * Shows an App Open Ad when the app launches (on SplashScreen dismiss).
 * Triggers only on native platform. Silently fails if no fill.
 */
export async function showAppOpenAd(): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) return false;

  await ensureAdMobInitialized();

  // App Open ads use the Interstitial API with the dedicated App Open ad unit
  try {
    await AdMob.prepareInterstitial({
      adId: PROD_APP_OPEN_ID,
      isTesting: false
    });
    await AdMob.showInterstitial();
    return true;
  } catch {
    // Try test App Open ID on emulators/test builds
    try {
      await AdMob.prepareInterstitial({
        adId: TEST_APP_OPEN_ID,
        isTesting: true
      });
      await AdMob.showInterstitial();
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * Shows a Rewarded Interstitial Ad (BETA) — rewards user without opt-in.
 * Ad Unit ID: ca-app-pub-4242865347895866/7054474411
 */
export async function showRewardedInterstitialAd(
  onRewardEarned: () => void,
  onAdClosed?: () => void
): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) return false;

  await ensureAdMobInitialized();

  let rewardGiven = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rewardListener = await AdMob.addListener('rewardedVideoReward' as any, () => {
    rewardGiven = true;
    onRewardEarned();
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const closeListener = await AdMob.addListener('rewardedVideoClosed' as any, () => {
    try {
      rewardListener.remove();
      closeListener.remove();
    } catch (e) { console.error(e); }
    if (onAdClosed) onAdClosed();
  });

  try {
    await AdMob.prepareRewardVideoAd({
      adId: PROD_REWARDED_INTERSTITIAL_ID,
      isTesting: false
    });
    await AdMob.showRewardVideoAd();
    return true;
  } catch (err) {
    console.warn('Rewarded Interstitial failed, falling back to standard Rewarded:', err);
    try {
      await AdMob.prepareRewardVideoAd({
        adId: TEST_REWARDED_ID,
        isTesting: true
      });
      await AdMob.showRewardVideoAd();
      return true;
    } catch {
      try { rewardListener.remove(); closeListener.remove(); } catch { /* noop */ }
      return false;
    }
  }
  // suppress lint: rewardGiven is used by the listener closure
  void rewardGiven;
}
