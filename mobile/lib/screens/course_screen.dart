import 'package:flutter/material.dart';
import 'package:nextsem_mobile/data.dart';
import 'package:nextsem_mobile/models.dart';
import 'package:nextsem_mobile/state.dart';
import 'boot_screen.dart';
import 'login_screen.dart';

class CourseScreen extends StatefulWidget {
  final GamificationState state;

  const CourseScreen({super.key, required this.state});

  @override
  State<CourseScreen> createState() => _CourseScreenState();
}

class _CourseScreenState extends State<CourseScreen> {
  late PageController _pageController;
  int _virtualIndex = 1000; // Big number for infinite scroll
  late int _activeCardIdx;

  @override
  void initState() {
    super.initState();
    _activeCardIdx = _virtualIndex % coursePhases.length;
    _pageController = PageController(
      initialPage: _virtualIndex,
      viewportFraction: 0.85,
    );
    widget.state.addListener(_onStateChange);
  }

  void _onStateChange() {
    if (mounted) setState(() {});
  }

  @override
  void dispose() {
    widget.state.removeListener(_onStateChange);
    _pageController.dispose();
    super.dispose();
  }

  void _handleLogout() async {
    await widget.state.logout();
    if (mounted) {
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(
          builder: (context) => LoginScreen(state: widget.state),
        ),
      );
    }
  }

  void _launchChapter(Topic topic) {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => BootScreen(
          state: widget.state,
          chapterId: topic.path,
          chapterTitle: topic.label,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final activePhase = coursePhases[_activeCardIdx];

    return Scaffold(
      backgroundColor: const Color(0xFF070B19),
      body: SafeArea(
        child: Column(
          children: [
            // 🏷️ Top Status Bar
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
              child: Row(
                children: [
                  // User Avatar & Name
                  GestureDetector(
                    onTap: () {
                      showDialog(
                        context: context,
                        builder: (context) => AlertDialog(
                          title: const Text("User Account"),
                          content: Text("Logged in as ${widget.state.displayName}\n(${widget.state.email})"),
                          actions: [
                            TextButton(
                              onPressed: () => Navigator.of(context).pop(),
                              child: const Text("Close"),
                            ),
                            TextButton(
                              onPressed: () {
                                Navigator.of(context).pop();
                                _handleLogout();
                              },
                              child: const Text("Logout", style: TextStyle(color: Colors.red)),
                            ),
                          ],
                        ),
                      );
                    },
                    child: Container(
                      padding: const EdgeInsets.all(2),
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        border: Border.all(color: theme.colorScheme.primary, width: 2),
                        boxShadow: [
                          BoxShadow(
                            color: theme.colorScheme.primary.withOpacity(0.3),
                            blurRadius: 8,
                          )
                        ],
                      ),
                      child: CircleAvatar(
                        radius: 18,
                        backgroundColor: const Color(0xFF0C1328),
                        backgroundImage: widget.state.photoUrl.isNotEmpty
                            ? NetworkImage(widget.state.photoUrl)
                            : null,
                        child: widget.state.photoUrl.isEmpty
                            ? Text(
                                widget.state.displayName.isNotEmpty
                                    ? widget.state.displayName[0]
                                    : "U",
                                style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                              )
                            : null,
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          widget.state.displayName.isNotEmpty ? widget.state.displayName : "Guest Developer",
                          style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14),
                        ),
                        const Text(
                          "Nextsem Academy Cadet",
                          style: TextStyle(color: Colors.white54, fontSize: 11),
                        ),
                      ],
                    ),
                  ),
                  // Stats: Keys, Energy, Coins
                  Row(
                    children: [
                      _buildStatItem("🔑", "${widget.state.completedLevels.length}"),
                      const SizedBox(width: 8),
                      _buildStatItem("🔥", "${widget.state.streak}"),
                      const SizedBox(width: 8),
                      _buildStatItem("🪙", "${widget.state.points}"),
                      const SizedBox(width: 8),
                      _buildStatItem("❤️", "${widget.state.hearts}"),
                    ],
                  ),
                ],
              ),
            ),

            const SizedBox(height: 10),

            // 📢 New Feature Banner Alert
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 16),
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: theme.colorScheme.primary.withOpacity(0.08),
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: theme.colorScheme.primary.withOpacity(0.3)),
              ),
              child: Row(
                children: [
                  const Text("📢", style: TextStyle(fontSize: 18)),
                  const SizedBox(width: 8),
                  const Expanded(
                    child: Text(
                      "App update! Pure native Flutter client launched. High-performance offline training active.",
                      style: TextStyle(color: Colors.white70, fontSize: 11),
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 16),

            // 🌀 Carousel Slider
            Expanded(
              child: PageView.builder(
                controller: _pageController,
                onPageChanged: (index) {
                  setState(() {
                    _virtualIndex = index;
                    _activeCardIdx = index % coursePhases.length;
                  });
                },
                itemBuilder: (context, index) {
                  final phase = coursePhases[index % coursePhases.length];
                  final colorHex = int.parse(phase.color);
                  final isActive = (index % coursePhases.length) == _activeCardIdx;

                  return AnimatedScale(
                    scale: isActive ? 1.0 : 0.9,
                    duration: const Duration(milliseconds: 200),
                    child: Card(
                      color: const Color(0xFF0C1328),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(16),
                        side: BorderSide(
                          color: isActive ? Color(colorHex) : Colors.white10,
                          width: isActive ? 2.5 : 1,
                        ),
                      ),
                      child: Container(
                        padding: const EdgeInsets.all(20.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.stretch,
                          children: [
                            Row(
                              children: [
                                Text(
                                  phase.icon,
                                  style: TextStyle(
                                    fontSize: 32,
                                    color: Color(colorHex),
                                  ),
                                ),
                                const SizedBox(width: 12),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        phase.title,
                                        style: const TextStyle(
                                          color: Colors.white,
                                          fontSize: 16,
                                          fontWeight: FontWeight.w900,
                                        ),
                                      ),
                                      Text(
                                        phase.duration,
                                        style: const TextStyle(
                                          color: Colors.white54,
                                          fontSize: 12,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                            const Divider(height: 30, color: Colors.white10),
                            const Text(
                              "OBJECTIVES IN THIS MODULE",
                              style: TextStyle(
                                color: Colors.white30,
                                fontSize: 10,
                                fontWeight: FontWeight.bold,
                                letterSpacing: 1.0,
                              ),
                            ),
                            const SizedBox(height: 10),
                            Expanded(
                              child: ListView.builder(
                                shrinkWrap: true,
                                physics: const NeverScrollableScrollPhysics(),
                                itemCount: phase.topics.length.clamp(0, 4),
                                itemBuilder: (context, topicIndex) {
                                  final topic = phase.topics[topicIndex];
                                  final isCompleted = widget.state.completedLevels.contains(topic.path);
                                  return Padding(
                                    padding: const EdgeInsets.symmetric(vertical: 4.0),
                                    child: Row(
                                      children: [
                                        Text(
                                          isCompleted ? "✓" : "•",
                                          style: TextStyle(
                                            color: isCompleted ? Colors.green : Colors.white30,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                        const SizedBox(width: 8),
                                        Expanded(
                                          child: Text(
                                            topic.label,
                                            style: TextStyle(
                                              color: isCompleted ? Colors.white30 : Colors.white70,
                                              fontSize: 13,
                                              decoration: isCompleted ? TextDecoration.lineThrough : null,
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  );
                                },
                              ),
                            ),
                            ElevatedButton(
                              onPressed: () {
                                _launchChapter(phase.topics.first);
                              },
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Color(colorHex),
                                foregroundColor: Colors.black,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(10),
                                ),
                                padding: const EdgeInsets.symmetric(vertical: 14),
                              ),
                              child: const Text(
                                "START MODULE",
                                style: TextStyle(fontWeight: FontWeight.bold),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),

            const SizedBox(height: 16),

            // 🏁 Level Checkpoint Nodes
            Container(
              padding: const EdgeInsets.symmetric(vertical: 12.0, horizontal: 16.0),
              color: const Color(0xFF0C1328),
              child: Column(
                children: [
                  Text(
                    "${activePhase.title} CHECKPOINTS",
                    style: const TextStyle(
                      color: Colors.white54,
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 1.0,
                    ),
                  ),
                  const SizedBox(height: 12),
                  SizedBox(
                    height: 50,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: List.generate(activePhase.topics.length, (topicIdx) {
                        final topic = activePhase.topics[topicIdx];
                        final isCompleted = widget.state.completedLevels.contains(topic.path);
                        final isActive = !isCompleted && 
                            (topicIdx == 0 || widget.state.completedLevels.contains(activePhase.topics[topicIdx - 1].path));
                        
                        Color borderCol = Colors.white10;
                        Color bgCol = Colors.transparent;
                        Widget child = Text(
                          "${topicIdx + 1}",
                          style: const TextStyle(color: Colors.white54, fontWeight: FontWeight.bold),
                        );

                        if (isCompleted) {
                          borderCol = Colors.green;
                          bgCol = Colors.green.withOpacity(0.2);
                          child = const Icon(Icons.check, color: Colors.green, size: 16);
                        } else if (isActive) {
                          borderCol = theme.colorScheme.primary;
                          bgCol = theme.colorScheme.primary.withOpacity(0.1);
                          child = Text(
                            "${topicIdx + 1}",
                            style: TextStyle(color: theme.colorScheme.primary, fontWeight: FontWeight.bold),
                          );
                        }

                        return Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 4.0),
                          child: InkWell(
                            onTap: (isCompleted || isActive) ? () => _launchChapter(topic) : null,
                            borderRadius: BorderRadius.circular(20),
                            child: Container(
                              width: 40,
                              height: 40,
                              decoration: BoxDecoration(
                                color: bgCol,
                                shape: BoxShape.circle,
                                border: Border.all(color: borderCol, width: 2),
                                boxShadow: isActive ? [
                                  BoxShadow(
                                    color: theme.colorScheme.primary.withOpacity(0.4),
                                    blurRadius: 6,
                                    spreadRadius: 1,
                                  )
                                ] : null,
                              ),
                              child: Center(child: child),
                            ),
                          ),
                        );
                      }),
                    ),
                  ),
                ],
              ),
            ),

            // 🧭 Bottom Navigation Bar
            Container(
              height: 56,
              decoration: const BoxDecoration(
                color: Color(0xFF0C1328),
                border: Border(top: BorderSide(color: Colors.white10)),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  _buildNavItem(Icons.home, "Home", true, theme),
                  _buildNavItem(Icons.book, "Courses", false, theme),
                  _buildNavItem(Icons.stars, "Premium", false, theme),
                  _buildNavItem(Icons.person, "You", false, theme),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatItem(String emoji, String text) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: const Color(0xFF0C1328),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: Colors.white10),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(emoji, style: const TextStyle(fontSize: 13)),
          const SizedBox(width: 4),
          Text(
            text,
            style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
          ),
        ],
      ),
    );
  }

  Widget _buildNavItem(IconData icon, String label, bool active, ThemeData theme) {
    final col = active ? theme.colorScheme.primary : Colors.white30;
    return InkWell(
      onTap: () {},
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, color: col, size: 20),
          const SizedBox(height: 2),
          Text(
            label,
            style: TextStyle(color: col, fontSize: 10, fontWeight: FontWeight.bold),
          ),
        ],
      ),
    );
  }
}
