import 'package:flutter/foundation.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';

/// Nextsem CSguide Safe Hybrid AdMob Service
/// Automatically uses production ad unit IDs with fallback to Google test IDs on development/emulators.
class AdMobService {
  static final AdMobService _instance = AdMobService._internal();
  factory AdMobService() => _instance;
  AdMobService._internal();

  bool _isInitialized = false;

  // --- ADMOB CREDENTIALS ---
  static const String prodBannerId = 'ca-app-pub-4242865347895866/1125281920';
  static const String prodInterstitialId = 'ca-app-pub-4242865347895866/3489485149';
  static const String prodRewardedId = 'ca-app-pub-4242865347895866/5641573985';

  // Google Official Test IDs
  static const String testBannerId = 'ca-app-pub-3940256099942544/6300978111';
  static const String testInterstitialId = 'ca-app-pub-3940256099942544/1033173712';
  static const String testRewardedId = 'ca-app-pub-3940256099942544/5224354917';

  static String get bannerAdUnitId => kReleaseMode ? prodBannerId : testBannerId;
  static String get interstitialAdUnitId => kReleaseMode ? prodInterstitialId : testInterstitialId;
  static String get rewardedAdUnitId => kReleaseMode ? prodRewardedId : testRewardedId;

  InterstitialAd? _interstitialAd;
  RewardedAd? _rewardedAd;

  /// Initialize Mobile Ads SDK
  Future<void> initialize() async {
    if (_isInitialized) return;
    try {
      await MobileAds.instance.initialize();
      _isInitialized = true;
      loadInterstitialAd();
      loadRewardedAd();
      debugPrint('[AdMobService] Initialized successfully');
    } catch (e) {
      debugPrint('[AdMobService] Initialization error: $e');
    }
  }

  /// Create a Banner Ad instance
  BannerAd createBannerAd({
    required Function(Ad) onAdLoaded,
    required Function(Ad, LoadAdError) onAdFailedToLoad,
  }) {
    return BannerAd(
      adUnitId: bannerAdUnitId,
      size: AdSize.banner,
      request: const AdRequest(),
      listener: BannerAdListener(
        onAdLoaded: onAdLoaded,
        onAdFailedToLoad: (ad, error) {
          debugPrint('[AdMobService] Banner load failed: ${error.message}');
          onAdFailedToLoad(ad, error);
        },
      ),
    );
  }

  /// Preload Interstitial Ad
  void loadInterstitialAd() {
    InterstitialAd.load(
      adUnitId: interstitialAdUnitId,
      request: const AdRequest(),
      adLoadCallback: InterstitialAdLoadCallback(
        onAdLoaded: (ad) {
          _interstitialAd = ad;
          debugPrint('[AdMobService] Interstitial Ad loaded');
        },
        onAdFailedToLoad: (error) {
          _interstitialAd = null;
          debugPrint('[AdMobService] Interstitial Ad load failed: ${error.message}');
        },
      ),
    );
  }

  /// Show Interstitial Ad
  void showInterstitialAd({VoidCallback? onDismissed}) {
    if (_interstitialAd != null) {
      _interstitialAd!.fullScreenContentCallback = FullScreenContentCallback(
        onAdDismissedFullScreenContent: (ad) {
          ad.dispose();
          loadInterstitialAd();
          if (onDismissed != null) onDismissed();
        },
        onAdFailedToShowFullScreenContent: (ad, error) {
          ad.dispose();
          loadInterstitialAd();
          if (onDismissed != null) onDismissed();
        },
      );
      _interstitialAd!.show();
      _interstitialAd = null;
    } else {
      if (onDismissed != null) onDismissed();
      loadInterstitialAd();
    }
  }

  /// Preload Rewarded Ad
  void loadRewardedAd() {
    RewardedAd.load(
      adUnitId: rewardedAdUnitId,
      request: const AdRequest(),
      rewardedAdLoadCallback: RewardedAdLoadCallback(
        onAdLoaded: (ad) {
          _rewardedAd = ad;
          debugPrint('[AdMobService] Rewarded Ad loaded');
        },
        onAdFailedToLoad: (error) {
          _rewardedAd = null;
          debugPrint('[AdMobService] Rewarded Ad load failed: ${error.message}');
        },
      ),
    );
  }

  /// Show Rewarded Ad
  void showRewardedAd({
    required Function(RewardItem) onUserEarnedReward,
    VoidCallback? onDismissed,
  }) {
    if (_rewardedAd != null) {
      _rewardedAd!.fullScreenContentCallback = FullScreenContentCallback(
        onAdDismissedFullScreenContent: (ad) {
          ad.dispose();
          loadRewardedAd();
          if (onDismissed != null) onDismissed();
        },
        onAdFailedToShowFullScreenContent: (ad, error) {
          ad.dispose();
          loadRewardedAd();
          if (onDismissed != null) onDismissed();
        },
      );
      _rewardedAd!.show(
        onUserEarnedReward: (ad, reward) {
          debugPrint('[AdMobService] User earned reward: ${reward.amount} ${reward.type}');
          onUserEarnedReward(reward);
        },
      );
      _rewardedAd = null;
    } else {
      // If ad not ready, proceed gracefully without blocking the user
      onUserEarnedReward(RewardItem(1, 'download_unlocked'));
      if (onDismissed != null) onDismissed();
      loadRewardedAd();
    }
  }
}
