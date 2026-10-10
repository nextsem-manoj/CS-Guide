import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';
import 'models/models.dart';
import 'services/firestore_service.dart';
import 'services/admob_service.dart';
import 'services/update_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Safe Firebase initialization
  try {
    await Firebase.initializeApp(
      options: DefaultFirebaseOptions.currentPlatform,
    );
  } catch (e) {
    debugPrint('[Startup] Firebase initialization note: $e');
  }

  // Safe AdMob initialization
  try {
    await AdMobService().initialize();
  } catch (e) {
    debugPrint('[Startup] AdMob initialization note: $e');
  }

  runApp(const IgnouNextsemApp());
}

class IgnouNextsemApp extends StatelessWidget {
  const IgnouNextsemApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'IGNOU Nextsem Online - Solved Assignments & Lessons',
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark(useMaterial3: true).copyWith(
        scaffoldBackgroundColor: const Color(0xFF0F1E25), // Deep Dark Teal Slate
        cardColor: const Color(0xFF07101C),
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFF00D294), // Bright Mint Teal
          secondary: Color(0xFFFBBF24), // Golden Amber
          surface: Color(0xFF0B171D),
        ),
      ),
      home: const MainPortalScreen(),
    );
  }
}

class MainPortalScreen extends StatefulWidget {
  const MainPortalScreen({super.key});

  @override
  State<MainPortalScreen> createState() => _MainPortalScreenState();
}

class _MainPortalScreenState extends State<MainPortalScreen> {
  final FirestoreService _firestoreService = FirestoreService();
  final TextEditingController _searchController = TextEditingController();
  String _searchQuery = '';
  String _selectedType = 'ALL';

  // Calculator State
  final List<GradeSubject> _calculatorSubjects = [
    GradeSubject(code: 'BCS-011', name: 'Computer Basics', assignmentMarks: 85, teeMarks: 62, credits: 3),
    GradeSubject(code: 'BCS-012', name: 'Basic Mathematics', assignmentMarks: 78, teeMarks: 55, credits: 4),
    GradeSubject(code: 'FEG-02', name: 'English-2', assignmentMarks: 80, teeMarks: 68, credits: 4),
    GradeSubject(code: 'ECO-01', name: 'Business Org', assignmentMarks: 75, teeMarks: 58, credits: 4),
  ];

  @override
  void initState() {
    super.initState();
    _firestoreService.seedInitialData();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      UpdateService().checkGooglePlayUpdate(context);
      UpdateService().checkFirestoreUpdate(context);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            _buildHeader(context),
            _buildHeroSection(context),
            _buildResourceHubSection(context),
            _buildGradeCalculatorSection(context),
            _buildDeadlineSection(context),
            _buildFooter(context),
          ],
        ),
      ),
    );
  }

  // 1. HEADER & NAVIGATION BAR
  Widget _buildHeader(BuildContext context) {
    return Container(
      color: const Color(0xFF071019),
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(14),
                  color: const Color(0xFF0A161E),
                  border: Border.all(color: const Color(0xFF00B88A).withValues(alpha: 0.6)),
                ),
                child: const Icon(Icons.menu_book_rounded, color: Color(0xFFFBBF24), size: 22),
              ),
              const SizedBox(width: 14),
              const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Text(
                        'IGNOU ',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.w800,
                          color: Colors.white,
                        ),
                      ),
                      Text(
                        'NEXTSEM',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.w800,
                          color: Color(0xFF00D294),
                        ),
                      ),
                    ],
                  ),
                  Text(
                    'Free IGNOU BCA & MCA Lessons Portal',
                    style: TextStyle(fontSize: 11, color: Color(0xFF94A3B8)),
                  ),
                ],
              ),
            ],
          ),
          Row(
            children: [
              _navButton('Free Lessons', Icons.menu_book_rounded),
              _navButton('Assignments', Icons.description_rounded),
              _navButton('Grade Calculator', Icons.calculate_rounded),
              _navButton('Datesheet', Icons.event_rounded),
            ],
          )
        ],
      ),
    );
  }

  Widget _navButton(String label, IconData icon) {
    return Padding(
      padding: const EdgeInsets.only(left: 8.0),
      child: TextButton.icon(
        onPressed: () {},
        icon: Icon(icon, size: 16, color: const Color(0xFFFBBF24)),
        label: Text(
          label,
          style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.w600),
        ),
      ),
    );
  }

  // 2. HERO SECTION WITH MATCHING BUTTON THEME
  Widget _buildHeroSection(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(vertical: 60, horizontal: 24),
      decoration: const BoxDecoration(
        color: Color(0xFF0F1E25),
      ),
      child: Column(
        children: [
          // User Prompt Matching Theme Button: Start IGNOU BCA Free Lessons >
          InkWell(
            onTap: () {},
            borderRadius: BorderRadius.circular(30),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 22, vertical: 14),
              decoration: BoxDecoration(
                color: const Color(0xFF071019),
                borderRadius: BorderRadius.circular(30),
                border: Border.all(color: const Color(0xFF00B88A), width: 1.5),
                boxShadow: [
                  BoxShadow(
                    color: const Color(0xFF00B88A).withValues(alpha: 0.15),
                    blurRadius: 16,
                    spreadRadius: 2,
                  )
                ],
              ),
              child: const Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(Icons.menu_book_rounded, color: Color(0xFFFBBF24), size: 20),
                  SizedBox(width: 12),
                  Text(
                    'Start IGNOU BCA Free Lessons',
                    style: TextStyle(
                      color: Color(0xFF00D294),
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(width: 8),
                  Icon(Icons.chevron_right_rounded, color: Color(0xFFFBBF24), size: 20),
                ],
              ),
            ),
          ),

          const SizedBox(height: 28),
          const Text(
            'IGNOU Solved Assignments & Free Lessons',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 36,
              fontWeight: FontWeight.w800,
              color: Colors.white,
              letterSpacing: -0.5,
            ),
          ),
          const SizedBox(height: 12),
          const SizedBox(
            width: 650,
            child: Text(
              'Access 100% verified solved assignment PDFs, chapter-wise notes, and the official 30:70 IGNOU Grade Card Percentage Calculator.',
              textAlign: TextAlign.center,
              style: TextStyle(color: Color(0xFF94A3B8), fontSize: 15, height: 1.5),
            ),
          ),
          const SizedBox(height: 32),

          // Search Bar Box with Mint Accent Border
          Container(
            width: 650,
            padding: const EdgeInsets.all(6),
            decoration: BoxDecoration(
              color: const Color(0xFF071019),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFF00B88A).withValues(alpha: 0.5)),
            ),
            child: Row(
              children: [
                const SizedBox(width: 12),
                const Icon(Icons.search_rounded, color: Color(0xFF00D294)),
                const SizedBox(width: 12),
                Expanded(
                  child: TextField(
                    controller: _searchController,
                    onChanged: (val) {
                      setState(() {
                        _searchQuery = val;
                      });
                    },
                    style: const TextStyle(color: Colors.white, fontSize: 14),
                    decoration: const InputDecoration(
                      hintText: 'Search Subject Code (e.g. BCS-011, MCS-201, BCOC-131)...',
                      hintStyle: TextStyle(color: Color(0xFF64748B), fontSize: 13),
                      border: InputBorder.none,
                    ),
                  ),
                ),
                ElevatedButton(
                  onPressed: () {},
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF00B88A),
                    foregroundColor: Colors.black,
                    padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  child: const Text('Search', style: TextStyle(fontWeight: FontWeight.bold)),
                ),
              ],
            ),
          ),

          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text('Popular Subject Codes: ', style: TextStyle(color: Color(0xFF64748B), fontSize: 12)),
              ...['BCS-011', 'MCS-011', 'MCS-201', 'BCOC-131'].map(
                (code) => Padding(
                  padding: const EdgeInsets.only(right: 6),
                  child: InkWell(
                    onTap: () {
                      _searchController.text = code;
                      setState(() {
                        _searchQuery = code;
                      });
                    },
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: const Color(0xFF071019),
                        borderRadius: BorderRadius.circular(6),
                        border: Border.all(color: const Color(0xFF00B88A).withValues(alpha: 0.4)),
                      ),
                      child: Text(code, style: const TextStyle(color: Color(0xFF00D294), fontSize: 11, fontFamily: 'monospace', fontWeight: FontWeight.bold)),
                    ),
                  ),
                ),
              ),
            ],
          )
        ],
      ),
    );
  }

  // 3. FIRESTORE LIVE RESOURCE HUB SECTION
  Widget _buildResourceHubSection(BuildContext context) {
    return StreamBuilder<List<ResourceModel>>(
      stream: _firestoreService.getResourcesStream(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting && !snapshot.hasData) {
          return const Padding(
            padding: EdgeInsets.all(40.0),
            child: CircularProgressIndicator(color: Color(0xFF00D294)),
          );
        }

        final resourcesList = snapshot.data ?? [];
        final filtered = resourcesList.where((res) {
          final matchQuery = _searchQuery.isEmpty ||
              res.subjectCode.toLowerCase().contains(_searchQuery.toLowerCase()) ||
              res.title.toLowerCase().contains(_searchQuery.toLowerCase());
          final matchType = _selectedType == 'ALL' || res.type == _selectedType;
          return matchQuery && matchType;
        }).toList();

        return Container(
          constraints: const BoxConstraints(maxWidth: 1100),
          padding: const EdgeInsets.symmetric(vertical: 40, horizontal: 24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Text(
                            'IGNOU Study & Solved Materials',
                            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white),
                          ),
                          SizedBox(width: 8),
                          Icon(Icons.menu_book_rounded, color: Color(0xFFFBBF24), size: 22),
                        ],
                      ),
                      SizedBox(height: 4),
                      Text(
                        'Session-wise solved assignments, handbook notes, and PYQs.',
                        style: TextStyle(fontSize: 13, color: Color(0xFF94A3B8)),
                      ),
                    ],
                  ),
                  Row(
                    children: ['ALL', 'assignment', 'notes', 'pyq'].map((type) {
                      final isSelected = _selectedType == type;
                      return Padding(
                        padding: const EdgeInsets.only(left: 6),
                        child: ChoiceChip(
                          label: Text(type == 'ALL' ? 'All' : type.toUpperCase()),
                          selected: isSelected,
                          selectedColor: const Color(0xFF00B88A),
                          labelStyle: TextStyle(color: isSelected ? Colors.black : Colors.white, fontWeight: FontWeight.bold),
                          onSelected: (val) {
                            setState(() {
                              _selectedType = type;
                            });
                          },
                        ),
                      );
                    }).toList(),
                  ),
                ],
              ),
              const SizedBox(height: 24),

              // Grid of Resources
              GridView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
                  maxCrossAxisExtent: 350,
                  mainAxisExtent: 215,
                  crossAxisSpacing: 16,
                  mainAxisSpacing: 16,
                ),
                itemCount: filtered.length,
                itemBuilder: (context, index) {
                  final res = filtered[index];
                  return Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: const Color(0xFF071019),
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: const Color(0xFF00B88A).withValues(alpha: 0.4)),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                              decoration: BoxDecoration(
                                color: const Color(0xFF00B88A).withValues(alpha: 0.15),
                                borderRadius: BorderRadius.circular(6),
                              ),
                              child: Text(
                                res.subjectCode,
                                style: const TextStyle(color: Color(0xFF00D294), fontWeight: FontWeight.bold, fontSize: 12),
                              ),
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                              decoration: BoxDecoration(
                                color: const Color(0xFFFBBF24).withValues(alpha: 0.15),
                                borderRadius: BorderRadius.circular(20),
                              ),
                              child: Text(
                                res.statusBadge,
                                style: const TextStyle(color: Color(0xFFFBBF24), fontSize: 10, fontWeight: FontWeight.bold),
                              ),
                            ),
                          ],
                        ),
                        Text(
                          res.title,
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14),
                        ),
                        Text(
                          'Session: ${res.session} • Size: ${res.fileSize}',
                          style: const TextStyle(color: Color(0xFF64748B), fontSize: 11),
                        ),
                        ElevatedButton.icon(
                          onPressed: () {
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(
                                content: Text('Downloading ${res.title}...'),
                                backgroundColor: const Color(0xFF00B88A),
                              ),
                            );
                          },
                          icon: const Icon(Icons.download_rounded, size: 16),
                          label: const Text('Download PDF', style: TextStyle(fontWeight: FontWeight.bold)),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF00B88A),
                            foregroundColor: Colors.black,
                            minimumSize: const Size(double.infinity, 38),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                          ),
                        )
                      ],
                    ),
                  );
                },
              )
            ],
          ),
        );
      },
    );
  }

  // 4. IGNOU GRADE CARD CALCULATOR
  Widget _buildGradeCalculatorSection(BuildContext context) {
    double totalWeighted = 0;
    int totalCredits = 0;
    for (var s in _calculatorSubjects) {
      totalWeighted += (s.weightedScore * s.credits);
      totalCredits += s.credits;
    }
    final overallPercentage = totalCredits > 0 ? (totalWeighted / totalCredits) : 0.0;

    String division = 'Third Division (Pass)';
    if (overallPercentage >= 60) {
      division = 'First Division (1st Class)';
    } else if (overallPercentage >= 50) {
      division = 'Second Division (2nd Class)';
    }

    return Container(
      width: double.infinity,
      color: const Color(0xFF071019),
      padding: const EdgeInsets.symmetric(vertical: 50, horizontal: 24),
      child: Center(
        child: Container(
          constraints: const BoxConstraints(maxWidth: 1100),
          child: Column(
            children: [
              const Text(
                '30:70 IGNOU Grade Card Percentage Calculator',
                style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold, color: Colors.white),
              ),
              const SizedBox(height: 6),
              const Text(
                'Official Formula: Final Score = (Assignment Marks × 30%) + (TEE Exam Marks × 70%)',
                style: TextStyle(color: Color(0xFF94A3B8), fontSize: 13),
              ),
              const SizedBox(height: 32),

              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Left Table
                  Expanded(
                    flex: 7,
                    child: Container(
                      padding: const EdgeInsets.all(20),
                      decoration: BoxDecoration(
                        color: const Color(0xFF0F1E25),
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: const Color(0xFF00B88A).withValues(alpha: 0.4)),
                      ),
                      child: Column(
                        children: [
                          ..._calculatorSubjects.map((sub) => Padding(
                                padding: const EdgeInsets.only(bottom: 12.0),
                                child: Row(
                                  children: [
                                    Expanded(
                                      flex: 2,
                                      child: Text(sub.code, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13)),
                                    ),
                                    Expanded(
                                      flex: 3,
                                      child: Row(
                                        children: [
                                          const Text('Asg: ', style: TextStyle(color: Color(0xFF64748B), fontSize: 11)),
                                          SizedBox(
                                            width: 50,
                                            child: TextField(
                                              keyboardType: TextInputType.number,
                                              controller: TextEditingController(text: sub.assignmentMarks.toInt().toString()),
                                              onChanged: (v) => setState(() => sub.assignmentMarks = double.tryParse(v) ?? 0),
                                              style: const TextStyle(color: Colors.white, fontSize: 12),
                                              decoration: const InputDecoration(isDense: true),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                    Expanded(
                                      flex: 3,
                                      child: Row(
                                        children: [
                                          const Text('TEE: ', style: TextStyle(color: Color(0xFF64748B), fontSize: 11)),
                                          SizedBox(
                                            width: 50,
                                            child: TextField(
                                              keyboardType: TextInputType.number,
                                              controller: TextEditingController(text: sub.teeMarks.toInt().toString()),
                                              onChanged: (v) => setState(() => sub.teeMarks = double.tryParse(v) ?? 0),
                                              style: const TextStyle(color: Colors.white, fontSize: 12),
                                              decoration: const InputDecoration(isDense: true),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                    Text(
                                      '${sub.weightedScore.toStringAsFixed(1)}%',
                                      style: const TextStyle(color: Color(0xFF00D294), fontWeight: FontWeight.bold, fontSize: 13),
                                    )
                                  ],
                                ),
                              )),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(width: 20),

                  // Right Score Box
                  Expanded(
                    flex: 5,
                    child: Container(
                      padding: const EdgeInsets.all(24),
                      decoration: BoxDecoration(
                        color: const Color(0xFF0F1E25),
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: const Color(0xFF00B88A)),
                      ),
                      child: Column(
                        children: [
                          const Text('OVERALL PERCENTAGE', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 11, fontWeight: FontWeight.bold)),
                          const SizedBox(height: 8),
                          Text(
                            '${overallPercentage.toStringAsFixed(2)}%',
                            style: const TextStyle(fontSize: 42, fontWeight: FontWeight.w800, color: Color(0xFF00D294)),
                          ),
                          const SizedBox(height: 12),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                            decoration: BoxDecoration(
                              color: const Color(0xFFFBBF24).withValues(alpha: 0.15),
                              borderRadius: BorderRadius.circular(10),
                              border: Border.all(color: const Color(0xFFFBBF24).withValues(alpha: 0.4)),
                            ),
                            child: Text(
                              division,
                              style: const TextStyle(color: Color(0xFFFBBF24), fontWeight: FontWeight.bold, fontSize: 13),
                            ),
                          ),
                        ],
                      ),
                    ),
                  )
                ],
              )
            ],
          ),
        ),
      ),
    );
  }

  // 5. FIRESTORE LIVE DEADLINE SECTION
  Widget _buildDeadlineSection(BuildContext context) {
    return StreamBuilder<List<DeadlineModel>>(
      stream: _firestoreService.getDeadlinesStream(),
      builder: (context, snapshot) {
        final deadlines = snapshot.data ?? [];
        return Container(
          constraints: const BoxConstraints(maxWidth: 1100),
          padding: const EdgeInsets.symmetric(vertical: 40, horizontal: 24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('Academic Calendar & Exam Dates', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white)),
              const SizedBox(height: 16),
              Row(
                children: deadlines.map((dl) {
                  return Expanded(
                    child: Container(
                      margin: const EdgeInsets.only(right: 12),
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: const Color(0xFF071019),
                        borderRadius: BorderRadius.circular(14),
                        border: Border.all(color: const Color(0xFF00B88A).withValues(alpha: 0.4)),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(dl.category, style: const TextStyle(color: Color(0xFF00D294), fontSize: 11, fontWeight: FontWeight.bold)),
                          const SizedBox(height: 6),
                          Text(dl.title, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13)),
                          const SizedBox(height: 12),
                          Text('Due: ${dl.dueDate}', style: const TextStyle(color: Color(0xFFFBBF24), fontSize: 12, fontWeight: FontWeight.bold)),
                        ],
                      ),
                    ),
                  );
                }).toList(),
              )
            ],
          ),
        );
      },
    );
  }

  // 6. FOOTER
  Widget _buildFooter(BuildContext context) {
    return Container(
      color: const Color(0xFF050B10),
      padding: const EdgeInsets.symmetric(vertical: 30, horizontal: 24),
      child: const Center(
        child: Text(
          '© 2026 IGNOU Nextsem Online • Free BCA & MCA Lessons Portal',
          style: TextStyle(color: Color(0xFF64748B), fontSize: 12),
        ),
      ),
    );
  }
}
