import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class GamificationState extends ChangeNotifier {
  int _hearts = 5;
  int _streak = 0;
  int _points = 0;
  Set<String> _completedLevels = {};
  int _desktopStepIdx = 0;
  bool _isCertified = false;

  String _email = "";
  String _displayName = "";
  String _photoUrl = "";
  bool _isAuthenticated = false;

  int get hearts => _hearts;
  int get streak => _streak;
  int get points => _points;
  Set<String> get completedLevels => _completedLevels;
  int get desktopStepIdx => _desktopStepIdx;
  bool get isCertified => _isCertified;

  String get email => _email;
  String get displayName => _displayName;
  String get photoUrl => _photoUrl;
  bool get isAuthenticated => _isAuthenticated;

  GamificationState() {
    loadFromPrefs();
  }

  Future<void> loadFromPrefs() async {
    final prefs = await SharedPreferences.getInstance();
    _email = prefs.getString('user_email') ?? "";
    _displayName = prefs.getString('user_name') ?? "";
    _photoUrl = prefs.getString('user_photo') ?? "";
    _isAuthenticated = prefs.getBool('user_auth') ?? false;

    final keySuffix = _email.isNotEmpty ? _email : "guest";
    _hearts = prefs.getInt('hearts_$keySuffix') ?? 5;
    _streak = prefs.getInt('streak_$keySuffix') ?? 0;
    _points = prefs.getInt('points_$keySuffix') ?? 0;
    _completedLevels = (prefs.getStringList('completed_$keySuffix') ?? []).toSet();
    _desktopStepIdx = prefs.getInt('desktop_idx_$keySuffix') ?? 0;
    _isCertified = prefs.getBool('certified_$keySuffix') ?? false;

    notifyListeners();
  }

  Future<void> saveToPrefs() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('user_email', _email);
    await prefs.setString('user_name', _displayName);
    await prefs.setString('user_photo', _photoUrl);
    await prefs.setBool('user_auth', _isAuthenticated);

    final keySuffix = _email.isNotEmpty ? _email : "guest";
    await prefs.setInt('hearts_$keySuffix', _hearts);
    await prefs.setInt('streak_$keySuffix', _streak);
    await prefs.setInt('points_$keySuffix', _points);
    await prefs.setStringList('completed_$keySuffix', _completedLevels.toList());
    await prefs.setInt('desktop_idx_$keySuffix', _desktopStepIdx);
    await prefs.setBool('certified_$keySuffix', _isCertified);
  }

  Future<void> authenticate(String email, String name, String photo) async {
    _email = email;
    _displayName = name;
    _photoUrl = photo;
    _isAuthenticated = true;
    await saveToPrefs();
    await loadFromPrefs(); // Load progress associated with this email
  }

  Future<void> logout() async {
    _email = "";
    _displayName = "";
    _photoUrl = "";
    _isAuthenticated = false;
    await saveToPrefs();
    notifyListeners();
  }

  Future<void> addPoints(int p) async {
    _points += p;
    await saveToPrefs();
    notifyListeners();
  }

  Future<void> deductHearts(int h) async {
    _hearts = (_hearts - h).clamp(0, 5);
    await saveToPrefs();
    notifyListeners();
  }

  Future<void> replenishHearts() async {
    _hearts = 5;
    await saveToPrefs();
    notifyListeners();
  }

  Future<void> completeLevel(String id) async {
    _completedLevels.add(id);
    await saveToPrefs();
    notifyListeners();
  }

  Future<void> setDesktopStepIdx(int idx) async {
    _desktopStepIdx = idx;
    await saveToPrefs();
    notifyListeners();
  }

  Future<void> completeCertification() async {
    _isCertified = true;
    await saveToPrefs();
    notifyListeners();
  }
}
