class MCQOption {
  final String label; // e.g. "A"
  final String text;  // e.g. "Double-click"

  const MCQOption({
    required this.label,
    required this.text,
  });
}

class Topic {
  final String label;
  final String path;

  const Topic({
    required this.label,
    required this.path,
  });
}

class CoursePhase {
  final String id;
  final String title;
  final String duration;
  final String color;
  final String bulletColor;
  final String imageUrl;
  final String icon;
  final String path;
  final List<Topic> topics;

  const CoursePhase({
    required this.id,
    required this.title,
    required this.duration,
    required this.color,
    required this.bulletColor,
    required this.imageUrl,
    required this.icon,
    required this.path,
    required this.topics,
  });
}

class DesktopStep {
  final String id;
  final String title;
  final String category; // e.g. "desktop", "start-menu", "taskbar", "file-explorer", "terminal", "recycle-bin", "shortcuts"
  final String action;   // e.g. "click", "double-click", "right-click", "drag", "keyboard", "mcq"
  final String targetElement;
  final String difficulty; // e.g. "beginner", "easy", "medium"
  final String instruction;
  final String hint;
  final String successMsg;
  final int xpReward;
  final int heartPenalty;
  final List<MCQOption>? mcqOptions;
  final String? correctOption;
  final String? shortcut;
  final String? hintImage;

  const DesktopStep({
    required this.id,
    required this.title,
    required this.category,
    required this.action,
    required this.targetElement,
    required this.difficulty,
    required this.instruction,
    required this.hint,
    required this.successMsg,
    required this.xpReward,
    required this.heartPenalty,
    this.mcqOptions,
    this.correctOption,
    this.shortcut,
    this.hintImage,
  });
}

class ChapterLesson {
  final String id;
  final String title;
  final String type; // "terminal" | "mcq"
  final String instruction;
  final String expectedInput;
  final String hint;
  final String successMsg;
  final List<String>? suggestedCommands;
  final List<String>? options;
  final String? correctOption;
  final List<String>? outputs;
  final String? hintImage;

  const ChapterLesson({
    required this.id,
    required this.title,
    required this.type,
    required this.instruction,
    required this.expectedInput,
    required this.hint,
    required this.successMsg,
    this.suggestedCommands,
    this.options,
    this.correctOption,
    this.outputs,
    this.hintImage,
  });
}

class ChapterSimulator {
  final String chapterId;
  final String chapterTitle;
  final String icon;
  final List<ChapterLesson> lessons;

  const ChapterSimulator({
    required this.chapterId,
    required this.chapterTitle,
    required this.icon,
    required this.lessons,
  });
}
