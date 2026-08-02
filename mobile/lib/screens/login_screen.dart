import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:nextsem_mobile/state.dart';
import 'course_screen.dart';

class LoginScreen extends StatefulWidget {
  final GamificationState state;

  const LoginScreen({super.key, required this.state});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  int _onboardingStep = 0;
  final GoogleSignIn _googleSignIn = GoogleSignIn(
    scopes: ['email', 'profile'],
  );

  final TextEditingController _mockEmailController = TextEditingController(text: "guest@nextsem.online");
  bool _showMockLogin = false;

  final List<Map<String, String>> _slides = [
    {
      "title": "Welcome to Nextsem Academy 🚀",
      "text": "The ultimate gamified platform to learn 🪟 Windows CMD commands, terminal scripting, and full-stack web development step-by-step.",
      "emoji": "💻"
    },
    {
      "title": "Bite-Sized Lessons & Quizzes 🧠",
      "text": "No boring textbooks! Learn with 3-sentence card sliders, interactive Command Prompt simulators, MCQs, and drag-and-drop challenges.",
      "emoji": "🎮"
    },
    {
      "title": "Earn XP & Maintain Streaks 🔥",
      "text": "Complete daily objectives, earn 🪙 points, protect your ⚡ streak, and manage your 5 ❤️ hearts.",
      "emoji": "🏆"
    }
  ];

  Future<void> _handleGoogleSignIn() async {
    try {
      if (kIsWeb || defaultTargetPlatform == TargetPlatform.windows) {
        // Fallback for non-supported platforms to mock sign-in
        setState(() {
          _showMockLogin = true;
        });
        return;
      }
      final GoogleSignInAccount? account = await _googleSignIn.signIn();
      if (account != null) {
        await widget.state.authenticate(
          account.email,
          account.displayName ?? "Developer",
          account.photoUrl ?? "",
        );
        _navigateToCourse();
      }
    } catch (error) {
      debugPrint("Google Sign-In error: $error");
      setState(() {
        _showMockLogin = true;
      });
    }
  }

  void _navigateToCourse() {
    Navigator.of(context).pushReplacement(
      MaterialPageRoute(
        builder: (context) => CourseScreen(state: widget.state),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final slide = _slides[_onboardingStep];

    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Color(0xFF0C1328),
              Color(0xFF070B19),
            ],
          ),
        ),
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const SizedBox(height: 20),
                Center(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        "NEXTSEM",
                        style: TextStyle(
                          fontSize: 28,
                          fontWeight: FontWeight.w900,
                          letterSpacing: 2.0,
                          color: theme.colorScheme.primary,
                        ),
                      ),
                      const SizedBox(width: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: theme.colorScheme.primary.withOpacity(0.15),
                          borderRadius: BorderRadius.circular(4),
                          border: Border.all(color: theme.colorScheme.primary),
                        ),
                        child: const Text(
                          "PRO",
                          style: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const Spacer(),
                // Animated Carousel Slide
                AnimatedSwitcher(
                  duration: const Duration(milliseconds: 300),
                  child: Column(
                    key: ValueKey<int>(_onboardingStep),
                    children: [
                      Text(
                        slide["emoji"]!,
                        style: const TextStyle(fontSize: 80),
                      ),
                      const SizedBox(height: 30),
                      Text(
                        slide["title"]!,
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
                      const SizedBox(height: 16),
                      Text(
                        slide["text"]!,
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                          fontSize: 16,
                          height: 1.5,
                          color: Colors.white70,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 30),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: List.generate(
                    _slides.length,
                    (index) => Container(
                      margin: const EdgeInsets.symmetric(horizontal: 4),
                      width: _onboardingStep == index ? 24 : 8,
                      height: 8,
                      decoration: BoxDecoration(
                        color: _onboardingStep == index
                            ? theme.colorScheme.primary
                            : Colors.white30,
                        borderRadius: BorderRadius.circular(4),
                      ),
                    ),
                  ),
                ),
                const Spacer(),
                if (_showMockLogin) ...[
                  TextField(
                    controller: _mockEmailController,
                    decoration: InputDecoration(
                      labelText: "Enter Developer Email",
                      labelStyle: const TextStyle(color: Colors.white70),
                      enabledBorder: OutlineInputBorder(
                        borderSide: const BorderSide(color: Colors.white30),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderSide: BorderSide(color: theme.colorScheme.primary),
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                    style: const TextStyle(color: Colors.white),
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: () async {
                      final email = _mockEmailController.text.trim();
                      if (email.isNotEmpty) {
                        await widget.state.authenticate(
                          email,
                          email.split('@')[0].toUpperCase(),
                          "",
                        );
                        _navigateToCourse();
                      }
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: theme.colorScheme.primary,
                      foregroundColor: Colors.black,
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                    child: const Text(
                      "Launch Sandbox Developer Mode",
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                  ),
                  const SizedBox(height: 10),
                  TextButton(
                    onPressed: () {
                      setState(() {
                        _showMockLogin = false;
                      });
                    },
                    child: const Text("Go Back"),
                  ),
                ] else ...[
                  Row(
                    children: [
                      if (_onboardingStep < _slides.length - 1) ...[
                        Expanded(
                          child: TextButton(
                            onPressed: () {
                              setState(() {
                                _onboardingStep = _slides.length - 1;
                              });
                            },
                            child: const Text(
                              "SKIP",
                              style: TextStyle(color: Colors.white54),
                            ),
                          ),
                        ),
                        Expanded(
                          child: ElevatedButton(
                            onPressed: () {
                              setState(() {
                                _onboardingStep++;
                              });
                            },
                            style: ElevatedButton.styleFrom(
                              backgroundColor: theme.colorScheme.primary.withOpacity(0.2),
                              foregroundColor: theme.colorScheme.primary,
                              side: BorderSide(color: theme.colorScheme.primary),
                              padding: const EdgeInsets.symmetric(vertical: 16),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                            ),
                            child: const Text("NEXT"),
                          ),
                        ),
                      ] else ...[
                        Expanded(
                          child: ElevatedButton(
                            onPressed: _handleGoogleSignIn,
                            style: ElevatedButton.styleFrom(
                              backgroundColor: theme.colorScheme.primary,
                              foregroundColor: Colors.black,
                              padding: const EdgeInsets.symmetric(vertical: 16),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                              elevation: 8,
                              shadowColor: theme.colorScheme.primary.withOpacity(0.5),
                            ),
                            child: const Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(Icons.login),
                                SizedBox(width: 8),
                                Text(
                                  "Google Sign-In",
                                  style: TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ],
                  ),
                ],
                const SizedBox(height: 20),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
