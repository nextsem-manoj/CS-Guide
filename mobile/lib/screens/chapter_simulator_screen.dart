import 'package:flutter/material.dart';
import 'package:nextsem_mobile/data.dart';
import 'package:nextsem_mobile/models.dart';
import 'package:nextsem_mobile/state.dart';
import 'course_screen.dart';

class ChapterSimulatorScreen extends StatefulWidget {
  final GamificationState state;
  final String chapterId;

  const ChapterSimulatorScreen({
    super.key,
    required this.state,
    required this.chapterId,
  });

  @override
  State<ChapterSimulatorScreen> createState() => _ChapterSimulatorScreenState();
}

class _ChapterSimulatorScreenState extends State<ChapterSimulatorScreen> {
  late ChapterSimulator _simulator;
  int _currentLessonIdx = 0;
  final List<String> _terminalHistory = [];
  final TextEditingController _inputController = TextEditingController();
  final FocusNode _terminalFocusNode = FocusNode();
  final ScrollController _scrollController = ScrollController();

  bool _isAnswerCorrect = false;
  bool _showHint = false;

  @override
  void initState() {
    super.initState();
    _simulator = chapterSimulators.firstWhere(
      (sim) => sim.chapterId == widget.chapterId,
      orElse: () => chapterSimulators.first,
    );
    _initializeLesson();
    widget.state.addListener(_onStateChange);
  }

  void _onStateChange() {
    if (mounted) setState(() {});
  }

  @override
  void dispose() {
    widget.state.removeListener(_onStateChange);
    _inputController.dispose();
    _terminalFocusNode.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  void _initializeLesson() {
    final lesson = _simulator.lessons[_currentLessonIdx];
    _terminalHistory.clear();
    _isAnswerCorrect = false;
    _showHint = false;

    // Load initial lesson outputs if defined
    if (lesson.outputs != null) {
      _terminalHistory.addAll(lesson.outputs!);
    }
  }

  void _executeCommand(String input) {
    final lesson = _simulator.lessons[_currentLessonIdx];
    final trimmedInput = input.trim();

    setState(() {
      _terminalHistory.add("C:\\Users\\Admin> $input");
      _inputController.clear();
    });

    if (trimmedInput.toLowerCase() == lesson.expectedInput.toLowerCase()) {
      // Correct!
      setState(() {
        _isAnswerCorrect = true;
        _terminalHistory.add("✓ Success: ${lesson.successMsg}");
      });
      widget.state.addPoints(20);
      _scrollTerminal();
    } else {
      // Incorrect!
      setState(() {
        _terminalHistory.add("❌ Error: Invalid command or argument. Try again.");
      });
      widget.state.deductHearts(1);
      _scrollTerminal();
    }
    _terminalFocusNode.requestFocus();
  }

  void _scrollTerminal() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 200),
          curve: Curves.easeOut,
        );
      }
    });
  }

  void _nextLesson() {
    final nextIdx = _currentLessonIdx + 1;
    if (nextIdx < _simulator.lessons.length) {
      setState(() {
        _currentLessonIdx = nextIdx;
        _initializeLesson();
      });
    } else {
      // Finished all lessons in this chapter
      widget.state.completeLevel(widget.chapterId);
      widget.state.addPoints(50);
      _showChapterCompletedDialog();
    }
  }

  void _showChapterCompletedDialog() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        backgroundColor: const Color(0xFF0C1328),
        title: const Text("🏆 Chapter Completed!", style: TextStyle(color: Colors.white)),
        content: Text(
          "Great job! You finished the '${_simulator.chapterTitle}' simulator and earned +50 XP! 🚀",
          style: const TextStyle(color: Colors.white70),
        ),
        actions: [
          ElevatedButton(
            onPressed: () {
              Navigator.of(context).pop(); // Dismiss dialog
              Navigator.of(context).pushReplacement(
                MaterialPageRoute(
                  builder: (context) => CourseScreen(state: widget.state),
                ),
              );
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF39FF14),
              foregroundColor: Colors.black,
            ),
            child: const Text("Back to Levels List 🏆", style: TextStyle(fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }

  TextSpan _formatHighlightText(String text, TextStyle baseStyle, Color highlightColor) {
    final List<TextSpan> children = [];
    final pattern = RegExp(r"[`']([^`']+)[`']");
    int lastMatchEnd = 0;

    for (final match in pattern.allMatches(text)) {
      if (match.start > lastMatchEnd) {
        children.add(TextSpan(text: text.substring(lastMatchEnd, match.start)));
      }
      children.add(
        TextSpan(
          text: match.group(1),
          style: TextStyle(
            color: highlightColor,
            fontWeight: FontWeight.bold,
            decoration: TextDecoration.underline,
            decorationColor: highlightColor,
            backgroundColor: highlightColor.withOpacity(0.12),
          ),
        ),
      );
      lastMatchEnd = match.end;
    }

    if (lastMatchEnd < text.length) {
      children.add(TextSpan(text: text.substring(lastMatchEnd)));
    }

    return TextSpan(style: baseStyle, children: children);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final lesson = _simulator.lessons[_currentLessonIdx];

    return Scaffold(
      backgroundColor: const Color(0xFF070B19),
      body: SafeArea(
        child: LayoutBuilder(
          builder: (context, constraints) {
            final isDesktop = constraints.maxWidth > 600;
            if (isDesktop) {
              return Row(
                children: [
                  // Left Textbook Panel (38%)
                  SizedBox(
                    width: constraints.maxWidth * 0.38,
                    child: _buildTextbookPanel(lesson, theme),
                  ),
                  const VerticalDivider(width: 1, color: Colors.white10),
                  // Right Terminal Panel (62%)
                  Expanded(
                    child: _buildTerminalPanel(lesson, theme, isDesktop: true),
                  ),
                ],
              );
            } else {
              // Mobile Stacked Panel (40% Textbook, 60% Terminal)
              return Column(
                children: [
                  SizedBox(
                    height: constraints.maxHeight * 0.38,
                    child: _buildTextbookPanel(lesson, theme),
                  ),
                  const Divider(height: 1, color: Colors.white10),
                  Expanded(
                    child: _buildTerminalPanel(lesson, theme, isDesktop: false),
                  ),
                ],
              );
            }
          },
        ),
      ),
    );
  }

  Widget _buildTextbookPanel(ChapterLesson lesson, ThemeData theme) {
    return Container(
      color: const Color(0xFF0C1328).withOpacity(0.4),
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Header Row with Exit & Lesson title
          Row(
            children: [
              IconButton(
                icon: const Icon(Icons.close, color: Colors.white70),
                onPressed: () {
                  Navigator.of(context).pushReplacement(
                    MaterialPageRoute(
                      builder: (context) => CourseScreen(state: widget.state),
                    ),
                  );
                },
              ),
              const SizedBox(width: 4),
              Expanded(
                child: Text(
                  lesson.title,
                  style: TextStyle(
                    color: theme.colorScheme.primary,
                    fontWeight: FontWeight.bold,
                    fontSize: 12,
                  ),
                ),
              ),
            ],
          ),
          const Divider(color: Colors.white10),
          Expanded(
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // Main instruction card
                  RichText(
                    text: _formatHighlightText(
                      lesson.instruction,
                      const TextStyle(color: Colors.white, fontSize: 14, height: 1.5),
                      theme.colorScheme.primary,
                    ),
                  ),
                  const SizedBox(height: 16),
                  if (lesson.type == "mcq" && lesson.options != null) ...[
                    const Text(
                      "CHOOSE THE CORRECT OPTION:",
                      style: TextStyle(color: Colors.white30, fontSize: 10, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 8),
                    ...lesson.options!.map((opt) {
                      final cleanOpt = opt.trim();
                      final optionLabel = cleanOpt.substring(cleanOpt.indexOf('[') + 1, cleanOpt.indexOf(']'));
                      return Padding(
                        padding: const EdgeInsets.symmetric(vertical: 4.0),
                        child: ElevatedButton(
                          onPressed: _isAnswerCorrect
                              ? null
                              : () {
                                  if (optionLabel == lesson.correctOption) {
                                    setState(() {
                                      _isAnswerCorrect = true;
                                      _terminalHistory.add("C:\\Users\\Admin> Option $optionLabel Selected");
                                      _terminalHistory.add("✓ Correct: ${lesson.successMsg}");
                                    });
                                    widget.state.addPoints(20);
                                  } else {
                                    setState(() {
                                      _terminalHistory.add("❌ Incorrect option selected. Try again!");
                                    });
                                    widget.state.deductHearts(1);
                                  }
                                },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF1C1C24),
                            foregroundColor: Colors.white,
                            alignment: Alignment.centerLeft,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(8),
                              side: const BorderSide(color: Colors.white10),
                            ),
                          ),
                          child: Text(cleanOpt),
                        ),
                      );
                    }),
                  ],
                ],
              ),
            ),
          ),
          // Show Hint area
          if (_showHint) ...[
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: theme.colorScheme.primary.withOpacity(0.08),
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: theme.colorScheme.primary.withOpacity(0.3)),
              ),
              child: Text(
                "💡 Hint: ${lesson.hint}",
                style: const TextStyle(color: Colors.white70, fontSize: 12),
              ),
            ),
            const SizedBox(height: 10),
          ],
          Row(
            children: [
              TextButton(
                onPressed: () {
                  setState(() {
                    _showHint = !_showHint;
                  });
                },
                child: Text(_showHint ? "Hide Hint" : "Show Hint 💡"),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildTerminalPanel(ChapterLesson lesson, ThemeData theme, {required bool isDesktop}) {
    return Container(
      color: Colors.black,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // 💻 Authentic Windows 11 Title Bar
          Container(
            color: const Color(0xFF1C1C24),
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Row(
              children: [
                const Icon(Icons.terminal, color: Colors.white70, size: 14),
                const SizedBox(width: 8),
                const Text(
                  "Command Prompt",
                  style: TextStyle(color: Colors.white70, fontSize: 11, fontFamily: 'monospace'),
                ),
                const Spacer(),
                // Minimize, Maximize, Close buttons
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 4),
                  child: const Text("‒", style: TextStyle(color: Colors.white54, fontSize: 10)),
                ),
                const SizedBox(width: 14),
                Container(
                  width: 8,
                  height: 8,
                  decoration: BoxDecoration(
                    border: Border.all(color: Colors.white54, width: 1.5),
                  ),
                ),
                const SizedBox(width: 14),
                GestureDetector(
                  onTap: () {
                    Navigator.of(context).pushReplacement(
                      MaterialPageRoute(
                        builder: (context) => CourseScreen(state: widget.state),
                      ),
                    );
                  },
                  child: const Text("✕", style: TextStyle(color: Colors.white54, fontSize: 12)),
                ),
              ],
            ),
          ),
          // History log
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(12.0),
              child: Scrollbar(
                controller: _scrollController,
                child: ListView.builder(
                  controller: _scrollController,
                  itemCount: _terminalHistory.length,
                  itemBuilder: (context, index) {
                    final line = _terminalHistory[index];
                    Color textCol = Colors.white;
                    if (line.startsWith("✓")) {
                      textCol = Colors.greenAccent;
                    } else if (line.startsWith("❌")) {
                      textCol = Colors.redAccent;
                    } else if (line.startsWith("C:")) {
                      textCol = Colors.white70;
                    }
                    return Padding(
                      padding: const EdgeInsets.symmetric(vertical: 3.0),
                      child: SelectableText(
                        line,
                        style: TextStyle(
                          color: textCol,
                          fontFamily: 'monospace',
                          fontSize: 16,
                          height: 1.4,
                        ),
                      ),
                    );
                  },
                ),
              ),
            ),
          ),
          // Input Prompt (if terminal command type)
          if (lesson.type == "terminal" && !_isAnswerCorrect) ...[
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12.0, vertical: 8.0),
              child: Row(
                children: [
                  const Text(
                    "C:\\Users\\Admin> ",
                    style: TextStyle(color: Colors.white70, fontFamily: 'monospace', fontSize: 16),
                  ),
                  Expanded(
                    child: TextField(
                      controller: _inputController,
                      focusNode: _terminalFocusNode,
                      cursorColor: theme.colorScheme.primary,
                      style: const TextStyle(
                        color: Colors.white,
                        fontFamily: 'monospace',
                        fontSize: 16,
                      ),
                      decoration: const InputDecoration(
                        isDense: true,
                        contentPadding: EdgeInsets.zero,
                        border: InputBorder.none,
                      ),
                      onSubmitted: _executeCommand,
                    ),
                  ),
                ],
              ),
            ),
          ],

          // 📏 Spacing Added Above Feedback Dock (20% height equivalent gap spacer)
          const SizedBox(height: 24),

          // 🏁 Feedback Dock
          if (_isAnswerCorrect)
            Container(
              color: const Color(0xFF0C1328),
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  const Text(
                    "✓ EXCELLENT! LESSON SOLVED",
                    style: TextStyle(color: Colors.greenAccent, fontWeight: FontWeight.bold, fontSize: 12),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    lesson.successMsg,
                    style: const TextStyle(color: Colors.white70, fontSize: 12),
                  ),
                  const SizedBox(height: 12),
                  ElevatedButton(
                    onPressed: _nextLesson,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: theme.colorScheme.primary,
                      foregroundColor: Colors.black,
                    ),
                    child: const Text("Next Lesson 🏆", style: TextStyle(fontWeight: FontWeight.bold)),
                  ),
                ],
              ),
            ),
        ],
      ),
    );
  }
}
