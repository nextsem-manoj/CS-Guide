import 'package:flutter/material.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';
import 'package:nextsem_mobile/screens/login_screen.dart';
import 'package:nextsem_mobile/screens/course_screen.dart';
import 'package:nextsem_mobile/state.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialize Google Mobile Ads SDK
  try {
    await MobileAds.instance.initialize();
  } catch (e) {
    debugPrint("MobileAds initialization failed: $e");
  }

  final state = GamificationState();
  // Wait a short moment to load preferences
  await state.loadFromPrefs();

  runApp(MyApp(state: state));
}

class MyApp extends StatelessWidget {
  final GamificationState state;

  const MyApp({super.key, required this.state});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Nextsem Academy',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        primaryColor: const Color(0xFF0C1328),
        scaffoldBackgroundColor: const Color(0xFF070B19),
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFF39FF14), // Glowing neon green
          surface: Color(0xFF0C1328),
        ),
      ),
      home: state.isAuthenticated
          ? CourseScreen(state: state)
          : LoginScreen(state: state),
    );
  }
}
