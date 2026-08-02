import 'package:flutter/material.dart';
import 'package:nextsem_mobile/data.dart';
import 'package:nextsem_mobile/state.dart';
import 'chapter_simulator_screen.dart';

class DesktopSimulatorScreen extends StatefulWidget {
  final GamificationState state;

  const DesktopSimulatorScreen({super.key, required this.state});

  @override
  State<DesktopSimulatorScreen> createState() => _DesktopSimulatorScreenState();
}

class _DesktopSimulatorScreenState extends State<DesktopSimulatorScreen> {
  bool _startMenuOpen = false;
  bool _explorerOpen = false;
  bool _contextMenuOpen = false;
  Offset _contextMenuOffset = Offset.zero;

  bool _fileDeleted = false;
  bool _insideDocuments = false;

  final TextEditingController _searchController = TextEditingController();

  @override
  void initState() {
    super.initState();
    widget.state.addListener(_onStateChange);
  }

  void _onStateChange() {
    if (mounted) setState(() {});
  }

  @override
  void dispose() {
    widget.state.removeListener(_onStateChange);
    _searchController.dispose();
    super.dispose();
  }

  void _checkAction(String action, String targetId) {
    final currentStep = desktopSimulatorSteps[widget.state.desktopStepIdx];
    if (currentStep.action == action && currentStep.targetElement == targetId) {
      _advanceStep();
    }
  }

  void _advanceStep() {
    final nextIdx = widget.state.desktopStepIdx + 1;
    widget.state.addPoints(10);
    if (nextIdx < desktopSimulatorSteps.length) {
      widget.state.setDesktopStepIdx(nextIdx);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text("✓ Correct! ${desktopSimulatorSteps[widget.state.desktopStepIdx - 1].successMsg}"),
          backgroundColor: Colors.green,
          duration: const Duration(seconds: 2),
        ),
      );
    } else {
      // Completed all desktop steps
      widget.state.completeLevel("cli-ch1-basics-desktop");
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text("🏆 Congratulations! You mastered the Desktop basics. Moving to Terminal!"),
          backgroundColor: Colors.blueAccent,
        ),
      );
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(
          builder: (context) => ChapterSimulatorScreen(
            state: widget.state,
            chapterId: "cli-ch1-basics",
          ),
        ),
      );
    }
  }

  void _wrongAction() {
    widget.state.deductHearts(1);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: const Text("❌ Incorrect action! Keep trying."),
        backgroundColor: Colors.red,
        duration: const Duration(milliseconds: 800),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final currentStep = desktopSimulatorSteps[widget.state.desktopStepIdx];
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: const Color(0xFF070B19),
      body: Stack(
        children: [
          // 🖥️ Desktop Background Area
          GestureDetector(
            onTapDown: (details) {
              if (_contextMenuOpen) {
                setState(() {
                  _contextMenuOpen = false;
                });
                return;
              }
              _checkAction("click", "#desktop-bg");
            },
            onSecondaryTapDown: (details) {
              setState(() {
                _contextMenuOpen = true;
                _contextMenuOffset = details.globalPosition;
              });
              _checkAction("right-click", "#desktop-bg");
            },
            child: Container(
              color: Colors.transparent, // Capture taps
              width: double.infinity,
              height: double.infinity,
              child: Stack(
                children: [
                  // Desktop Icons grid
                  Positioned(
                    top: 150,
                    left: 20,
                    child: Column(
                      children: [
                        _buildDesktopIcon(
                          icon: Icons.computer,
                          label: "My Computer",
                          id: "#computer-icon",
                        ),
                        const SizedBox(height: 20),
                        _buildDesktopIcon(
                          icon: Icons.folder,
                          label: "File Explorer",
                          id: "#file-explorer-icon",
                          onDoubleTap: () {
                            setState(() {
                              _explorerOpen = true;
                            });
                            _checkAction("double-click", "#file-explorer-icon");
                          },
                        ),
                        const SizedBox(height: 20),
                        _buildRecycleBin(),
                      ],
                    ),
                  ),

                  // Draggable Text File project.txt
                  if (!_fileDeleted)
                    Positioned(
                      top: 150,
                      left: 120,
                      child: Draggable<String>(
                        data: "project_file",
                        feedback: Material(
                          color: Colors.transparent,
                          child: Opacity(
                            opacity: 0.7,
                            child: _buildDesktopIcon(
                              icon: Icons.description,
                              label: "project.txt",
                              id: "#file-project-txt",
                            ),
                          ),
                        ),
                        childWhenDragging: const SizedBox(width: 80, height: 80),
                        child: _buildDesktopIcon(
                          icon: Icons.description,
                          label: "project.txt",
                          id: "#file-project-txt",
                        ),
                      ),
                    ),
                ],
              ),
            ),
          ),

          // 📂 Mock File Explorer Window overlay
          if (_explorerOpen)
            Positioned(
              top: 100,
              left: 30,
              right: 30,
              bottom: 120,
              child: Card(
                color: const Color(0xFF0C1328),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                  side: const BorderSide(color: Colors.white10),
                ),
                child: Column(
                  children: [
                    // Title Bar
                    Container(
                      color: const Color(0xFF1C1C24),
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                      child: Row(
                        children: [
                          const Icon(Icons.folder, color: Colors.amber, size: 16),
                          const SizedBox(width: 8),
                          const Text("File Explorer", style: TextStyle(color: Colors.white, fontSize: 12)),
                          const Spacer(),
                          IconButton(
                            padding: EdgeInsets.zero,
                            constraints: const BoxConstraints(),
                            icon: const Icon(Icons.close, color: Colors.white54, size: 16),
                            onPressed: () {
                              setState(() {
                                _explorerOpen = false;
                                _insideDocuments = false;
                              });
                            },
                          ),
                        ],
                      ),
                    ),
                    // Navigation address bar
                    Container(
                      color: const Color(0xFF0F172E),
                      padding: const EdgeInsets.all(8),
                      child: Row(
                        children: [
                          const Icon(Icons.arrow_back, color: Colors.white54, size: 16),
                          const SizedBox(width: 8),
                          const Icon(Icons.arrow_forward, color: Colors.white54, size: 16),
                          const SizedBox(width: 8),
                          Expanded(
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                              decoration: BoxDecoration(
                                color: Colors.black26,
                                borderRadius: BorderRadius.circular(4),
                              ),
                              child: Text(
                                _insideDocuments ? "C:\\Users\\Admin\\Documents" : "C:\\Users\\Admin",
                                style: const TextStyle(color: Colors.white70, fontSize: 11),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    // Sidebar and content
                    Expanded(
                      child: Row(
                        children: [
                          // Left sidebar
                          Container(
                            width: 100,
                            color: const Color(0xFF0E162D),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.stretch,
                              children: [
                                _buildSidebarItem("📥 Downloads", false),
                                _buildSidebarItem("📄 Documents", _insideDocuments, onTap: () {
                                  setState(() {
                                    _insideDocuments = true;
                                  });
                                  _checkAction("click", "#documents-folder");
                                }),
                                _buildSidebarItem("🖼️ Pictures", false),
                              ],
                            ),
                          ),
                          // Content pane
                          Expanded(
                            child: Container(
                              color: const Color(0xFF070B19),
                              padding: const EdgeInsets.all(16),
                              child: _insideDocuments
                                  ? const Center(
                                      child: Text(
                                        "This folder is empty.",
                                        style: TextStyle(color: Colors.white30, fontSize: 12),
                                      ),
                                    )
                                  : GridView.count(
                                      crossAxisCount: 3,
                                      children: [
                                        GestureDetector(
                                          onTap: () {
                                            setState(() {
                                              _insideDocuments = true;
                                            });
                                            _checkAction("click", "#documents-folder");
                                          },
                                          child: Column(
                                            mainAxisSize: MainAxisSize.min,
                                            children: const [
                                              Icon(Icons.folder, color: Colors.amber, size: 40),
                                              Text("Documents", style: TextStyle(color: Colors.white, fontSize: 11)),
                                            ],
                                          ),
                                        ),
                                      ],
                                    ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),

          // 🪟 Windows Context Menu (Right Click)
          if (_contextMenuOpen)
            Positioned(
              top: _contextMenuOffset.dy,
              left: _contextMenuOffset.dx,
              child: Card(
                color: const Color(0xFF1C1C24),
                borderOnForeground: true,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(4),
                  side: const BorderSide(color: Colors.white10),
                ),
                child: Container(
                  width: 150,
                  padding: const EdgeInsets.symmetric(vertical: 4),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      _buildContextMenuItem("View"),
                      _buildContextMenuItem("Sort by"),
                      _buildContextMenuItem("Refresh"),
                      const Divider(color: Colors.white10, height: 8),
                      _buildContextMenuItem("New file"),
                    ],
                  ),
                ),
              ),
            ),

          // 📝 Top Dialog Card showing Active Step Instruction
          Positioned(
            top: 20,
            left: 20,
            right: 20,
            child: Card(
              color: const Color(0xFF0C1328).withOpacity(0.9),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
                side: BorderSide(color: theme.colorScheme.primary.withOpacity(0.5), width: 1.5),
              ),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Row(
                      children: [
                        Text(
                          "Step ${widget.state.desktopStepIdx + 1}/${desktopSimulatorSteps.length}",
                          style: TextStyle(
                            color: theme.colorScheme.primary,
                            fontWeight: FontWeight.bold,
                            fontSize: 12,
                          ),
                        ),
                        const Spacer(),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                          decoration: BoxDecoration(
                            color: Colors.white10,
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: Text(
                            currentStep.difficulty.toUpperCase(),
                            style: const TextStyle(color: Colors.white70, fontSize: 10),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Text(
                      currentStep.instruction,
                      style: const TextStyle(color: Colors.white, fontSize: 14, height: 1.4),
                    ),
                    const SizedBox(height: 12),
                    // MCQ Options
                    if (currentStep.action == "mcq" && currentStep.mcqOptions != null) ...[
                      Column(
                        children: currentStep.mcqOptions!.map((opt) {
                          return Padding(
                            padding: const EdgeInsets.symmetric(vertical: 4.0),
                            child: ElevatedButton(
                              onPressed: () {
                                if (opt.label == currentStep.correctOption) {
                                  _advanceStep();
                                } else {
                                  _wrongAction();
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
                              child: Text("[${opt.label}] ${opt.text}"),
                            ),
                          );
                        }).toList(),
                      ),
                    ],
                    Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        TextButton(
                          onPressed: () {
                            showDialog(
                              context: context,
                              builder: (context) => AlertDialog(
                                title: const Text("Objective Hint"),
                                content: Text(currentStep.hint),
                                actions: [
                                  TextButton(
                                    onPressed: () => Navigator.of(context).pop(),
                                    child: const Text("OK"),
                                  ),
                                ],
                              ),
                            );
                          },
                          child: const Text("Show Hint 💡"),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),

          // 🪟 Windows Taskbar at the bottom
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            child: GestureDetector(
              onTap: () {
                _checkAction("click", "#taskbar");
              },
              child: Container(
                height: 48,
                color: const Color(0xFF1C1C24),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    // Start Button (Windows logo)
                    GestureDetector(
                      onTap: () {
                        setState(() {
                          _startMenuOpen = !_startMenuOpen;
                        });
                        _checkAction("click", "#start-button");
                      },
                      child: Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: _startMenuOpen ? Colors.white10 : Colors.transparent,
                        ),
                        child: Icon(Icons.grid_view_rounded, color: theme.colorScheme.primary),
                      ),
                    ),
                    const SizedBox(width: 10),
                    // Taskbar Pinned Icons
                    const Icon(Icons.search, color: Colors.white70),
                    const SizedBox(width: 16),
                    const Icon(Icons.tab, color: Colors.white70),
                  ],
                ),
              ),
            ),
          ),

          // 🎛️ Windows 11 Start Menu Overlay
          if (_startMenuOpen)
            Positioned(
              bottom: 56,
              left: 20,
              right: 20,
              child: Card(
                color: const Color(0xFF1C1C24),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                  side: const BorderSide(color: Colors.white10),
                ),
                child: Container(
                  height: 300,
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    children: [
                      // Search Bar
                      TextField(
                        controller: _searchController,
                        onChanged: (text) {
                          if (text.trim().toLowerCase() == "cmd") {
                            _checkAction("keyboard", "#start-search-input");
                          }
                        },
                        style: const TextStyle(color: Colors.white),
                        decoration: InputDecoration(
                          hintText: "Search apps, settings, and files...",
                          hintStyle: const TextStyle(color: Colors.white30),
                          prefixIcon: const Icon(Icons.search, color: Colors.white54),
                          fillColor: Colors.black26,
                          filled: true,
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(8),
                            borderSide: BorderSide.none,
                          ),
                        ),
                      ),
                      const SizedBox(height: 16),
                      // Pinned Apps
                      Expanded(
                        child: GridView.count(
                          crossAxisCount: 4,
                          children: [
                            _buildStartMenuItem(Icons.terminal, "CMD"),
                            _buildStartMenuItem(Icons.settings, "Settings"),
                            _buildStartMenuItem(Icons.web, "Edge"),
                            _buildStartMenuItem(Icons.edit, "Notepad"),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildDesktopIcon({
    required IconData icon,
    required String label,
    required String id,
    VoidCallback? onDoubleTap,
  }) {
    return GestureDetector(
      onTap: () {
        _checkAction("click", id);
      },
      onDoubleTap: onDoubleTap,
      child: Container(
        width: 80,
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(8),
          color: Colors.transparent,
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, color: Colors.blueAccent, size: 36),
            const SizedBox(height: 4),
            Text(
              label,
              textAlign: TextAlign.center,
              style: const TextStyle(color: Colors.white, fontSize: 11),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildRecycleBin() {
    return DragTarget<String>(
      onAcceptWithDetails: (details) {
        if (details.data == "project_file") {
          setState(() {
            _fileDeleted = true;
          });
          _checkAction("drag", "#file-project-txt");
        }
      },
      builder: (context, candidateData, rejectedData) {
        final isHovered = candidateData.isNotEmpty;
        return Container(
          width: 80,
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(8),
            color: isHovered ? Colors.green.withOpacity(0.15) : Colors.transparent,
            border: isHovered ? Border.all(color: Colors.green) : null,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                Icons.delete_outline,
                color: isHovered ? Colors.green : Colors.redAccent,
                size: 36,
              ),
              const SizedBox(height: 4),
              const Text(
                "Recycle Bin",
                textAlign: TextAlign.center,
                style: TextStyle(color: Colors.white, fontSize: 11),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildContextMenuItem(String title) {
    return InkWell(
      onTap: () {
        setState(() {
          _contextMenuOpen = false;
        });
      },
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
        child: Text(title, style: const TextStyle(color: Colors.white70, fontSize: 12)),
      ),
    );
  }

  Widget _buildSidebarItem(String title, bool active, {VoidCallback? onTap}) {
    return InkWell(
      onTap: onTap,
      child: Container(
        color: active ? Colors.white10 : Colors.transparent,
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        child: Text(title, style: const TextStyle(color: Colors.white70, fontSize: 11)),
      ),
    );
  }

  Widget _buildStartMenuItem(IconData icon, String label) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(icon, color: Colors.white70, size: 28),
        const SizedBox(height: 4),
        Text(label, style: const TextStyle(color: Colors.white70, fontSize: 10)),
      ],
    );
  }
}
