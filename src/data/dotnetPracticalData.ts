export interface DotnetSimpleTheory {
  plainEnglishSummary: string;
  howDotnetWorksUnderTheHood: string[];
  whyEnterprisesUseIt: string;
  goldenRules: string[];
  beginnerPitfalls: string[];
}

export interface DotnetSprint {
  sprintNumber: number;
  title: string;
  focus: string;
  daysRange: string;
  totalDays: number;
  startDaySlug: string;
  badge: string;
  icon: string;
  color: string;
  coreSkills: string[];
  practicalHighlights: string[];
}

export interface DotnetTask {
  id: string;
  title: string;
  instruction: string;
  hint: string;
  validatorKeywords?: string[];
}

export interface DotnetLesson {
  id: string;
  day: number;
  sprint: number;
  title: string;
  slug: string;
  category: string;
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  objectives: string[];
  concept: {
    overview: string;
    keyPoints: string[];
    analogy?: string;
    simpleTheory?: DotnetSimpleTheory;
  };
  teacherDemo: {
    title: string;
    explanation: string;
    code: string;
    language: 'csharp' | 'sql' | 'json';
  };
  practicalLab: {
    labTitle: string;
    labDescription: string;
    targetFolder: string;
    primaryFile: string;
    cliCommand: string;
    starterCode: string;
    solutionCode: string;
    tasks: DotnetTask[];
  };
  debuggingChallenge: {
    title: string;
    buggyCode: string;
    bugExplanation: string;
    fixedCode: string;
  };
  githubWorkflow: {
    repoName: string;
    commitMessage: string;
    commands: string[];
    tips: string;
  };
  vivaCheck: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
}

/* ══════════════════════════════════════════════════════════════════════════
   1. DOTNET 5-SPRINT ROADMAP METADATA
   ══════════════════════════════════════════════════════════════════════════ */
export const DOTNET_SPRINTS: DotnetSprint[] = [
  {
    sprintNumber: 1,
    title: 'Sprint 1 — C# 12 & .NET 9 Core Fundamentals',
    focus: 'Language Syntax, CLI, Modern OOP, Records, Generics, LINQ & Async',
    daysRange: 'Days 01 – 10',
    totalDays: 10,
    startDaySlug: 'day-01-dotnet-sdk-first-cli-app',
    badge: 'Core Foundation',
    icon: '⚡',
    color: 'from-blue-600/20 to-indigo-600/10 border-blue-500/40 text-blue-400',
    coreSkills: ['C# 12 Syntax', 'Top-Level Statements', 'Records & Structs', 'Pattern Matching', 'LINQ', 'Async/Await'],
    practicalHighlights: ['Console Apps', 'LINQ Query Engine', 'Thread-Safe Bank Ledger', 'File Stream Pipeline']
  },
  {
    sprintNumber: 2,
    title: 'Sprint 2 — Database Persistence & Entity Framework Core',
    focus: 'SQL Server, Code-First Migrations, Fluent API, CRUD & Repository Pattern',
    daysRange: 'Days 11 – 20',
    totalDays: 10,
    startDaySlug: 'day-11-efcore-dbcontext-models',
    badge: 'Data Layer',
    icon: '🗄️',
    color: 'from-cyan-600/20 to-blue-600/10 border-cyan-500/40 text-cyan-400',
    coreSkills: ['SQL Server', 'EF Core 9', 'Code-First Migrations', '1:N & M:N Relationships', 'Repository Pattern'],
    practicalHighlights: ['LocalDB Database Creation', 'Migration History Engine', 'Unit of Work Pattern', 'Database Seeding']
  },
  {
    sprintNumber: 3,
    title: 'Sprint 3 — Enterprise Web APIs with ASP.NET Core',
    focus: 'RESTful Controllers, Minimal APIs, Dependency Injection, JWT Auth & Swagger',
    daysRange: 'Days 21 – 30',
    totalDays: 10,
    startDaySlug: 'day-21-aspnet-core-web-api',
    badge: 'Backend APIs',
    icon: '🚀',
    color: 'from-purple-600/20 to-indigo-600/10 border-purple-500/40 text-purple-400',
    coreSkills: ['ASP.NET Core 9', 'Minimal APIs', 'Dependency Injection', 'JWT Tokens', 'FluentValidation', 'Swagger'],
    practicalHighlights: ['Secure Banking API', 'Role-Based Authentication', 'Global Exception Middleware', 'Rate Limiting']
  },
  {
    sprintNumber: 4,
    title: 'Sprint 4 — Full Stack .NET & Modern Frontends',
    focus: 'Blazor WebAssembly, SignalR Real-Time, Razor Pages & Background Services',
    daysRange: 'Days 31 – 40',
    totalDays: 10,
    startDaySlug: 'day-31-blazor-wasm-setup',
    badge: 'Full Stack',
    icon: '💻',
    color: 'from-emerald-600/20 to-teal-600/10 border-emerald-500/40 text-emerald-400',
    coreSkills: ['Blazor WASM', 'Two-Way Data Binding', 'SignalR Core', 'BackgroundService', 'Azure Blob Storage'],
    practicalHighlights: ['Live Collaborative Chat', 'Real-time Stock Dashboard', 'Scheduled Invoice Worker', 'Image Cloud Upload']
  },
  {
    sprintNumber: 5,
    title: 'Sprint 5 — Clean Architecture, Testing & Azure Cloud CI/CD',
    focus: 'Domain-Driven Clean Architecture, CQRS with MediatR, xUnit, Docker & Azure',
    daysRange: 'Days 41 – 50',
    totalDays: 10,
    startDaySlug: 'day-41-clean-architecture-cqrs-mediatr',
    badge: 'Enterprise Cloud',
    icon: '☁️',
    color: 'from-amber-600/20 to-orange-600/10 border-amber-500/40 text-amber-400',
    coreSkills: ['Clean Architecture', 'CQRS & MediatR', 'xUnit & Moq', 'Dockerization', 'GitHub Actions', 'Azure App Service'],
    practicalHighlights: ['Enterprise E-Commerce Microservice', 'Multi-Stage Docker Build', 'Automated GitHub Actions Pipeline', 'Production Cloud Deploy']
  }
];

/* ══════════════════════════════════════════════════════════════════════════
   2. 50-DAY DOTNET PRACTICAL LESSONS CATALOG
   ══════════════════════════════════════════════════════════════════════════ */
export const DOTNET_LESSONS: DotnetLesson[] = [
  {
    id: 'dotnet-day-01',
    day: 1,
    sprint: 1,
    title: 'Day 1: .NET 9 SDK, VS Code C# Dev Kit & First CLI App',
    slug: 'day-01-dotnet-sdk-first-cli-app',
    category: 'C# 12 & .NET CLI',
    estimatedTime: '2 Hours',
    difficulty: 'Beginner',
    objectives: [
      'Install .NET 9 SDK and verify dotnet --info in terminal',
      'Configure Visual Studio Code with the official C# Dev Kit extension',
      'Create a modern C# 12 console application using dotnet new console',
      'Understand Top-Level Statements and build your first CLI greetings engine'
    ],
    concept: {
      overview: '.NET 9 is Microsoft\'s flagship high-performance, cross-platform runtime for modern cloud, web, and desktop systems. With C# 12 top-level statements, unnecessary boilerplate is eliminated, allowing developer code to execute directly with minimal syntax.',
      keyPoints: [
        '.NET 9 SDK includes compiler, runtime, CLI tools, and Base Class Libraries (BCL)',
        'Top-level statements eliminate the classic class Program { static void Main() } ceremony',
        'dotnet run compiles in-memory and launches the application instantly',
        'dotnet build creates binary outputs in bin/Debug/net9.0/'
      ],
      analogy: 'Think of .NET 9 runtime as an ultra-fast Formula-1 engine. C# is the steering wheel, and the dotnet CLI is your command dashboard to start, test, and tune the vehicle.'
    },
    teacherDemo: {
      title: 'Top-Level Statements & Interactive CLI in C# 12',
      explanation: 'Notice how clean this is: zero boilerplate namespace or class declarations. Console input, string interpolation, and DateTime are handled with pure simplicity.',
      language: 'csharp',
      code: `// C# 12 Modern Top-Level Statements
Console.ForegroundColor = ConsoleColor.Cyan;
Console.WriteLine("========================================");
Console.WriteLine("🚀 NextSem Academy • .NET 9 Enterprise Lab");
Console.WriteLine("========================================");
Console.ResetColor();

Console.Write("Enter your developer name: ");
string? developerName = Console.ReadLine();

if (string.IsNullOrWhiteSpace(developerName))
{
    developerName = "Enterprise .NET Developer";
}

DateTime launchTime = DateTime.Now;
Console.WriteLine($"\\nWelcome, {developerName}!");
Console.WriteLine($"Environment: .NET {Environment.Version}");
Console.WriteLine($"Operating System: {Environment.OSVersion}");
Console.WriteLine($"Active CPU Cores: {Environment.ProcessorCount}");
Console.WriteLine($"Session Initialized At: {launchTime:yyyy-MM-dd HH:mm:ss}");`
    },
    practicalLab: {
      labTitle: 'Build a System Diagnostics Console Utility in .NET 9',
      labDescription: 'Create a new console application in VS Code, gather operating system specs, memory usage, and print formatted diagnostic metrics.',
      targetFolder: 'dotnet-day-01',
      primaryFile: 'Program.cs',
      cliCommand: 'dotnet new console -n SystemDiagnosticsApp\ncd SystemDiagnosticsApp\ncode .',
      starterCode: `// Day 1 Starter Code
Console.WriteLine("Initializing Diagnostics...");
// TODO: Print developer name, OS version, machine name, and current time.`,
      solutionCode: `Console.WriteLine("=== NextSem .NET 9 Diagnostics Tool ===");
Console.WriteLine($"Machine: {Environment.MachineName}");
Console.WriteLine($"OS: {Environment.OSVersion}");
Console.WriteLine($"Runtime: .NET {Environment.Version}");
Console.WriteLine($"Working Set Memory: {Environment.WorkingSet / 1024 / 1024} MB");
Console.WriteLine($"Diagnostic Timestamp: {DateTime.UtcNow:O}");`,
      tasks: [
        {
          id: 'task-1',
          title: 'Verify .NET 9 SDK in Terminal',
          instruction: 'Open CMD/PowerShell and run dotnet --version. Verify it prints 9.x or 8.x.',
          hint: 'If command not found, ensure .NET SDK is installed from dot.net.',
          validatorKeywords: ['dotnet', 'version']
        },
        {
          id: 'task-2',
          title: 'Output Memory Working Set in Megabytes',
          instruction: 'Use Environment.WorkingSet and divide by (1024 * 1024) to show RAM usage.',
          hint: 'Environment.WorkingSet returns bytes as a long integer.',
          validatorKeywords: ['Environment.WorkingSet']
        }
      ]
    },
    debuggingChallenge: {
      title: 'Fix Null Reference Exception on Console.ReadLine()',
      buggyCode: `// Buggy C# Code
Console.Write("Enter your code: ");
string code = Console.ReadLine();
Console.WriteLine("Length: " + code.Length); // Crashes if input is null (e.g. piped input)`,
      bugExplanation: 'Console.ReadLine() returns a nullable string (string?). Directly accessing .Length without null-check causes a System.NullReferenceException.',
      fixedCode: `Console.Write("Enter your code: ");
string? code = Console.ReadLine();
Console.WriteLine("Length: " + (code?.Length ?? 0));`
    },
    githubWorkflow: {
      repoName: 'dotnet-learning-hub',
      commitMessage: 'feat(day01): initial .NET 9 console diagnostics tool',
      commands: [
        'dotnet new console -o dotnet-day-01',
        'cd dotnet-day-01',
        'dotnet run',
        'git add .',
        'git commit -m "feat(day01): initial .NET 9 console diagnostics tool"',
        'git push origin main'
      ],
      tips: 'Always add a .gitignore with dotnet new gitignore to avoid committing bin/ and obj/ folders.'
    },
    vivaCheck: {
      question: 'What is the primary benefit of Top-Level Statements introduced in modern C#?',
      options: [
        'They eliminate boilerplate namespace and class Program wrappers for simple files',
        'They convert C# into an interpreted Python script',
        'They disable the garbage collector for high performance',
        'They replace the need for the .NET CLR runtime'
      ],
      correctAnswer: 0,
      explanation: 'Top-level statements remove the boilerplate Program class and Main method wrapper. The compiler automatically generates the entry point behind the scenes.'
    }
  },
  {
    id: 'dotnet-day-02',
    day: 2,
    sprint: 1,
    title: 'Day 2: C# Type System, Nullable Types & Pattern Matching',
    slug: 'day-02-csharp-type-system-nullable-pattern-matching',
    category: 'C# 12 Core',
    estimatedTime: '2 Hours',
    difficulty: 'Beginner',
    objectives: [
      'Master Value Types (structs, primitives) vs Reference Types (classes, strings)',
      'Harness C# Nullable Reference Types with null-forgiving (!) and null-coalescing (??) operators',
      'Implement C# 12 switch expressions and pattern matching syntax',
      'Build a dynamic Currency and Tax Calculator utility'
    ],
    concept: {
      overview: 'C# is a strictly typed language. Value types live directly in stack memory, whereas reference types live in managed heap memory. With C# nullable reference types and switch pattern matching, code is safer against null pointer bugs and far more expressive.',
      keyPoints: [
        'Value types: int, double, decimal, bool, struct, enum',
        'Reference types: string, class, record, interface, array',
        'Nullable types (int?, string?) explicitly declare whether null is permissible',
        'Switch expressions return values directly without repetitive break statements'
      ],
      analogy: 'Value types are like physical cash in your wallet (direct value). Reference types are like a bank account number (a reference pointing to funds stored in the bank vault).'
    },
    teacherDemo: {
      title: 'Modern Pattern Matching & Switch Expressions',
      explanation: 'Notice how switch expressions act as pure functional mappers without breaks or colons.',
      language: 'csharp',
      code: `decimal CalculateTax(decimal income, string countryCode) => countryCode.ToUpper() switch
{
    "IN" => income switch
    {
        <= 300_000m => 0m,
        <= 700_000m => income * 0.05m,
        <= 1_000_000m => income * 0.10m,
        _ => income * 0.30m
    },
    "US" => income * 0.22m,
    "UK" => income * 0.20m,
    _ => income * 0.15m // Default fallback
};

Console.WriteLine($"Tax on INR 8,50,000 in IN: INR {CalculateTax(850000m, "IN"):N2}");
Console.WriteLine($"Tax on USD 90,000 in US: USD {CalculateTax(90000m, "US"):N2}");`
    },
    practicalLab: {
      labTitle: 'Build a Multi-Tier Discount & Shipping Engine',
      labDescription: 'Implement order calculation using pattern matching based on customer membership (Bronze, Silver, Gold, Platinum).',
      targetFolder: 'dotnet-day-02',
      primaryFile: 'Program.cs',
      cliCommand: 'dotnet new console -n OrderCalculatorApp\ncd OrderCalculatorApp\ncode .',
      starterCode: `// Day 2 Starter Code
string membership = "Gold";
decimal orderAmount = 1500m;
// TODO: Use switch expression to calculate discount`,
      solutionCode: `decimal discount = (membership, orderAmount) switch
{
    ("Platinum", > 1000m) => 0.25m,
    ("Gold", > 1000m) => 0.15m,
    ("Silver", _) => 0.10m,
    _ => 0.05m
};
decimal finalPrice = orderAmount * (1 - discount);
Console.WriteLine($"Final Amount: ₹{finalPrice:N2} (Saved: {discount:P0})");`,
      tasks: [
        {
          id: 'task-1',
          title: 'Implement Tuple Pattern Matching',
          instruction: 'Match both membership tier and order value simultaneously.',
          hint: 'Use (tier, amount) switch syntax.',
          validatorKeywords: ['switch', '=>']
        }
      ]
    },
    debuggingChallenge: {
      title: 'Fix Non-Exhaustive Switch Expression',
      buggyCode: `// Buggy C# Code
int priority = 2;
string label = priority switch
{
    1 => "High",
    2 => "Medium"
}; // Throws SwitchExpressionException if priority is 3 or anything else`,
      bugExplanation: 'Switch expressions MUST be exhaustive. Missing the discard pattern (_) causes runtime exceptions if unmatched values occur.',
      fixedCode: `int priority = 2;
string label = priority switch
{
    1 => "High",
    2 => "Medium",
    _ => "Normal"
};`
    },
    githubWorkflow: {
      repoName: 'dotnet-learning-hub',
      commitMessage: 'feat(day02): c# type system and pattern matching calculator',
      commands: [
        'git add .',
        'git commit -m "feat(day02): c# type system and pattern matching calculator"',
        'git push origin main'
      ],
      tips: 'Keep commit messages descriptive following Conventional Commits (feat, fix, docs, refactor).'
    },
    vivaCheck: {
      question: 'What happens if a C# switch expression does not handle all possible input cases and lacks a discard (_) pattern?',
      options: [
        'It throws a System.Runtime.CompilerServices.SwitchExpressionException at runtime',
        'It automatically assigns null without error',
        'The compiler converts it into an infinite loop',
        'It defaults to the first branch automatically'
      ],
      correctAnswer: 0,
      explanation: 'In C#, switch expressions must cover every conceivable scenario. If an unhandled value is received at runtime, it throws a SwitchExpressionException.'
    }
  },
  {
    id: 'dotnet-day-03',
    day: 3,
    sprint: 1,
    title: 'Day 3: C# 12 Records, Structs, Immutability & Value Equality',
    slug: 'day-03-csharp-records-structs-immutability',
    category: 'C# 12 Core',
    estimatedTime: '2 Hours',
    difficulty: 'Beginner',
    objectives: [
      'Understand why modern enterprise C# prefers records over traditional DTO classes',
      'Learn positional record syntax with automatic value-based equality',
      'Utilize non-destructive mutation with the with expression',
      'Distinguish class vs record class vs record struct'
    ],
    concept: {
      overview: 'Traditional classes in C# compare by reference (memory address). Records introduce built-in value-based equality, concise primary constructors, and immutability by default, making them the gold standard for Data Transfer Objects (DTOs), event payloads, and API contracts.',
      keyPoints: [
        'public record Person(string Name, int Age); creates an immutable type in 1 line',
        'Two separate record instances with identical data are considered equal (== returns true)',
        'The with operator allows cloning an object while modifying select properties',
        'readonly struct provides maximum memory performance with zero heap allocation'
      ],
      analogy: 'A class is like an ID card (identity matters, two twins with identical looks have different IDs). A record is like a ₹500 banknote (value matters: any two ₹500 notes with identical value are interchangeable).'
    },
    teacherDemo: {
      title: 'Positional Records & Non-Destructive Mutation with with',
      explanation: 'Observe how two distinct instances compare as equal based on their values, and how with creates new modified records cleanly.',
      language: 'csharp',
      code: `public record BankAccount(string AccountNumber, string Owner, decimal Balance, string Currency = "INR");

var acc1 = new BankAccount("ACC-101", "Manoj Kumar", 50000m);
var acc2 = new BankAccount("ACC-101", "Manoj Kumar", 50000m);

Console.WriteLine($"Are acc1 and acc2 equal? {acc1 == acc2}"); // True! Value equality.

// Non-destructive mutation: create updated record without mutating acc1
var updatedAcc = acc1 with { Balance = acc1.Balance + 15000m };

Console.WriteLine($"Original Balance: ₹{acc1.Balance:N2}");
Console.WriteLine($"Updated Balance: ₹{updatedAcc.Balance:N2}");`
    },
    practicalLab: {
      labTitle: 'Build an E-Commerce Product Catalog DTO System',
      labDescription: 'Declare records for Product, Customer, and OrderItem. Implement clone-with-discount using the with expression.',
      targetFolder: 'dotnet-day-03',
      primaryFile: 'Program.cs',
      cliCommand: 'dotnet new console -n RecordCatalogApp\ncd RecordCatalogApp\ncode .',
      starterCode: `// Day 3 Starter Code
// TODO: Define record Product(int Id, string Title, decimal Price, string Category);`,
      solutionCode: `public record Product(int Id, string Title, decimal Price, string Category);

var laptop = new Product(101, "Dell XPS 15", 145000m, "Electronics");
var discountedLaptop = laptop with { Price = laptop.Price * 0.90m };

Console.WriteLine(laptop);
Console.WriteLine(discountedLaptop);`,
      tasks: [
        {
          id: 'task-1',
          title: 'Declare a Positional Record',
          instruction: 'Define record Product with Id, Title, Price, and Category.',
          hint: 'Syntax: public record Product(int Id, string Title, decimal Price, string Category);',
          validatorKeywords: ['record', 'Product']
        }
      ]
    },
    debuggingChallenge: {
      title: 'Fix Class Reference Equality Assumption',
      buggyCode: `// Buggy C# Code
class Point { public int X; public int Y; }
var p1 = new Point { X = 10, Y = 20 };
var p2 = new Point { X = 10, Y = 20 };
Console.WriteLine(p1 == p2); // Prints False because classes compare memory addresses!`,
      bugExplanation: 'Classes use reference equality. Change class Point to record Point to enable automatic value-based equality.',
      fixedCode: `record Point(int X, int Y);
var p1 = new Point(10, 20);
var p2 = new Point(10, 20);
Console.WriteLine(p1 == p2); // Prints True!`
    },
    githubWorkflow: {
      repoName: 'dotnet-learning-hub',
      commitMessage: 'feat(day03): c# records and immutability catalog',
      commands: [
        'git add .',
        'git commit -m "feat(day03): c# records and immutability catalog"',
        'git push origin main'
      ],
      tips: 'Commit small, focused iterations each day to maintain an active GitHub contribution streak.'
    },
    vivaCheck: {
      question: 'Why are C# Records preferred over traditional Classes for DTOs in API and database pipelines?',
      options: [
        'Records provide built-in value-based equality and concise immutable syntax by default',
        'Records execute without requiring the .NET runtime',
        'Records compile into C++ machine code instead of MSIL',
        'Classes are deprecated in C# 12'
      ],
      correctAnswer: 0,
      explanation: 'Records implement value-based equality out-of-the-box (meaning two instances with identical properties are equal) and support clean immutable modeling.'
    }
  },
  {
    id: 'dotnet-day-04',
    day: 4,
    sprint: 1,
    title: 'Day 4: Object-Oriented Principles, Interfaces & Dependency Inversion',
    slug: 'day-04-oop-interfaces-dependency-inversion',
    category: 'C# 12 Core',
    estimatedTime: '2 Hours',
    difficulty: 'Intermediate',
    objectives: [
      'Master the 4 OOP Pillars (Encapsulation, Abstraction, Inheritance, Polymorphism)',
      'Design robust contracts using C# interfaces (ILogger, INotificationService)',
      'Implement the Dependency Inversion Principle (SOLID) for loose coupling',
      'Build a pluggable payment processor supporting PayPal, UPI & CreditCard'
    ],
    concept: {
      overview: 'Enterprise applications never couple high-level business logic directly to low-level implementation details. By coding against interfaces rather than concrete classes, your software becomes easily testable, maintainable, and open for extension without modifying existing code.',
      keyPoints: [
        'An interface defines a contract without implementation details',
        'Classes can implement multiple interfaces',
        'Dependency Inversion: High-level modules should depend on abstractions, not concretions',
        'Polymorphism enables treating different payment gateways uniformly via IPaymentGateway'
      ],
      analogy: 'A wall electrical socket is an interface. A phone charger, laptop adapter, or lamp can all plug into it because they adhere to the same socket specification.'
    },
    teacherDemo: {
      title: 'Pluggable Payment Processing via IPaymentProcessor',
      explanation: 'Notice how the checkout service depends only on IPaymentProcessor. We can swap UPI for PayPal with zero code changes in CheckoutService.',
      language: 'csharp',
      code: `public interface IPaymentProcessor
{
    string GatewayName { get; }
    bool ProcessPayment(decimal amount, string customerRef);
}

public class UpiPaymentProcessor : IPaymentProcessor
{
    public string GatewayName => "GooglePay / PhonePe UPI";
    public bool ProcessPayment(decimal amount, string customerRef)
    {
        Console.WriteLine($"[UPI] Debiting ₹{amount:N2} from {customerRef}... Success! Reference: UPI-{(Random.Shared.Next(100000, 999999))}");
        return true;
    }
}

public class CheckoutService
{
    private readonly IPaymentProcessor _paymentProcessor;
    public CheckoutService(IPaymentProcessor paymentProcessor)
    {
        _paymentProcessor = paymentProcessor;
    }

    public void CompleteOrder(string orderId, decimal total)
    {
        Console.WriteLine($"Initiating checkout for Order #{orderId} via {_paymentProcessor.GatewayName}...");
        _paymentProcessor.ProcessPayment(total, "customer@bank");
        Console.WriteLine("Order confirmed & receipt dispatched!");
    }
}

var checkout = new CheckoutService(new UpiPaymentProcessor());
checkout.CompleteOrder("ORD-9021", 4299m);`
    },
    practicalLab: {
      labTitle: 'Implement Notification Dispatcher with INotificationService',
      labDescription: 'Create an interface INotificationService and implement EmailNotificationService and SmsNotificationService.',
      targetFolder: 'dotnet-day-04',
      primaryFile: 'Program.cs',
      cliCommand: 'dotnet new console -n OopInterfaceApp\ncd OopInterfaceApp\ncode .',
      starterCode: `// Day 4 Starter Code
// TODO: Define interface INotificationService and implement Send(string recipient, string message)`,
      solutionCode: `public interface INotificationService
{
    void SendNotification(string to, string message);
}

public class EmailNotificationService : INotificationService
{
    public void SendNotification(string to, string message) =>
        Console.WriteLine($"[EMAIL] To: {to} | Message: {message}");
}

public class SmsNotificationService : INotificationService
{
    public void SendNotification(string to, string message) =>
        Console.WriteLine($"[SMS] To: {to} | Message: {message}");
}

INotificationService notifier = new EmailNotificationService();
notifier.SendNotification("student@nextsem.online", "Your Day 4 practical was verified!");`,
      tasks: [
        {
          id: 'task-1',
          title: 'Define Interface INotificationService',
          instruction: 'Declare the method SendNotification(string to, string message); in interface.',
          hint: 'public interface INotificationService { void SendNotification(string to, string message); }',
          validatorKeywords: ['interface', 'INotificationService']
        }
      ]
    },
    debuggingChallenge: {
      title: 'Fix Direct Coupling Tightly Coupled Class',
      buggyCode: `// Buggy C# Code
public class OrderService
{
    // Hardcoded concrete dependency: impossible to unit test without sending real emails!
    private EmailSender _sender = new EmailSender();
    public void PlaceOrder() => _sender.SendEmail();
}`,
      bugExplanation: 'Instantiating new EmailSender() inside OrderService violates Dependency Inversion. OrderService should receive IEmailSender via constructor injection.',
      fixedCode: `public class OrderService
{
    private readonly IEmailSender _sender;
    public OrderService(IEmailSender sender) => _sender = sender;
    public void PlaceOrder() => _sender.SendEmail();
}`
    },
    githubWorkflow: {
      repoName: 'dotnet-learning-hub',
      commitMessage: 'feat(day04): oop interfaces and dependency inversion pattern',
      commands: [
        'git add .',
        'git commit -m "feat(day04): oop interfaces and dependency inversion pattern"',
        'git push origin main'
      ],
      tips: 'Always use meaningful interface names prefixed with uppercase I (e.g. IRepository, IService).'
    },
    vivaCheck: {
      question: 'What is the "D" in SOLID design principles?',
      options: [
        'Dependency Inversion Principle: High-level modules should depend on abstractions, not concrete implementations',
        'Direct Inheritance Principle',
        'Dynamic Compilation Principle',
        'Data Binding Principle'
      ],
      correctAnswer: 0,
      explanation: 'Dependency Inversion states that high-level policies must not depend on low-level details. Both must depend on abstractions (interfaces).'
    }
  },
  {
    id: 'dotnet-day-05',
    day: 5,
    sprint: 1,
    title: 'Day 5: Generics, Collections & Enterprise LINQ Masterclass',
    slug: 'day-05-generics-collections-linq-masterclass',
    category: 'C# 12 Core',
    estimatedTime: '2 Hours',
    difficulty: 'Intermediate',
    objectives: [
      'Master Generic Collections: List<T>, Dictionary<TKey, TValue>, HashSet<T>',
      'Understand C# LINQ (Language Integrated Query) method syntax and deferred execution',
      'Execute complex filtering, sorting, projection (Select), grouping (GroupBy), and aggregation',
      'Build an In-Memory Student Analytics & Grading Engine'
    ],
    concept: {
      overview: 'LINQ (Language Integrated Query) is one of the most powerful innovations in C#. It allows querying collections, databases (via EF Core), and XML using a unified, strongly typed syntax with compile-time verification.',
      keyPoints: [
        'Generics prevent boxing/unboxing overhead and ensure type safety',
        'LINQ deferred execution: queries do not execute until enumerated (e.g. via ToList() or foreach)',
        'Where filters, Select projects, OrderBy sorts, and GroupBy categorizes data',
        'Any(), All(), and Count() provide lightning-fast aggregations'
      ],
      analogy: 'Think of LINQ as SQL queries running directly inside your C# memory. You don\'t need tedious for-loops; you express what data you want declaratively.'
    },
    teacherDemo: {
      title: 'Advanced In-Memory Data Analytics with LINQ',
      explanation: 'Observe how we filter top students, calculate averages, and group by department in just a few expressive lines.',
      language: 'csharp',
      code: `record Student(int Id, string Name, string Major, double Gpa, int CompletedCredits);

var students = new List<Student>
{
    new(1, "Aarav Sharma", "Computer Science", 3.85, 90),
    new(2, "Diya Patel", "Computer Science", 3.95, 110),
    new(3, "Rohan Verma", "Information Tech", 3.40, 80),
    new(4, "Priya Nair", "Data Science", 3.90, 95),
    new(5, "Ananya Roy", "Computer Science", 3.10, 60),
    new(6, "Vikram Singh", "Information Tech", 3.75, 105)
};

// 1. Filter Honor Roll Students (GPA >= 3.75)
var honorRoll = students
    .Where(s => s.Gpa >= 3.75)
    .OrderByDescending(s => s.Gpa)
    .Select(s => new { s.Name, s.Major, s.Gpa });

Console.WriteLine("🏆 HONOR ROLL STUDENTS:");
foreach (var s in honorRoll)
{
    Console.WriteLine($"• {s.Name} ({s.Major}) - GPA: {s.Gpa}");
}

// 2. Department Average GPA
var deptStats = students
    .GroupBy(s => s.Major)
    .Select(g => new { Department = g.Key, AvgGpa = g.Average(s => s.Gpa), Count = g.Count() });

Console.WriteLine("\\n📊 DEPARTMENT ANALYTICS:");
foreach (var d in deptStats)
{
    Console.WriteLine($"• {d.Department}: Avg GPA {d.AvgGpa:F2} ({d.Count} students)");
}`
    },
    practicalLab: {
      labTitle: 'Build an E-Commerce Transaction Analyzer with LINQ',
      labDescription: 'Create a list of Order records and calculate Total Revenue, Top Customers, and Orders grouped by status.',
      targetFolder: 'dotnet-day-05',
      primaryFile: 'Program.cs',
      cliCommand: 'dotnet new console -n LinqAnalyticsApp\ncd LinqAnalyticsApp\ncode .',
      starterCode: `// Day 5 Starter Code
record Order(int Id, string Customer, decimal Amount, string Status);
var orders = new List<Order>();
// TODO: Find total revenue for Completed orders and top spender`,
      solutionCode: `record Order(int Id, string Customer, decimal Amount, string Status);
var orders = new List<Order>
{
    new(1, "Kavita", 4500m, "Completed"),
    new(2, "Rahul", 1200m, "Pending"),
    new(3, "Kavita", 7800m, "Completed"),
    new(4, "Amit", 9200m, "Completed")
};

decimal revenue = orders.Where(o => o.Status == "Completed").Sum(o => o.Amount);
var topSpender = orders.GroupBy(o => o.Customer)
    .Select(g => new { Customer = g.Key, Total = g.Sum(o => o.Amount) })
    .OrderByDescending(x => x.Total)
    .First();

Console.WriteLine($"Total Revenue: ₹{revenue:N2}");
Console.WriteLine($"Top Spender: {topSpender.Customer} (₹{topSpender.Total:N2})");`,
      tasks: [
        {
          id: 'task-1',
          title: 'Calculate Total Revenue',
          instruction: 'Use Where(o => o.Status == "Completed").Sum(o => o.Amount)',
          hint: 'Sum is an aggregation operator in LINQ.',
          validatorKeywords: ['Where', 'Sum']
        }
      ]
    },
    debuggingChallenge: {
      title: 'Fix Multiple Enumeration Performance Bug in LINQ',
      buggyCode: `// Buggy C# Code
IEnumerable<int> numbers = Enumerable.Range(1, 1000000).Where(n => n % 2 == 0);
Console.WriteLine("Count: " + numbers.Count()); // Enumerates the full query
Console.WriteLine("First: " + numbers.First()); // Re-enumerates the ENTIRE query again!`,
      bugExplanation: 'IEnumerable evaluates lazily. Calling Count() and then First() causes the heavy filtering logic to run twice. Use .ToList() to cache results in memory.',
      fixedCode: `List<int> numbers = Enumerable.Range(1, 1000000).Where(n => n % 2 == 0).ToList();
Console.WriteLine("Count: " + numbers.Count);
Console.WriteLine("First: " + numbers[0]);`
    },
    githubWorkflow: {
      repoName: 'dotnet-learning-hub',
      commitMessage: 'feat(day05): generics and enterprise linq analytics engine',
      commands: [
        'git add .',
        'git commit -m "feat(day05): generics and enterprise linq analytics engine"',
        'git push origin main'
      ],
      tips: 'Ensure your code builds cleanly with 0 warnings before pushing.'
    },
    vivaCheck: {
      question: 'What is "Deferred Execution" in C# LINQ?',
      options: [
        'A query is not executed at the point of declaration; execution occurs when enumerated (e.g. foreach, ToList())',
        'Queries are permanently delayed until the operating system restarts',
        'Queries are transferred to a secondary background thread automatically',
        'LINQ skips execution if the CPU is overloaded'
      ],
      correctAnswer: 0,
      explanation: 'Deferred execution means a LINQ query variable only stores the query commands. The actual computation occurs only when the query is enumerated (via foreach, ToList(), ToArray(), etc.).'
    }
  },
  {
    id: 'dotnet-day-10',
    day: 10,
    sprint: 1,
    title: 'Day 10: Asynchronous Programming with async, await & Tasks',
    slug: 'day-10-async-await-multithreading-tasks',
    category: 'C# 12 Core',
    estimatedTime: '2 Hours',
    difficulty: 'Advanced',
    objectives: [
      'Understand how asynchronous non-blocking I/O works in .NET CLR',
      'Use async and await keywords effectively without thread starvation',
      'Manage multiple concurrent tasks with Task.WhenAll and Task.WhenAny',
      'Incorporate CancellationToken to gracefully cancel long-running operations'
    ],
    concept: {
      overview: 'Synchronous blocking code wastes server threads while waiting for database queries or HTTP network responses. Asynchronous programming with Task and async/await frees the thread to serve other requests, boosting backend scalability by 10x.',
      keyPoints: [
        'async methods return Task or Task<T>',
        'await yields the executing thread back to the thread pool until the asynchronous operation completes',
        'Never use .Result or .Wait() on Tasks as they cause thread pool deadlocks',
        'CancellationTokens provide a standard mechanism to abort operations'
      ],
      analogy: 'Imagine ordering coffee. Synchronous code means standing frozen at the counter until your cup brews. Asynchronous code gives you a token; you sit and do work, and return only when your token beeps.'
    },
    teacherDemo: {
      title: 'Concurrent Asynchronous Data Fetching with Task.WhenAll',
      explanation: 'We fetch stock quotes from 3 services concurrently in parallel, reducing total latency from 3 seconds to just 1 second.',
      language: 'csharp',
      code: `async Task<decimal> FetchStockPriceAsync(string ticker, int delayMs)
{
    Console.WriteLine($"[{DateTime.Now:HH:mm:ss}] Fetching {ticker} price from cloud API...");
    await Task.Delay(delayMs); // Non-blocking simulation
    decimal price = Random.Shared.Next(1500, 3500) + (decimal)Random.Shared.NextDouble();
    Console.WriteLine($"[{DateTime.Now:HH:mm:ss}] Received {ticker}: ₹{price:N2}");
    return price;
}

Console.WriteLine("Initiating concurrent stock fetch...");
var sw = System.Diagnostics.Stopwatch.StartNew();

// Run all 3 tasks concurrently
var tcsTask = FetchStockPriceAsync("TCS.NS", 1000);
var infyTask = FetchStockPriceAsync("INFY.NS", 1000);
var relianceTask = FetchStockPriceAsync("RELIANCE.NS", 1000);

decimal[] prices = await Task.WhenAll(tcsTask, infyTask, relianceTask);
sw.Stop();

Console.WriteLine($"\\nAll prices fetched in {sw.ElapsedMilliseconds} ms! (Total: ₹{prices.Sum():N2})");`
    },
    practicalLab: {
      labTitle: 'Build an Async Web Scraping & Health Checker',
      labDescription: 'Fetch multiple URL health statuses concurrently using HttpClient and measure response times.',
      targetFolder: 'dotnet-day-10',
      primaryFile: 'Program.cs',
      cliCommand: 'dotnet new console -n AsyncHealthCheckApp\ncd AsyncHealthCheckApp\ncode .',
      starterCode: `// Day 10 Starter Code
using var client = new HttpClient();
// TODO: Check health of https://nextsem.online concurrently`,
      solutionCode: `using var client = new HttpClient();
string[] urls = ["https://nextsem.online", "https://google.com", "https://microsoft.com"];

var tasks = urls.Select(async url =>
{
    var sw = System.Diagnostics.Stopwatch.StartNew();
    var response = await client.GetAsync(url);
    sw.Stop();
    return $"{url} -> Status: {response.StatusCode} in {sw.ElapsedMilliseconds}ms";
});

var results = await Task.WhenAll(tasks);
foreach (var res in results) Console.WriteLine(res);`,
      tasks: [
        {
          id: 'task-1',
          title: 'Implement Task.WhenAll',
          instruction: 'Execute HTTP requests in parallel using Task.WhenAll.',
          hint: 'Use await Task.WhenAll(tasks);',
          validatorKeywords: ['Task.WhenAll', 'await']
        }
      ]
    },
    debuggingChallenge: {
      title: 'Fix Thread Deadlock with .Result',
      buggyCode: `// Buggy C# Code
public string GetData()
{
    // Calling .Result synchronously blocks the thread and can cause complete deadlocks!
    return FetchDataAsync().Result; 
}`,
      bugExplanation: 'Using .Result or .Wait() synchronously blocks the calling thread while the task is trying to complete on the same thread synchronization context, creating a classic deadlock.',
      fixedCode: `public async Task<string> GetDataAsync()
{
    return await FetchDataAsync();
}`
    },
    githubWorkflow: {
      repoName: 'dotnet-learning-hub',
      commitMessage: 'feat(day10): async await task concurrency engine',
      commands: [
        'git add .',
        'git commit -m "feat(day10): async await task concurrency engine"',
        'git push origin main'
      ],
      tips: 'Tag your Sprint 1 milestone release on GitHub with git tag v1.0-sprint1.'
    },
    vivaCheck: {
      question: 'Why should developers avoid calling .Result or .Wait() on asynchronous Tasks in ASP.NET Core?',
      options: [
        'It blocks the thread synchronously, causing thread starvation and potential deadlocks',
        'It deletes the task from RAM automatically',
        'It converts the database into read-only mode',
        'It prevents the Garbage Collector from freeing memory'
      ],
      correctAnswer: 0,
      explanation: 'Synchronously waiting on an asynchronous operation via .Result or .Wait() ties up a thread-pool thread unnecessarily, risking thread pool starvation and deadlocks.'
    }
  },
  {
    id: 'dotnet-day-11',
    day: 11,
    sprint: 2,
    title: 'Day 11: Introduction to Entity Framework Core 9 & Database Modeling',
    slug: 'day-11-efcore-dbcontext-models',
    category: 'EF Core & Database',
    estimatedTime: '2 Hours',
    difficulty: 'Intermediate',
    objectives: [
      'Understand what an Object-Relational Mapper (ORM) is in plain simple English',
      'Install Microsoft.EntityFrameworkCore and Microsoft.EntityFrameworkCore.SqlServer',
      'Create entity model classes (Customer, Order) with primary keys and relationships',
      'Build your first DbContext class and configure connection strings'
    ],
    concept: {
      overview: 'Entity Framework Core (EF Core) eliminates the pain of writing raw SQL strings inside your C# applications. Instead of managing database connections, writing INSERT/SELECT queries manually, or mapping SQL tables into objects, EF Core does the heavy lifting automatically.',
      keyPoints: [
        'An ORM bridges the gap between C# object-oriented code and SQL relational database tables',
        'DbContext is the gateway class representing a session with your database',
        'DbSet<TEntity> maps directly to a physical database table in SQL Server',
        'LINQ queries written against DbSet are converted into optimized SQL queries automatically'
      ],
      analogy: 'Imagine ordering food from a restaurant in a foreign country. You speak English (C#), and the chef speaks Italian (SQL). EF Core is your expert personal translator who translates your English order into perfect Italian culinary instructions and brings your food back directly onto your plate.',
      simpleTheory: {
        plainEnglishSummary: 'EF Core 9 is an intelligent bridge between your C# code and your database. Instead of writing complex SQL queries like SELECT * FROM Customers WHERE Id = 5, you simply write db.Customers.Find(5) in clean C#. EF Core handles opening database connections, translating your C# into SQL, executing it, and returning real C# objects.',
        howDotnetWorksUnderTheHood: [
          '1. Model Metadata Snapshot: When your app starts, EF Core inspects your entity classes and builds an in-memory relational schema model.',
          '2. LINQ Expression Tree Parsing: When you query db.Products.Where(p => p.Price > 100), EF Core compiles the C# expression tree into an optimized parameterized SQL query.',
          '3. ADO.NET Connection Pipeline: EF Core uses high-performance ADO.NET underneath to stream data across TCP sockets to SQL Server.',
          '4. Change Tracker Engine: EF Core automatically monitors entity state (Unchanged, Added, Modified, Deleted) in memory so SaveChangesAsync() issues exact minimal SQL statements.'
        ],
        whyEnterprisesUseIt: 'Global software enterprises build with EF Core because it guarantees zero SQL-injection vulnerabilities through automatic parameterization, speeds up feature development by 400%, and lets teams switch between SQL Server, PostgreSQL, and SQLite with zero changes to business logic.',
        goldenRules: [
          'Always use asynchronous database calls (ToListAsync, SaveChangesAsync) in production.',
          'Never expose DbContext instances as singletons; register them as Scoped dependencies in ASP.NET Core.',
          'Use AsNoTracking() for read-only queries to boost query performance by up to 3x.'
        ],
        beginnerPitfalls: [
          'Do NOT execute database queries inside a foreach loop (N+1 query problem). Fetch all required records in a single batched query using LINQ.'
        ]
      }
    },
    teacherDemo: {
      title: 'Declaring an EF Core DbContext & Entity Models',
      explanation: 'See how simple it is: We declare standard C# classes with getters/setters, and register them inside AppDbContext with DbSet<T>.',
      language: 'csharp',
      code: `using Microsoft.EntityFrameworkCore;

// 1. Domain Entity Models
public class Customer
{
    public int Id { get; set; }
    public required string FullName { get; set; }
    public required string Email { get; set; }
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
}

// 2. EF Core Database Gateway (DbContext)
public class StoreDbContext : DbContext
{
    public DbSet<Customer> Customers => Set<Customer>();

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        // Using in-memory or LocalDB connection string for instant development
        options.UseInMemoryDatabase("NextsemStoreDb");
    }
}

// 3. Execution & Insertion
using var db = new StoreDbContext();
db.Customers.Add(new Customer 
{ 
    FullName = "Er. Manoj Kumar", 
    Email = "manoj@nextsem.online" 
});
await db.SaveChangesAsync();

Console.WriteLine($"Database synced! Total Customers: {await db.Customers.CountAsync()}");`
    },
    practicalLab: {
      labTitle: 'Create an EF Core Student Management Database Model',
      labDescription: 'Configure an EF Core DbContext with Student and Course models, and insert a seed student asynchronously.',
      targetFolder: 'dotnet-day-11',
      primaryFile: 'Program.cs',
      cliCommand: 'dotnet new console -n EfCoreModelsApp\ncd EfCoreModelsApp\ndotnet add package Microsoft.EntityFrameworkCore.InMemory\ncode .',
      starterCode: `// Day 11 Starter Code
// TODO: Define class Student { public int Id { get; set; } public string Name { get; set; } }
// TODO: Define class StudentDbContext : DbContext`,
      solutionCode: `using Microsoft.EntityFrameworkCore;

public class Student
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string RollNumber { get; set; } = string.Empty;
}

public class StudentDbContext : DbContext
{
    public DbSet<Student> Students => Set<Student>();
    protected override void OnConfiguring(DbContextOptionsBuilder options) =>
        options.UseInMemoryDatabase("StudentDb");
}

using var db = new StudentDbContext();
db.Students.Add(new Student { Name = "Rahul Sharma", RollNumber = "BCA-2026-001" });
await db.SaveChangesAsync();

var list = await db.Students.ToListAsync();
foreach (var s in list) Console.WriteLine($"{s.RollNumber}: {s.Name}");`,
      tasks: [
        {
          id: 'task-1',
          title: 'Declare DbSet in DbContext',
          instruction: 'Create a DbContext subclass with DbSet<Student> Students property.',
          hint: 'Use public DbSet<Student> Students => Set<Student>();',
          validatorKeywords: ['DbContext', 'DbSet', 'Student']
        }
      ]
    },
    debuggingChallenge: {
      title: 'Fix Missing Primary Key in Entity Model',
      buggyCode: `// Buggy C# Code
public class Invoice
{
    public string InvoiceNumber { get; set; } // EF Core throws InvalidOperationException: The entity type 'Invoice' requires a primary key!
    public decimal TotalAmount { get; set; }
}`,
      bugExplanation: 'By convention, EF Core expects an Id or <EntityName>Id property (e.g. Id or InvoiceId) to designate as the primary key. Without an explicit key, EF Core cannot track database entities.',
      fixedCode: `public class Invoice
{
    public int Id { get; set; } // Primary Key by convention!
    public string InvoiceNumber { get; set; } = string.Empty;
    public decimal TotalAmount { get; set; }
}`
    },
    githubWorkflow: {
      repoName: 'dotnet-learning-hub',
      commitMessage: 'feat(day11): ef core dbcontext and domain entity modeling',
      commands: [
        'git add .',
        'git commit -m "feat(day11): ef core dbcontext and domain entity modeling"',
        'git push origin main'
      ],
      tips: 'Always push clean entity migrations and avoid hardcoding passwords into connection strings.'
    },
    vivaCheck: {
      question: 'What is the role of a DbContext in Microsoft Entity Framework Core?',
      options: [
        'It represents an active session with the database and coordinates querying, saving, and change tracking',
        'It is a tool used exclusively for drawing HTML web pages',
        'It replaces the C# compiler inside Visual Studio Code',
        'It converts SQL databases into binary machine code'
      ],
      correctAnswer: 0,
      explanation: 'DbContext coordinates the retrieval and persistence of data, tracks changes made to entity instances, and maps objects to physical database tables.'
    }
  },
  {
    id: 'dotnet-day-15',
    day: 15,
    sprint: 2,
    title: 'Day 15: Entity Framework Core 9, DbContext & Code-First Migrations',
    slug: 'day-15-efcore-dbcontext-code-first-migrations',
    category: 'EF Core & Database',
    estimatedTime: '2 Hours',
    difficulty: 'Intermediate',
    objectives: [
      'Install Microsoft.EntityFrameworkCore.SqlServer and Design tools',
      'Create DbContext class and configure connection strings',
      'Run dotnet ef migrations add and dotnet ef database update',
      'Perform async CRUD operations (Create, Read, Update, Delete) on SQL Server'
    ],
    concept: {
      overview: 'Entity Framework Core is Microsoft\'s official Object-Relational Mapper (ORM). Instead of writing raw SQL strings, you interact with your database using strongly-typed C# domain models. EF Core translates your C# LINQ queries into optimized SQL queries automatically.',
      keyPoints: [
        'DbContext represents a session with the database',
        'DbSet<T> represents a database table',
        'Code-First Migrations track schema changes in versioned C# migration files',
        'Always use async methods (ToListAsync, SaveChangesAsync) in web applications'
      ],
      analogy: 'EF Core acts as a universal translator between the C# object-oriented world (classes, lists) and the SQL relational world (tables, rows, foreign keys).'
    },
    teacherDemo: {
      title: 'Declaring an EF Core DbContext and Performing Async CRUD',
      explanation: 'Notice how clean this is: zero raw SQL queries. EF Core creates the table, inserts rows, and executes strongly-typed LINQ queries.',
      language: 'csharp',
      code: `using Microsoft.EntityFrameworkCore;

public class Student
{
    public int Id { get; set; }
    public required string FullName { get; set; }
    public required string Email { get; set; }
    public DateTime EnrolledAt { get; set; } = DateTime.UtcNow;
}

public class AppDbContext : DbContext
{
    public DbSet<Student> Students => Set<Student>();

    protected override void OnConfiguring(DbContextOptionsBuilder options) =>
        options.UseInMemoryDatabase("StudentDb"); // Use SQL Server in production
}

await using var db = new AppDbContext();

// 1. Create
db.Students.Add(new Student { FullName = "Aarav Sharma", Email = "aarav@nextsem.online" });
await db.SaveChangesAsync();

// 2. Read with LINQ
var student = await db.Students.FirstOrDefaultAsync(s => s.Email == "aarav@nextsem.online");
Console.WriteLine($"Found Student: #{student?.Id} - {student?.FullName}");`
    },
    practicalLab: {
      labTitle: 'Build a Product Inventory Management with EF Core',
      labDescription: 'Configure an AppDbContext with Products table, seed default data, and query products with price filters.',
      targetFolder: 'dotnet-day-15',
      primaryFile: 'Program.cs',
      cliCommand: 'dotnet new console -n EfCoreInventoryApp\ncd EfCoreInventoryApp\ndotnet add package Microsoft.EntityFrameworkCore.InMemory\ncode .',
      starterCode: `// Day 15 Starter Code
// TODO: Define Product entity and InventoryDbContext`,
      solutionCode: `using Microsoft.EntityFrameworkCore;

public class Product { public int Id { get; set; } public string Name { get; set; } = ""; public decimal Price { get; set; } }
public class InventoryDbContext : DbContext
{
    public DbSet<Product> Products => Set<Product>();
    protected override void OnConfiguring(DbContextOptionsBuilder opt) => opt.UseInMemoryDatabase("Inventory");
}

await using var db = new InventoryDbContext();
db.Products.Add(new Product { Name = "Mechanical Keyboard", Price = 3499m });
await db.SaveChangesAsync();

var item = await db.Products.FirstAsync();
Console.WriteLine($"Product: {item.Name} (₹{item.Price})");`,
      tasks: [
        {
          id: 'task-1',
          title: 'Implement SaveChangesAsync',
          instruction: 'Save added entities asynchronously using await db.SaveChangesAsync();',
          hint: 'Always await SaveChangesAsync in .NET 9.',
          validatorKeywords: ['SaveChangesAsync', 'await']
        }
      ]
    },
    debuggingChallenge: {
      title: 'Fix Forgetting await on Async Database Queries',
      buggyCode: `// Buggy C# Code
// Without await, this returns a Task<List<Product>> instead of the actual data!
var products = db.Products.ToListAsync(); 
Console.WriteLine("Count: " + products.Count); // Compilation error: Task doesn't have .Count`,
      bugExplanation: 'Async EF Core methods return Tasks. You must use the await keyword to await the result from the database.',
      fixedCode: `var products = await db.Products.ToListAsync();
Console.WriteLine("Count: " + products.Count);`
    },
    githubWorkflow: {
      repoName: 'dotnet-learning-hub',
      commitMessage: 'feat(day15): ef core dbcontext and code-first persistence',
      commands: [
        'git add .',
        'git commit -m "feat(day15): ef core dbcontext and code-first persistence"',
        'git push origin main'
      ],
      tips: 'Never commit database connection strings with passwords to public GitHub repositories.'
    },
    vivaCheck: {
      question: 'What command in the .NET CLI creates a new Code-First migration in Entity Framework Core?',
      options: [
        'dotnet ef migrations add <MigrationName>',
        'dotnet database create',
        'dotnet ef push',
        'dotnet sql sync'
      ],
      correctAnswer: 0,
      explanation: 'The command "dotnet ef migrations add <Name>" compares the current C# entity models against the previous snapshot and generates a C# migration class containing Up() and Down() methods.'
    }
  },
  {
    id: 'dotnet-day-21',
    day: 21,
    sprint: 3,
    title: 'Day 21: ASP.NET Core 9 Web APIs, Controllers & Kestrel Architecture',
    slug: 'day-21-aspnet-core-web-api',
    category: 'ASP.NET Core Web API',
    estimatedTime: '2 Hours',
    difficulty: 'Intermediate',
    objectives: [
      'Understand how the .NET Kestrel HTTP server processes network requests',
      'Learn the difference between Web API Controllers and Minimal APIs in .NET 9',
      'Master the Dependency Injection container (AddTransient, AddScoped, AddSingleton)',
      'Build your first RESTful Web API Controller returning JSON responses'
    ],
    concept: {
      overview: 'ASP.NET Core 9 is one of the world\'s fastest web frameworks, capable of serving over 7 million HTTP requests per second on the TechEmpower benchmarks. Its modular middleware pipeline and built-in Kestrel web server allow developers to build cloud-native REST APIs with enterprise reliability.',
      keyPoints: [
        'Kestrel is the cross-platform, asynchronous I/O HTTP web server built into .NET',
        'Middleware pipeline processes incoming HTTP requests in a sequential Russian-doll pattern',
        'Dependency Injection (DI) is natively built into the ASP.NET Core framework',
        'ApiController attribute automatically triggers model validation and returns HTTP 400 Bad Request on failure'
      ],
      analogy: 'Think of Kestrel as the security airport gate that receives all passengers (HTTP requests). The middleware pipeline is the series of security checkpoints (Authentication, Routing, CORS, Logging) that every passenger walks through before finally boarding the plane (your controller action).',
      simpleTheory: {
        plainEnglishSummary: 'ASP.NET Core Web API is the software engine that powers backends for websites, mobile apps, and cloud microservices. When a user clicks a button on their phone or browser, an HTTP request (GET, POST) travels across the internet to your .NET backend. The Kestrel server catches it, your C# code processes the data, and sends back a clean JSON response in milliseconds.',
        howDotnetWorksUnderTheHood: [
          '1. Socket Listener: Kestrel uses libuv and socket abstractions to listen on TCP ports (8080, 5000) without thread blocking.',
          '2. HttpContext Allocation: Kestrel creates an HttpContext object pooling request and response streams to minimize garbage collection.',
          '3. Middleware Delegate Chain: Request traverses middlewares (app.UseAuthentication, app.UseAuthorization) executed as nested asynchronous Func<RequestDelegate> delegates.',
          '4. Controller Action Invocation: Endpoint routing resolves the target method, injects dependencies, binds JSON from request body, and returns IActionResult.'
        ],
        whyEnterprisesUseIt: 'Global financial platforms, e-commerce giants, and Fortune 500 corporations choose ASP.NET Core because it consumes up to 80% less memory than legacy Java Spring applications, boasts sub-millisecond response times, and compiles into standalone Docker containers.',
        goldenRules: [
          'Always register services with the correct lifetime (Scoped for database access, Singleton for shared caches).',
          'Return strongly-typed action results like ActionResult<T> or TypedResults to automate Swagger OpenAPI contract generation.',
          'Never execute synchronous blocking code inside API controllers.'
        ],
        beginnerPitfalls: [
          'Do NOT register a Scoped service (like DbContext) inside a Singleton service. This causes memory leaks and concurrency crashes.'
        ]
      }
    },
    teacherDemo: {
      title: 'Building a High-Performance ASP.NET Core Web API Controller',
      explanation: 'See how standard Controller classes inherit from ControllerBase and use HTTP attributes to expose RESTful endpoints.',
      language: 'csharp',
      code: `using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private static readonly List<ProductDto> _products = new()
    {
        new(1, "ThinkPad P16 Enterprise", 210000m, "Laptops"),
        new(2, "4K Ultra-Wide Monitor", 48000m, "Peripherals")
    };

    [HttpGet]
    public ActionResult<IEnumerable<ProductDto>> GetAllProducts()
    {
        return Ok(_products);
    }

    [HttpGet("{id:int}")]
    public ActionResult<ProductDto> GetProductById(int id)
    {
        var product = _products.FirstOrDefault(p => p.Id == id);
        if (product == null)
            return NotFound(new { error = $"Product with ID {id} was not found." });

        return Ok(product);
    }

    [HttpPost]
    public ActionResult<ProductDto> CreateProduct([FromBody] CreateProductRequest req)
    {
        var newProduct = new ProductDto(_products.Count + 1, req.Title, req.Price, req.Category);
        _products.Add(newProduct);
        return CreatedAtAction(nameof(GetProductById), new { id = newProduct.Id }, newProduct);
    }
}

public record ProductDto(int Id, string Title, decimal Price, string Category);
public record CreateProductRequest(string Title, decimal Price, string Category);`
    },
    practicalLab: {
      labTitle: 'Create an ASP.NET Core Web API for Student Records',
      labDescription: 'Initialize an ASP.NET Core Web API project, create a StudentsController with GET and POST actions, and test with curl or Swagger.',
      targetFolder: 'dotnet-day-21',
      primaryFile: 'Controllers/StudentsController.cs',
      cliCommand: 'dotnet new webapi -n StudentWebApi\ncd StudentWebApi\ncode .',
      starterCode: `// Day 21 Starter Code
// Create StudentsController inheriting from ControllerBase with [ApiController]`,
      solutionCode: `using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class StudentsController : ControllerBase
{
    private static readonly List<string> _students = ["Manoj", "Aarav", "Neha"];

    [HttpGet]
    public IActionResult Get() => Ok(_students);

    [HttpPost]
    public IActionResult Add([FromBody] string name)
    {
        _students.Add(name);
        return Created("/api/students", name);
    }
}`,
      tasks: [
        {
          id: 'task-1',
          title: 'Implement ApiController and Routes',
          instruction: 'Create StudentsController decorated with [ApiController] and [Route("api/[controller]")].',
          hint: 'Inherit from ControllerBase for pure Web API capabilities.',
          validatorKeywords: ['ApiController', 'Route', 'ControllerBase']
        }
      ]
    },
    debuggingChallenge: {
      title: 'Fix Route Ambiguity Conflicting HTTP Actions',
      buggyCode: `// Buggy C# Code
[HttpGet]
public IActionResult GetAll() => Ok();

[HttpGet]
public IActionResult GetFeatured() => Ok(); // AmbiguousMatchException: The request matched multiple endpoints!`,
      bugExplanation: 'Two actions cannot share the exact same HTTP method (HttpGet) and identical route path. You must specify a distinct sub-route path for the second action.',
      fixedCode: `[HttpGet]
public IActionResult GetAll() => Ok();

[HttpGet("featured")]
public IActionResult GetFeatured() => Ok();`
    },
    githubWorkflow: {
      repoName: 'dotnet-learning-hub',
      commitMessage: 'feat(day21): aspnet core 9 web api controllers and kestrel pipeline',
      commands: [
        'git add .',
        'git commit -m "feat(day21): aspnet core 9 web api controllers and kestrel pipeline"',
        'git push origin main'
      ],
      tips: 'Include launchSettings.json in git to ensure standardized local test ports for all team developers.'
    },
    vivaCheck: {
      question: 'What is Kestrel in modern ASP.NET Core?',
      options: [
        'The cross-platform, asynchronous event-driven HTTP web server included by default in .NET',
        'A relational database engine designed by Microsoft',
        'A CSS animation stylesheet library',
        'A testing framework strictly for unit tests'
      ],
      correctAnswer: 0,
      explanation: 'Kestrel is the high-performance cross-platform web server that powers ASP.NET Core applications across Windows, Linux, and macOS.'
    }
  },
  {
    id: 'dotnet-day-25',
    day: 25,
    sprint: 3,
    title: 'Day 25: ASP.NET Core 9 Minimal APIs & RESTful Endpoints',
    slug: 'day-25-aspnet-core-minimal-apis-rest',
    category: 'ASP.NET Core Web API',
    estimatedTime: '2 Hours',
    difficulty: 'Intermediate',
    objectives: [
      'Create an ultra-lightweight REST API with .NET 9 Minimal APIs',
      'Map HTTP verbs (MapGet, MapPost, MapPut, MapDelete)',
      'Inject DbContext directly into route handler delegates',
      'Implement TypedResults (Results.Ok, Results.Created, Results.NotFound)'
    ],
    concept: {
      overview: 'ASP.NET Core Minimal APIs allow building high-performance, microservices-ready HTTP APIs with zero controller ceremony. In .NET 9, Minimal APIs have superior throughput, lower memory footprints, and native support for OpenAPI/Swagger.',
      keyPoints: [
        'var app = WebApplication.Create(args); configures the Kestrel server in 1 line',
        'app.MapGet("/api/items", handler) binds routes directly',
        'TypedResults provides compile-time type safety for Swagger OpenAPI documentation',
        'Native dependency injection resolves DbContext or services automatically in route parameters'
      ],
      analogy: 'If traditional MVC Controllers are a full multi-story commercial kitchen, Minimal APIs are a lightning-fast food truck: ultra-fast, focused, and delivering maximum flavor with minimal overhead.'
    },
    teacherDemo: {
      title: 'Production-Ready CRUD Minimal API with TypedResults in .NET 9',
      explanation: 'Notice how complete CRUD endpoints with status codes (200, 201, 404) are declared in under 35 lines.',
      language: 'csharp',
      code: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var todos = new List<string> { "Learn C# 12", "Master EF Core", "Deploy to Azure" };

app.MapGet("/api/todos", () => TypedResults.Ok(todos));

app.MapGet("/api/todos/{id:int}", (int id) =>
    id >= 0 && id < todos.Count 
        ? TypedResults.Ok(todos[id]) 
        : Results.NotFound(new { Message = $"Todo #{id} not found." }));

app.MapPost("/api/todos", (string newTodo) =>
{
    todos.Add(newTodo);
    return TypedResults.Created($"/api/todos/{todos.Count - 1}", newTodo);
});

app.Run();`
    },
    practicalLab: {
      labTitle: 'Build a Books REST API with Minimal APIs',
      labDescription: 'Create a Minimal API with endpoints to GET all books, GET book by id, POST new book, and DELETE book.',
      targetFolder: 'dotnet-day-25',
      primaryFile: 'Program.cs',
      cliCommand: 'dotnet new web -n BooksMinimalApi\ncd BooksMinimalApi\ncode .',
      starterCode: `// Day 25 Starter Code
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
// TODO: Map /api/books endpoints
app.Run();`,
      solutionCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

record Book(int Id, string Title, string Author, decimal Price);
var books = new List<Book> { new(1, "Clean Architecture", "Robert Martin", 1299m) };

app.MapGet("/api/books", () => TypedResults.Ok(books));
app.MapPost("/api/books", (Book b) => { books.Add(b); return TypedResults.Created($"/api/books/{b.Id}", b); });

app.Run();`,
      tasks: [
        {
          id: 'task-1',
          title: 'Implement MapGet and MapPost',
          instruction: 'Use app.MapGet and app.MapPost to handle HTTP endpoints.',
          hint: 'TypedResults.Ok(data) returns HTTP 200.',
          validatorKeywords: ['MapGet', 'MapPost']
        }
      ]
    },
    debuggingChallenge: {
      title: 'Fix Route Parameter Type Mismatch',
      buggyCode: `// Buggy C# Code
app.MapGet("/api/items/{id}", (int id) => Results.Ok(id)); // Request to /api/items/abc causes unhandled 400 or 500 error`,
      bugExplanation: 'Without route constraints, invalid string parameters throw formatting errors. Add the :int route constraint ({id:int}) to automatically filter non-integer requests.',
      fixedCode: `app.MapGet("/api/items/{id:int}", (int id) => Results.Ok(id));`
    },
    githubWorkflow: {
      repoName: 'dotnet-learning-hub',
      commitMessage: 'feat(day25): aspnet core 9 minimal api crud endpoints',
      commands: [
        'git add .',
        'git commit -m "feat(day25): aspnet core 9 minimal api crud endpoints"',
        'git push origin main'
      ],
      tips: 'Test your endpoints with curl, Postman, or VS Code REST Client (.http files).'
    },
    vivaCheck: {
      question: 'Why are Minimal APIs often preferred over classic Controller classes in modern microservices?',
      options: [
        'They offer significantly lower memory overhead and higher throughput by bypassing reflection-heavy Controller activations',
        'Controllers were deprecated in .NET 9',
        'Minimal APIs do not support JSON serialization',
        'Minimal APIs can only run on Linux'
      ],
      correctAnswer: 0,
      explanation: 'Minimal APIs eliminate the reflection and middleware overhead associated with traditional MVC controllers, resulting in substantially faster cold starts and higher requests-per-second.'
    }
  },
  {
    id: 'dotnet-day-30',
    day: 30,
    sprint: 3,
    title: 'Day 30: JWT Authentication & Role-Based Authorization in .NET',
    slug: 'day-30-jwt-authentication-role-authorization',
    category: 'Security & Auth',
    estimatedTime: '2 Hours',
    difficulty: 'Advanced',
    objectives: [
      'Understand JSON Web Tokens (Header, Payload, Signature)',
      'Configure AddAuthentication and AddJwtBearer in Program.cs',
      'Generate cryptographically signed JWT tokens with Claims (UserId, Roles)',
      'Protect endpoints using [Authorize] and [Authorize(Roles = "Admin")]'
    ],
    concept: {
      overview: 'Modern stateless APIs do not store session cookies on the server. Instead, upon successful authentication, the server generates a cryptographically signed JWT. The client includes this token in the Authorization: Bearer <token> header for every subsequent request.',
      keyPoints: [
        'JWT tokens are stateless and contain signed user claims',
        'AddJwtBearer validates Issuer, Audience, Lifetime, and IssuerSigningKey',
        'ClaimsPrincipal exposes user info via User.Identity.Name or User.Claims',
        'Role-based access control (RBAC) restricts endpoints to authorized roles'
      ],
      analogy: 'A JWT is like a sealed, hologram-stamped VIP concert wristband. Security guards at each door don\'t need to call the front desk; they simply inspect the tamper-evident stamp on the wristband.'
    },
    teacherDemo: {
      title: 'Generating and Validating JWT Tokens in ASP.NET Core',
      explanation: 'Notice how claims (sub, email, role) are embedded into the token with HMAC-SHA256 signature.',
      language: 'csharp',
      code: `using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

string GenerateJwtToken(string userId, string email, string role, string secretKey)
{
    var tokenHandler = new JwtSecurityTokenHandler();
    var key = Encoding.UTF8.GetBytes(secretKey);

    var tokenDescriptor = new SecurityTokenDescriptor
    {
        Subject = new ClaimsIdentity(new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, userId),
            new Claim(JwtRegisteredClaimNames.Email, email),
            new Claim(ClaimTypes.Role, role)
        }),
        Expires = DateTime.UtcNow.AddHours(2),
        Issuer = "NextSemAcademy",
        Audience = "NextSemStudents",
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
    };

    var token = tokenHandler.CreateToken(tokenDescriptor);
    return tokenHandler.WriteToken(token);
}

string sampleToken = GenerateJwtToken("usr-101", "manoj@nextsem.online", "Admin", "SuperSecretKeyWithAtLeast32BytesLength!");
Console.WriteLine($"Generated Token (Prefix): {sampleToken[..40]}...");`
    },
    practicalLab: {
      labTitle: 'Secure an Admin Endpoint with [Authorize(Roles = "Admin")]',
      labDescription: 'Configure JWT Bearer middleware and create a public /api/login endpoint and a protected /api/admin/metrics endpoint.',
      targetFolder: 'dotnet-day-30',
      primaryFile: 'Program.cs',
      cliCommand: 'dotnet new web -n SecureJwtApi\ncd SecureJwtApi\ndotnet add package Microsoft.AspNetCore.Authentication.JwtBearer\ncode .',
      starterCode: `// Day 30 Starter Code
// TODO: Configure builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)`,
      solutionCode: `using Microsoft.AspNetCore.Authorization;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAuthentication().AddJwtBearer();
builder.Services.AddAuthorization();
var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/api/public", () => "Free access for all students!");
app.MapGet("/api/admin/metrics", [Authorize(Roles = "Admin")] () => new { Revenue = 950000, ServerLoad = "12%" });

app.Run();`,
      tasks: [
        {
          id: 'task-1',
          title: 'Add UseAuthentication and UseAuthorization',
          instruction: 'Ensure both middlewares are placed in correct pipeline order.',
          hint: 'Authentication must always precede Authorization.',
          validatorKeywords: ['UseAuthentication', 'UseAuthorization']
        }
      ]
    },
    debuggingChallenge: {
      title: 'Fix 401 Unauthorized Caused by Wrong Middleware Pipeline Order',
      buggyCode: `// Buggy C# Code
app.UseAuthorization();  // Bug: Authorization runs BEFORE Authentication!
app.UseAuthentication(); // User is not authenticated yet when authorization checks run`,
      bugExplanation: 'In ASP.NET Core, the order of middleware in Program.cs matters strictly. app.UseAuthentication() MUST come before app.UseAuthorization().',
      fixedCode: `app.UseAuthentication();
app.UseAuthorization();`
    },
    githubWorkflow: {
      repoName: 'dotnet-learning-hub',
      commitMessage: 'feat(day30): jwt authentication and role-based authorization',
      commands: [
        'git add .',
        'git commit -m "feat(day30): jwt authentication and role-based authorization"',
        'git push origin main'
      ],
      tips: 'Never commit hardcoded JWT secrets. Always load them from environment variables or User Secrets.'
    },
    vivaCheck: {
      question: 'What is the correct pipeline order for Authentication and Authorization in ASP.NET Core?',
      options: [
        'app.UseAuthentication() must always come before app.UseAuthorization()',
        'app.UseAuthorization() must come before app.UseAuthentication()',
        'Both can be placed anywhere randomly in the pipeline',
        'Neither is required if using HTTPS'
      ],
      correctAnswer: 0,
      explanation: 'Authentication establishes "who you are", while Authorization verifies "what you are allowed to do". Therefore, Authentication must execute before Authorization can check roles or policies.'
    }
  },
  {
    id: 'dotnet-day-31',
    day: 31,
    sprint: 4,
    title: 'Day 31: Full Stack Blazor WebAssembly Setup, Components & State',
    slug: 'day-31-blazor-wasm-setup',
    category: 'Full Stack .NET & Blazor',
    estimatedTime: '2 Hours',
    difficulty: 'Intermediate',
    objectives: [
      'Understand how Blazor runs real C# directly inside the browser using WebAssembly',
      'Create interactive Razor components (.razor) with @code blocks and two-way data binding (@bind)',
      'Manage component lifecycle methods (OnInitializedAsync, StateHasChanged)',
      'Consume backend REST APIs directly in C# using HttpClient in the browser'
    ],
    concept: {
      overview: 'Blazor is Microsoft\'s game-changing UI framework that lets you build modern, interactive single-page web applications (SPAs) using C# instead of JavaScript. In Blazor WebAssembly, your compiled C# assemblies run directly client-side inside the browser sandbox using standard WebAssembly (Wasm).',
      keyPoints: [
        'Blazor WebAssembly runs compiled .NET code client-side without any browser plugins',
        'Share C# DTO records and validation logic directly between your backend and frontend',
        'Razor syntax combines HTML markup with inline C# expressions using the @ symbol',
        'SignalR enables real-time two-way web socket communication with zero polling'
      ],
      analogy: 'Historically, building full-stack apps was like having to speak Spanish (JavaScript) in the front yard and German (C#) inside the house. Blazor lets you speak your favorite native language (C#) everywhere—both in the browser and on the server—sharing the exact same models and logic.',
      simpleTheory: {
        plainEnglishSummary: 'Blazor is a frontend web framework from Microsoft that lets you write interactive website user interfaces using C# instead of JavaScript. Instead of writing React or Angular in JS, you write C# and HTML in a file called a Razor component (.razor). The browser executes your C# code at near-native speed using WebAssembly.',
        howDotnetWorksUnderTheHood: [
          '1. WebAssembly (Wasm) Engine: Modern browsers (Chrome, Edge, Safari) have a built-in virtual machine that executes binary Wasm instructions.',
          '2. dotnet.wasm Runtime: Microsoft created a lightweight .NET runtime compiled down to WebAssembly that downloads once into browser cache.',
          '3. Browser DOM Manipulation: When you click a button, Blazor computes a virtual DOM diff and applies minimal updates to the browser HTML tree.',
          '4. Zero Plugin Architecture: Operates on 100% open web standards (HTML5 + Wasm); requires no Silverlight or browser extensions.'
        ],
        whyEnterprisesUseIt: 'Enterprises love Blazor because their C# backend engineers can build full-stack enterprise portals without retraining entire engineering teams in the constantly shifting JavaScript ecosystem. It enables 100% code sharing for validation, models, and calculation formulas.',
        goldenRules: [
          'Keep components small, focused, and reusable.',
          'Always use OnInitializedAsync() for loading data from backend Web APIs.',
          'Avoid heavy synchronous calculations on the UI thread to keep the browser 60 FPS smooth.'
        ],
        beginnerPitfalls: [
          'Never put database connection strings or secret API keys in Blazor WebAssembly code. Blazor WASM code runs on the user\'s client device and can be inspected.'
        ]
      }
    },
    teacherDemo: {
      title: 'Interactive Razor Component with Two-Way Binding in Blazor',
      explanation: 'Notice how UI state and user inputs are bound directly to C# fields without writing a single line of JavaScript.',
      language: 'csharp',
      code: `@page "/counter"

<div class="p-6 bg-slate-900 text-white rounded-2xl max-w-md">
    <h3 class="text-xl font-bold mb-2">🚀 Interactive Blazor Counter</h3>
    <p class="text-sm text-slate-400 mb-4">Current count: <span class="font-extrabold text-blue-400">@currentCount</span></p>

    <div class="flex gap-2">
        <button class="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-sm" @onclick="IncrementCount">
            Increment +1
        </button>
        <button class="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-xl font-bold text-sm" @onclick="ResetCount">
            Reset
        </button>
    </div>
</div>

@code {
    private int currentCount = 0;

    private void IncrementCount()
    {
        currentCount++;
    }

    private void ResetCount()
    {
        currentCount = 0;
    }
}`
    },
    practicalLab: {
      labTitle: 'Build a Live Student Course Directory in Blazor WASM',
      labDescription: 'Create a Blazor component that fetches and renders a list of courses with client-side search filtering.',
      targetFolder: 'dotnet-day-31',
      primaryFile: 'Pages/CourseDirectory.razor',
      cliCommand: 'dotnet new blazorwasm -n StudentPortalApp\ncd StudentPortalApp\ncode .',
      starterCode: `// Day 31 Starter Code
// Create CourseDirectory.razor with @page "/courses"`,
      solutionCode: `@page "/courses"
@inject HttpClient Http

<h3>Course Directory</h3>
<input class="p-2 border rounded" placeholder="Search..." @bind="searchTerm" @bind:event="oninput" />

<ul class="mt-4 space-y-2">
    @foreach (var course in FilteredCourses)
    {
        <li class="p-3 bg-slate-100 rounded">@course</li>
    }
</ul>

@code {
    private string searchTerm = "";
    private List<string> courses = ["BCA Cloud Computing", "Full Stack .NET", "Data Science with C#"];
    private IEnumerable<string> FilteredCourses =>
        string.IsNullOrWhiteSpace(searchTerm) ? courses : courses.Where(c => c.Contains(searchTerm, StringComparison.OrdinalIgnoreCase));
}`,
      tasks: [
        {
          id: 'task-1',
          title: 'Implement Two-Way Binding with @bind',
          instruction: 'Use @bind to synchronize input text with a C# component variable.',
          hint: 'Syntax: <input @bind="variableName" />',
          validatorKeywords: ['@bind', '@code']
        }
      ]
    },
    debuggingChallenge: {
      title: 'Fix UI Not Updating After Background Event in Blazor',
      buggyCode: `// Buggy C# Code inside a background timer or SignalR callback
timer.Elapsed += (s, e) =>
{
    unreadMessageCount++;
    // UI does not update on screen! Why?
};`,
      bugExplanation: 'When state changes occur outside the normal Blazor event lifecycle (such as timers, background threads, or web sockets), you must explicitly invoke StateHasChanged() on the UI thread.',
      fixedCode: `timer.Elapsed += async (s, e) =>
{
    unreadMessageCount++;
    await InvokeAsync(StateHasChanged);
};`
    },
    githubWorkflow: {
      repoName: 'dotnet-learning-hub',
      commitMessage: 'feat(day31): blazor webassembly component architecture and state management',
      commands: [
        'git add .',
        'git commit -m "feat(day31): blazor webassembly component architecture and state management"',
        'git push origin main'
      ],
      tips: 'Commit the wwwroot static assets and razor components cleanly in your repository.'
    },
    vivaCheck: {
      question: 'How does Blazor WebAssembly execute C# code inside web browsers?',
      options: [
        'It runs a lightweight .NET runtime compiled down to WebAssembly (Wasm) inside the browser sandbox',
        'It converts C# code into Flash player animations',
        'It requires the user to install a special Windows desktop program',
        'It translates C# into assembly language on the server and streams video frames'
      ],
      correctAnswer: 0,
      explanation: 'Blazor WebAssembly downloads a compact .NET runtime (dotnet.wasm) into the browser sandbox, allowing real C# assemblies to run directly on the client CPU using open web standards.'
    }
  },
  {
    id: 'dotnet-day-41',
    day: 41,
    sprint: 5,
    title: 'Day 41: Clean Architecture, Domain Driven Design & CQRS with MediatR',
    slug: 'day-41-clean-architecture-cqrs-mediatr',
    category: 'Clean Architecture & Cloud',
    estimatedTime: '2 Hours',
    difficulty: 'Advanced',
    objectives: [
      'Master the 4 layers of Clean Architecture (Domain, Application, Infrastructure, Presentation)',
      'Implement CQRS (Command Query Responsibility Segregation) pattern',
      'Decouple business use-cases using MediatR (IRequest<T> and IRequestHandler<TReq, TRes>)',
      'Enforce the Dependency Inversion Principle where outer layers depend on inner core'
    ],
    concept: {
      overview: 'Clean Architecture (popularized by Robert C. Martin "Uncle Bob") organizes software into concentric circles of responsibility. The core business rules (Domain & Application) remain completely independent of UI frameworks, database engines, and third-party cloud SDKs.',
      keyPoints: [
        'Domain Layer has zero external dependencies; pure enterprise business logic and entities',
        'Application Layer defines use cases, DTOs, and CQRS commands/queries via MediatR',
        'Infrastructure Layer implements database access (EF Core), cloud services, and email providers',
        'Presentation Layer (Web API, Blazor) acts purely as an entry-point adapter'
      ],
      analogy: 'Think of Clean Architecture like a high-end luxury watch. The golden gears (Domain logic) are protected inside a sealed case. The watch strap (UI) or the battery (Database) can be swapped in 2 minutes without ever touching or damaging the precious internal movement.',
      simpleTheory: {
        plainEnglishSummary: 'Clean Architecture is a proven blueprint used by big tech companies to build large software systems that never become messy or difficult to change. Instead of putting database code, business logic, and UI code all in the same folder, Clean Architecture splits the project into 4 distinct layers with clear rules about who can talk to whom. If you ever change your database from SQL Server to PostgreSQL, you only rewrite 1 layer—the core business logic stays 100% untouched!',
        howDotnetWorksUnderTheHood: [
          '1. Inversion of Control: The Application layer defines interfaces (e.g. ICustomerRepository). The Infrastructure layer implements them.',
          '2. MediatR Dispatcher: Commands (e.g. CreateOrderCommand) are sent via _mediator.Send(cmd). MediatR uses reflection and DI to locate and execute the exact handler in microseconds.',
          '3. Pipeline Behaviors: MediatR supports global cross-cutting pipeline behaviors (logging, validation, performance profiling) that wrap around every request automatically.',
          '4. Zero Circular Dependencies: The .NET build engine enforces the strict directional dependency flow at compile time.'
        ],
        whyEnterprisesUseIt: 'Enterprises use Clean Architecture because it prevents multi-million dollar software rewrites. Teams can have 50 developers working in parallel without stepping on each other\'s toes, and unit tests execute in milliseconds without needing a real database.',
        goldenRules: [
          'The Domain layer must never reference Entity Framework, ASP.NET Core, or any external NuGet package.',
          'Keep commands (write operations) separated from queries (read operations) using CQRS.',
          'Validate input data in the Application layer using FluentValidation before passing it to handlers.'
        ],
        beginnerPitfalls: [
          'Do NOT leak database entities directly into API responses. Always project entities into DTO records in the Application layer.'
        ]
      }
    },
    teacherDemo: {
      title: 'CQRS Command and Handler Implementation with MediatR in .NET 9',
      explanation: 'See how the business command and its handler are completely decoupled from ASP.NET Core controllers.',
      language: 'csharp',
      code: `using MediatR;

// 1. CQRS Command (Write Operation)
public record RegisterStudentCommand(string Name, string Email, string CourseCode) : IRequest<StudentResponse>;

public record StudentResponse(int Id, string Name, string Status);

// 2. Command Handler (Pure Business Logic)
public class RegisterStudentCommandHandler : IRequestHandler<RegisterStudentCommand, StudentResponse>
{
    public async Task<StudentResponse> Handle(RegisterStudentCommand request, CancellationToken cancellationToken)
    {
        // Business logic execution: validate, persist, dispatch events
        Console.WriteLine($"[Clean Architecture] Registering student: {request.Name} ({request.Email})...");
        await Task.Delay(10, cancellationToken); // Simulating fast async persistence
        
        return new StudentResponse(101, request.Name, "Enrolled Successfully");
    }
}

// 3. Presentation Layer Endpoint (Controller or Minimal API)
// app.MapPost("/api/students", async (RegisterStudentCommand cmd, IMediator mediator) => 
//     Results.Ok(await mediator.Send(cmd)));`
    },
    practicalLab: {
      labTitle: 'Build a Clean Architecture CQRS Pipeline for Product Catalog',
      labDescription: 'Create a Clean Architecture solution structure and implement CreateProductCommand with a MediatR handler.',
      targetFolder: 'dotnet-day-41',
      primaryFile: 'Application/Products/CreateProductCommand.cs',
      cliCommand: 'dotnet new sln -n CleanStoreSolution\ndotnet new classlib -n CleanStore.Domain\ndotnet new classlib -n CleanStore.Application\ncode .',
      starterCode: `// Day 41 Starter Code
// Define CreateProductCommand : IRequest<int>`,
      solutionCode: `using MediatR;

public record CreateProductCommand(string Name, decimal Price) : IRequest<int>;

public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, int>
{
    public Task<int> Handle(CreateProductCommand request, CancellationToken cancellationToken)
    {
        Console.WriteLine($"Created product {request.Name} with price ₹{request.Price}");
        return Task.FromResult(Random.Shared.Next(1, 1000));
    }
}`,
      tasks: [
        {
          id: 'task-1',
          title: 'Declare CQRS Command with MediatR',
          instruction: 'Implement IRequest<int> on your command record.',
          hint: 'Syntax: public record CreateProductCommand(...) : IRequest<int>;',
          validatorKeywords: ['IRequest', 'IRequestHandler', 'Handle']
        }
      ]
    },
    debuggingChallenge: {
      title: 'Fix Dependency Inversion Rule Violation in Clean Architecture',
      buggyCode: `// In Domain layer:
using Microsoft.EntityFrameworkCore; // VIOLATION! Domain cannot depend on Infrastructure or ORM!
public class User : DbContext { }`,
      bugExplanation: 'The Domain layer must be pure enterprise business logic and POCOs (Plain Old CLR Objects). It must never reference database technologies like Entity Framework Core.',
      fixedCode: `// In Domain layer: Pure POCO with zero framework dependencies!
public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
}`
    },
    githubWorkflow: {
      repoName: 'dotnet-learning-hub',
      commitMessage: 'feat(day41): clean architecture cqrs mediatr pattern implementation',
      commands: [
        'git add .',
        'git commit -m "feat(day41): clean architecture cqrs mediatr pattern implementation"',
        'git push origin main'
      ],
      tips: 'Clean architecture folders make a tremendous positive impression during technical interviews.'
    },
    vivaCheck: {
      question: 'In Clean Architecture, which layer should contain database context and external API implementations?',
      options: [
        'Infrastructure Layer',
        'Domain Core Layer',
        'Application Layer',
        'Presentation Layer'
      ],
      correctAnswer: 0,
      explanation: 'The Infrastructure layer contains all external technology implementations—such as EF Core DbContext, file systems, third-party payment gateways, and email clients.'
    }
  },
  {
    id: 'dotnet-day-50',
    day: 50,
    sprint: 5,
    title: 'Day 50: Capstone Project: Production Full Stack .NET Platform on Azure',
    slug: 'day-50-capstone-full-stack-dotnet-azure-cloud',
    category: 'Enterprise Cloud',
    estimatedTime: '3 Hours',
    difficulty: 'Advanced',
    objectives: [
      'Assemble a complete multi-tier Clean Architecture .NET 9 solution',
      'Containerize ASP.NET Core Web API with multi-stage Dockerfile',
      'Set up GitHub Actions CI/CD to build, test with xUnit, and deploy',
      'Deploy live to Azure App Service / Cloud Container and link in portfolio'
    ],
    concept: {
      overview: 'Day 50 represents the ultimate milestone of your .NET enterprise journey. You build and deploy a production-grade enterprise application adhering to Clean Architecture, tested with automated xUnit suites, packaged in Docker containers, and running live on the cloud.',
      keyPoints: [
        'Clean Architecture separates Domain, Application, Infrastructure, and API layers',
        'Multi-stage Docker builds keep production images lean (< 80 MB)',
        'GitHub Actions executes automated linting and unit testing on every git push',
        'A live Azure deployment with custom domain and verified GitHub repository proves your enterprise hiring readiness'
      ],
      analogy: 'Day 50 is your graduation flight. You take all the individual cockpit controls learned over 50 days (C#, EF Core, APIs, Security, Docker) and fly a real commercial airliner from takeoff to smooth cloud landing.'
    },
    teacherDemo: {
      title: 'Multi-Stage Production Dockerfile for ASP.NET Core 9',
      explanation: 'Multi-stage builds compile using the heavy .NET SDK image, but ship only using the lightweight runtime image for maximum security and minimal size.',
      language: 'csharp',
      code: `# Multi-Stage Dockerfile for .NET 9
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["MyEnterpriseApp.csproj", "./"]
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_HTTP_PORTS=8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "MyEnterpriseApp.dll"]`
    },
    practicalLab: {
      labTitle: 'Capstone Deployment & Live Cloud Verification',
      labDescription: 'Create the complete solution, write xUnit tests, verify with docker build, and push to your GitHub repo.',
      targetFolder: 'dotnet-day-50-capstone',
      primaryFile: 'Program.cs',
      cliCommand: 'dotnet new sln -n EnterpriseDotnetCapstone\ndotnet new webapi -n Api\ndotnet new xunit -n Tests\ndotnet sln add Api/Api.csproj Tests/Tests.csproj\ncode .',
      starterCode: `// Day 50 Capstone Starter Code
// Implement final portfolio endpoints with health checks`,
      solutionCode: `var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHealthChecks();
var app = builder.Build();

app.MapGet("/", () => new
{
    Platform = "NextSem Academy .NET 9 Capstone Platform",
    Author = "Er. Manoj Kumar Mentorship Graduate",
    Status = "Production Live",
    Timestamp = DateTime.UtcNow
});
app.MapHealthChecks("/health");

app.Run();`,
      tasks: [
        {
          id: 'task-1',
          title: 'Implement Health Check Endpoint',
          instruction: 'Map /health endpoint using builder.Services.AddHealthChecks() and app.MapHealthChecks("/health").',
          hint: 'Health checks are standard for container orchestration and Kubernetes.',
          validatorKeywords: ['AddHealthChecks', 'MapHealthChecks']
        }
      ]
    },
    debuggingChallenge: {
      title: 'Fix Docker Container Port Binding in .NET 8/9',
      buggyCode: `// In .NET 8 and 9, the non-root container user binds to port 8080 by default, NOT port 80!
EXPOSE 80 # Fails because non-root user cannot bind to privileged ports (< 1024)`,
      bugExplanation: 'In modern .NET container images, the default user is app (non-root) for security, which listens on port 8080.',
      fixedCode: `EXPOSE 8080
ENV ASPNETCORE_HTTP_PORTS=8080`
    },
    githubWorkflow: {
      repoName: 'dotnet-learning-hub',
      commitMessage: 'feat(day50): capstone completed 50-day enterprise dotnet engineer certification',
      commands: [
        'git add .',
        'git commit -m "feat(day50): capstone completed 50-day enterprise dotnet engineer certification"',
        'git push origin main'
      ],
      tips: 'Pin your dotnet-learning-hub repository to your GitHub profile and add your live cloud URL to your resume!'
    },
    vivaCheck: {
      question: 'What is the primary security advantage of using non-root container users in .NET 8/9 Docker images?',
      options: [
        'If an attacker compromises the container, they do not obtain root host access on the cloud server',
        'It speeds up database transactions automatically',
        'It prevents the application from consuming any RAM',
        'It automatically purchases Azure licenses'
      ],
      correctAnswer: 0,
      explanation: 'Running container workloads as non-root (app user) limits the blast radius of container escape attacks, adhering to the principle of least privilege.'
    }
  }
];

/* ══════════════════════════════════════════════════════════════════════════
   3. HELPER UTILITIES
   ══════════════════════════════════════════════════════════════════════════ */
export function getDotnetLessonBySlug(slug: string): DotnetLesson | undefined {
  return DOTNET_LESSONS.find(lesson => lesson.slug === slug || lesson.id === slug);
}

export function getDotnetLessonByDay(day: number): DotnetLesson | undefined {
  return DOTNET_LESSONS.find(lesson => lesson.day === day);
}

export function getNextDotnetDayNumber(completedDays: number[] = []): number {
  return Array.from({ length: 50 }, (_, i) => i + 1).find(d => !completedDays.includes(d)) || 1;
}

export function getNextDotnetDayUrl(completedDays: number[] = []): string {
  const nextDay = getNextDotnetDayNumber(completedDays);
  const lesson = getDotnetLessonByDay(nextDay);
  if (lesson) {
    return `/practical/dotnet/${lesson.slug}`;
  }
  const firstLesson = DOTNET_LESSONS[0];
  return firstLesson ? `/practical/dotnet/${firstLesson.slug}` : `/practical/dotnet/day-01-dotnet-sdk-first-cli-app`;
}
