class SubjectModel {
  final String id;
  final String code;
  final String name;
  final String program;
  final int semester;
  final int credits;

  SubjectModel({
    required this.id,
    required this.code,
    required this.name,
    required this.program,
    required this.semester,
    required this.credits,
  });
}

class ResourceModel {
  final String id;
  final String subjectCode;
  final String title;
  final String type; // 'assignment', 'notes', 'pyq'
  final String session;
  final String fileSize;
  final String statusBadge;
  final String downloadUrl;

  ResourceModel({
    required this.id,
    required this.subjectCode,
    required this.title,
    required this.type,
    required this.session,
    required this.fileSize,
    required this.statusBadge,
    required this.downloadUrl,
  });
}

class DeadlineModel {
  final String id;
  final String title;
  final String description;
  final String dueDate;
  final String category;
  final String status;
  final String officialUrl;

  DeadlineModel({
    required this.id,
    required this.title,
    required this.description,
    required this.dueDate,
    required this.category,
    required this.status,
    required this.officialUrl,
  });
}

class GradeSubject {
  String code;
  String name;
  double assignmentMarks;
  double teeMarks;
  int credits;

  GradeSubject({
    required this.code,
    required this.name,
    required this.assignmentMarks,
    required this.teeMarks,
    required this.credits,
  });

  double get weightedScore => (assignmentMarks * 0.3) + (teeMarks * 0.7);
}
