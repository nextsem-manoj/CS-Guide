// AdMob helper disabled completely for ignou.nextsem.online

export async function ensureAdMobInitialized() {
  return;
}

export async function showBannerAd() {
  return;
}

export async function hideBannerAd() {
  return;
}

export async function prepareRewardedAd() {
  return false;
}

export async function showRewardedAd(onSuccess?: () => void, _onFailure?: () => void): Promise<boolean> {
  if (onSuccess) onSuccess();
  return true; // Auto-pass reward logic without showing ad
}

export async function prepareInterstitialAd() {
  return false;
}

export async function showInterstitialAd(onSuccess?: () => void): Promise<boolean> {
  if (onSuccess) onSuccess();
  return true;
}

export async function prepareAppOpenAd() {
  return false;
}

export async function showAppOpenAd(): Promise<boolean> {
  return true;
}
