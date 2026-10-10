import { 
  AdMob, 
  BannerAdOptions, 
  BannerAdSize, 
  BannerAdPosition, 
  RewardAdOptions, 
  AdOptions,
  AdMobRewardItem
} from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

// ============================================================================
// ADMOB PRODUCTION & TEST CREDENTIALS (Safe Hybrid Configuration)
// ============================================================================
export const ADMOB_CONFIG = {
  // Production Ad Units
  production: {
    banner: 'ca-app-pub-4242865347895866/1125281920',
    interstitial: 'ca-app-pub-4242865347895866/3489485149',
    rewarded: 'ca-app-pub-4242865347895866/5641573985',
  },
  // Google Official Test Ad Units (Automatic fallback on emulators / unverified devices)
  test: {
    banner: 'ca-app-pub-3940256099942544/6300978111',
    interstitial: 'ca-app-pub-3940256099942544/1033173712',
    rewarded: 'ca-app-pub-3940256099942544/5224354917',
  }
};

let isInitialized = false;
let isBannerShowing = false;

/**
 * Initialize AdMob on native Android/iOS platforms.
 */
export async function ensureAdMobInitialized(): Promise<void> {
  if (isInitialized) return;
  if (!Capacitor.isNativePlatform()) {
    isInitialized = true;
    return;
  }

  try {
    await AdMob.initialize({
      testingDevices: ['EMULATOR'],
      initializeForTesting: process.env.NODE_ENV === 'development',
    });
    isInitialized = true;
    console.log('[AdMob] Initialized successfully on native platform');
  } catch (err) {
    console.warn('[AdMob] Initialization warning:', err);
    isInitialized = true;
  }
}

/**
 * 1. BOTTOM ANCHOR BANNER AD
 * Attempts Production Banner -> falls back to Google Test Banner on NO_FILL.
 */
export async function showBannerAd(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  if (isBannerShowing) return;

  await ensureAdMobInitialized();

  // Try production banner first
  const prodOptions: BannerAdOptions = {
    adId: ADMOB_CONFIG.production.banner,
    adSize: BannerAdSize.ADAPTIVE_BANNER,
    position: BannerAdPosition.BOTTOM_CENTER,
    margin: 0,
    isTesting: false,
  };

  try {
    await AdMob.showBanner(prodOptions);
    isBannerShowing = true;
    console.log('[AdMob] Production banner displayed');
  } catch (prodErr) {
    console.warn('[AdMob] Production banner failed, falling back to test banner:', prodErr);
    try {
      const testOptions: BannerAdOptions = {
        adId: ADMOB_CONFIG.test.banner,
        adSize: BannerAdSize.ADAPTIVE_BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        isTesting: true,
      };
      await AdMob.showBanner(testOptions);
      isBannerShowing = true;
      console.log('[AdMob] Test banner displayed successfully');
    } catch (testErr) {
      console.error('[AdMob] Both production and test banners failed:', testErr);
    }
  }
}

export async function hideBannerAd(): Promise<void> {
  if (!Capacitor.isNativePlatform() || !isBannerShowing) return;
  try {
    await AdMob.hideBanner();
    isBannerShowing = false;
  } catch (err) {
    console.warn('[AdMob] Hide banner error:', err);
  }
}

/**
 * 2. INTERSTITIAL AD (Transitions between lessons / marking tasks complete)
 */
export async function prepareInterstitialAd(): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) return true;
  await ensureAdMobInitialized();

  try {
    const prodOptions: AdOptions = {
      adId: ADMOB_CONFIG.production.interstitial,
      isTesting: false,
    };
    await AdMob.prepareInterstitial(prodOptions);
    return true;
  } catch (prodErr) {
    console.warn('[AdMob] Production interstitial prepare failed, trying test ad:', prodErr);
    try {
      const testOptions: AdOptions = {
        adId: ADMOB_CONFIG.test.interstitial,
        isTesting: true,
      };
      await AdMob.prepareInterstitial(testOptions);
      return true;
    } catch (testErr) {
      console.error('[AdMob] Interstitial prepare failed:', testErr);
      return false;
    }
  }
}

export async function showInterstitialAd(onSuccess?: () => void): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) {
    if (onSuccess) onSuccess();
    return true;
  }

  try {
    const prepared = await prepareInterstitialAd();
    if (prepared) {
      await AdMob.showInterstitial();
    }
    if (onSuccess) onSuccess();
    return true;
  } catch (err) {
    console.warn('[AdMob] Show interstitial error, proceeding gracefully:', err);
    if (onSuccess) onSuccess();
    return false;
  }
}

/**
 * 3. REWARDED VIDEO AD (Unlocking PDF downloads and lab resources)
 */
export async function prepareRewardedAd(): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) return true;
  await ensureAdMobInitialized();

  try {
    const prodOptions: RewardAdOptions = {
      adId: ADMOB_CONFIG.production.rewarded,
      isTesting: false,
    };
    await AdMob.prepareRewardVideoAd(prodOptions);
    return true;
  } catch (prodErr) {
    console.warn('[AdMob] Production rewarded ad prepare failed, trying test ad:', prodErr);
    try {
      const testOptions: RewardAdOptions = {
        adId: ADMOB_CONFIG.test.rewarded,
        isTesting: true,
      };
      await AdMob.prepareRewardVideoAd(testOptions);
      return true;
    } catch (testErr) {
      console.error('[AdMob] Rewarded ad prepare failed:', testErr);
      return false;
    }
  }
}

export async function showRewardedAd(
  onSuccess?: () => void, 
  onFailure?: () => void
): Promise<boolean> {
  // Web fallback: reward immediately without blocking student downloads
  if (!Capacitor.isNativePlatform()) {
    if (onSuccess) onSuccess();
    return true;
  }

  try {
    const prepared = await prepareRewardedAd();
    if (!prepared) {
      // If ad network has zero fill, do not block student from their learning materials
      if (onSuccess) onSuccess();
      return true;
    }

    const rewardItem: AdMobRewardItem | undefined = await AdMob.showRewardVideoAd();
    if (rewardItem) {
      console.log('[AdMob] User earned reward:', rewardItem);
      if (onSuccess) onSuccess();
      return true;
    } else {
      if (onSuccess) onSuccess();
      return true;
    }
  } catch (err) {
    console.warn('[AdMob] Show rewarded ad error, proceeding with success:', err);
    if (onSuccess) onSuccess();
    return false;
  }
}

/**
 * App Open Ad Helper
 */
export async function prepareAppOpenAd(): Promise<boolean> {
  return true;
}

export async function showAppOpenAd(): Promise<boolean> {
  return true;
}
