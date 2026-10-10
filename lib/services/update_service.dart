import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:in_app_update/in_app_update.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:url_launcher/url_launcher.dart';

/// Nextsem Dual Update Service:
/// 1. Google Play Official In-App Update API (Flexible & Immediate)
/// 2. Firestore Remote Config & In-App "What's New" Announcement Modal
class UpdateService {
  static final UpdateService _instance = UpdateService._internal();
  factory UpdateService() => _instance;
  UpdateService._internal();

  static const String currentAppVersion = '1.0.3';
  static const int currentVersionCode = 4;
  static const String playStoreUrl =
      'https://play.google.com/store/apps/details?id=online.nextsem.csguide';

  /// Check Google Play Store In-App Update API
  Future<void> checkGooglePlayUpdate(BuildContext context) async {
    if (kIsWeb || defaultTargetPlatform != TargetPlatform.android) return;

    try {
      final updateInfo = await InAppUpdate.checkForUpdate();
      if (updateInfo.updateAvailability == UpdateAvailability.updateAvailable) {
        if (updateInfo.immediateUpdateAllowed) {
          await InAppUpdate.performImmediateUpdate();
        } else if (updateInfo.flexibleUpdateAllowed) {
          await InAppUpdate.startFlexibleUpdate();
          await InAppUpdate.completeFlexibleUpdate();
        }
      }
    } catch (e) {
      // In-App Update API fails gracefully when app is not installed via Play Store (e.g. debug/local testing)
      debugPrint('[UpdateService] Google Play In-App Update check: $e');
    }
  }

  /// Check Firestore for Remote App Version and What's New Announcement
  Future<void> checkFirestoreUpdate(BuildContext context) async {
    try {
      final docRef = FirebaseFirestore.instance.collection('app_config').doc('version_info');
      final snapshot = await docRef.get();

      if (!snapshot.exists) {
        // Seed initial configuration in Firestore if missing
        await docRef.set({
          'latest_version': currentAppVersion,
          'version_code': currentVersionCode,
          'force_update': false,
          'title': '🎉 New CSguide Update Available',
          'features': [
            'Official AdMob Rewarded Learning Hub integration',
            'Full BCA & Computer Science curriculum with practical labs',
            'Offline lesson caching and performance boost',
          ],
          'play_store_url': playStoreUrl,
          'updated_at': FieldValue.serverTimestamp(),
        });
        return;
      }

      final data = snapshot.data();
      if (data == null) return;

      final String latestVersion = data['latest_version'] ?? currentAppVersion;
      final int latestVersionCode = data['version_code'] ?? currentVersionCode;
      final bool forceUpdate = data['force_update'] ?? false;
      final String title = data['title'] ?? 'New Update Available';
      final List<dynamic> features = data['features'] ?? [];
      final String storeUrl = data['play_store_url'] ?? playStoreUrl;

      // Show update modal if newer version exists
      if (latestVersionCode > currentVersionCode || _isVersionGreater(latestVersion, currentAppVersion)) {
        if (!context.mounted) return;
        _showUpdateDialog(
          context: context,
          title: title,
          latestVersion: latestVersion,
          features: features.map((e) => e.toString()).toList(),
          forceUpdate: forceUpdate,
          storeUrl: storeUrl,
        );
      }
    } catch (e) {
      debugPrint('[UpdateService] Firestore version check note: $e');
    }
  }

  /// Compare semver strings (e.g. "1.0.4" > "1.0.3")
  bool _isVersionGreater(String remote, String current) {
    try {
      final remoteParts = remote.split('.').map(int.parse).toList();
      final currentParts = current.split('.').map(int.parse).toList();
      for (int i = 0; i < remoteParts.length && i < currentParts.length; i++) {
        if (remoteParts[i] > currentParts[i]) return true;
        if (remoteParts[i] < currentParts[i]) return false;
      }
      return remoteParts.length > currentParts.length;
    } catch (_) {
      return false;
    }
  }

  /// Show Branded In-App Update Modal
  void _showUpdateDialog({
    required BuildContext context,
    required String title,
    required String latestVersion,
    required List<String> features,
    required bool forceUpdate,
    required String storeUrl,
  }) {
    showDialog(
      context: context,
      barrierDismissible: !forceUpdate,
      builder: (dialogCtx) {
        return PopScope(
          canPop: !forceUpdate,
          child: Dialog(
            backgroundColor: const Color(0xFF07101C),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(20),
              side: const BorderSide(color: Color(0xFF00D294), width: 1.5),
            ),
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: const Color(0xFF00D294).withValues(alpha: 0.15),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: const Icon(Icons.system_update_rounded, color: Color(0xFF00D294), size: 28),
                      ),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              title,
                              style: const TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                                fontSize: 17,
                              ),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              'Version $latestVersion is now live',
                              style: const TextStyle(color: Color(0xFFFBBF24), fontSize: 12, fontWeight: FontWeight.w600),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 18),
                  if (features.isNotEmpty) ...[
                    const Text(
                      'What’s New in this Release:',
                      style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 8),
                    ...features.map(
                      (feat) => Padding(
                        padding: const EdgeInsets.only(bottom: 6.0),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text('• ', style: TextStyle(color: Color(0xFF00D294), fontSize: 14, fontWeight: FontWeight.bold)),
                            Expanded(
                              child: Text(
                                feat,
                                style: const TextStyle(color: Colors.white, fontSize: 13, height: 1.3),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                  ],
                  Row(
                    children: [
                      if (!forceUpdate)
                        Expanded(
                          child: TextButton(
                            onPressed: () => Navigator.of(dialogCtx).pop(),
                            child: const Text('Later', style: TextStyle(color: Color(0xFF94A3B8))),
                          ),
                        ),
                      Expanded(
                        flex: forceUpdate ? 2 : 1,
                        child: ElevatedButton(
                          onPressed: () async {
                            final uri = Uri.parse(storeUrl);
                            if (await canLaunchUrl(uri)) {
                              await launchUrl(uri, mode: LaunchMode.externalApplication);
                            }
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF00D294),
                            foregroundColor: Colors.black,
                            padding: const EdgeInsets.symmetric(vertical: 12),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                          ),
                          child: const Text(
                            'Update Now',
                            style: TextStyle(fontWeight: FontWeight.bold),
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
