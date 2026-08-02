import 'dart:async';
import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:nextsem_mobile/data.dart';
import 'package:nextsem_mobile/state.dart';
import 'desktop_simulator_screen.dart';
import 'chapter_simulator_screen.dart';

class BootScreen extends StatefulWidget {
  final GamificationState state;
  final String chapterId;
  final String chapterTitle;

  const BootScreen({
    super.key,
    required this.state,
    required this.chapterId,
    required this.chapterTitle,
  });

  @override
  State<BootScreen> createState() => _BootScreenState();
}

class _BootScreenState extends State<BootScreen> with SingleTickerProviderStateMixin {
  late AnimationController _spinnerController;
  final List<String> _logs = [];
  int _logIndex = 0;
  Timer? _logTimer;

  final List<String> _stages = [
    "🚀 Initializing Windows Subsystem Core...",
    "📂 Mounting drive C:\\Users\\Admin...",
    "🔒 Verifying NTFS permissions & credentials...",
    "🟢 Running pre-boot compiler check...",
    "🎯 Loading Interactive Simulator..."
  ];

  @override
  void initState() {
    super.initState();
    _spinnerController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat();

    _startStaggeredLogs();
  }

  void _startStaggeredLogs() {
    _logTimer = Timer.periodic(const Duration(milliseconds: 600), (timer) {
      if (_logIndex < _stages.length) {
        setState(() {
          _logs.add(_stages[_logIndex]);
          _logIndex++;
        });
      } else {
        timer.cancel();
        _onBootComplete();
      }
    });
  }

  void _onBootComplete() {
    if (!mounted) return;

    // Redirection rule: If launching CLI first chapter and desktop steps are not complete, load DesktopSimulator.
    final totalDesktopSteps = desktopSimulatorSteps.length;
    final isCliFirstChapter = widget.chapterId == "cli-ch1-basics";

    if (isCliFirstChapter && widget.state.desktopStepIdx < totalDesktopSteps) {
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(
          builder: (context) => DesktopSimulatorScreen(state: widget.state),
        ),
      );
    } else {
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(
          builder: (context) => ChapterSimulatorScreen(
            state: widget.state,
            chapterId: widget.chapterId,
          ),
        ),
      );
    }
  }

  @override
  void dispose() {
    _spinnerController.dispose();
    _logTimer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: Colors.black,
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Spacer(),
              // ⊞ Windows 11 Styled Green Glowing Logo
              Container(
                width: 90,
                height: 90,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(12),
                  boxShadow: [
                    BoxShadow(
                      color: theme.colorScheme.primary.withOpacity(0.2),
                      blurRadius: 20,
                      spreadRadius: 2,
                    )
                  ],
                ),
                child: GridView.count(
                  crossAxisCount: 2,
                  mainAxisSpacing: 6,
                  crossAxisSpacing: 6,
                  physics: const NeverScrollableScrollPhysics(),
                  children: List.generate(
                    4,
                    (index) => Container(
                      decoration: BoxDecoration(
                        color: theme.colorScheme.primary,
                        borderRadius: BorderRadius.circular(2),
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 50),
              // Windows 11 Chasing Dots Orbit Spinner
              AnimatedBuilder(
                animation: _spinnerController,
                builder: (context, child) {
                  return Transform.rotate(
                    angle: _spinnerController.value * 2 * math.pi,
                    child: SizedBox(
                      width: 40,
                      height: 40,
                      child: Stack(
                        children: List.generate(5, (index) {
                          final angle = (index * 2 * math.pi / 5);
                          return Align(
                            alignment: Alignment(
                              math.cos(angle),
                              math.sin(angle),
                            ),
                            child: Container(
                              width: 6,
                              height: 6,
                              decoration: BoxDecoration(
                                color: theme.colorScheme.primary.withOpacity(1.0 - (index * 0.15)),
                                shape: BoxShape.circle,
                              ),
                            ),
                          );
                        }),
                      ),
                    ),
                  );
                },
              ),
              const Spacer(),
              // Staggered boot logs console
              Container(
                width: double.infinity,
                height: 160,
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: const Color(0xFF0C1328),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.white10),
                ),
                child: ListView.builder(
                  itemCount: _logs.length,
                  itemBuilder: (context, index) {
                    return Padding(
                      padding: const EdgeInsets.symmetric(vertical: 2.0),
                      child: Text(
                        _logs[index],
                        style: const TextStyle(
                          color: Color(0xFF39FF14),
                          fontFamily: 'Courier',
                          fontSize: 13,
                        ),
                      ),
                    );
                  },
                ),
              ),
              const SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }
}
