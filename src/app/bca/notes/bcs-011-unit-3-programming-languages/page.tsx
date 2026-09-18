"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, BookOpen, Sparkles, Check, HelpCircle, AlertCircle, 
  Award, ChevronRight, ChevronLeft, Zap, Menu, X, Star, FileText,
  Eye, EyeOff, Lightbulb, RotateCcw, Compass, CheckCircle2, Trophy,
  Code, Terminal, HelpCircle as QuestionIcon, FileQuestion, BookMarked
} from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';
import BcaHeaderNav from '@/components/bca/BcaHeaderNav';

interface BlankItem {
  num: number;
  initial: string;
  answer: string;
  hint: string;
}

interface PageLesson {
  pageNo: number;
  bookPage: number;
  section: string;
  title: string;
  originalText: string;
  explanationEn: string;
  explanationHi: string;
  blanks: BlankItem[];
  mcq: {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
  };
}

const LESSONS: PageLesson[] = [
  {
    pageNo: 1,
    bookPage: 65,
    section: "Section 3.3",
    title: "Concept of Programming Language & Primitive Building Blocks",
    originalText: "In order to communicate with other human beings, one needs some language or a medium. In the same way for solving problems, a programming language is required in order to communicate with the computer. A Programming Language is used to design and describe a set of instructions/actions for the computation that we wish to be executed by the computer.\n\nFirst an algorithm is designed which solves the problem in question. In the next step, the algorithm is expressed in the form of a program. For this one should have a sound knowledge of some programming language. A program written in a particular Programming Language can control the behavior of a computer and perform a designated task to generate the desired output for any given input.\n\nProgram and Programming Language : A Program is defined as a collection of statements/ instructions that enable the computer to solve a problem. The process of writing a program is called programming. Statements in a program should be well formed sentences. Each Programming Language has some basic building blocks called the primitive building blocks. These blocks are defined by basic components that have an associate Syntax and Semantics. Syntax provides structure and semantic provides meaning to it. Different computer programming languages have different advantages and disadvantages to their use. Hence different application domains based on their requirement and functionality may choose any one of the available programming languages suitable for the task.",
    explanationEn: "🗣️ **Why Do We Need a Programming Language?**\n• Humans use natural languages (English, Hindi) to communicate ideas. Similarly, we require a **programming language** to communicate instructions and logic to a digital computer.\n• **Two-Step Problem-Solving Pipeline**:\n  1. 🧠 **Algorithm**: First, design a clear step-by-step logic or blueprint that solves the problem.\n  2. 💻 **Program**: Next, express that algorithm in the formal syntax of a programming language.\n• **Controlling Computer Behavior**: Instructions executed on CPU registers and memory control hardware actions to transform raw input into desired output.\n\n🧱 **Core Definitions & Building Blocks**:\n• **Program**: A structured collection of statements/instructions enabling a computer to solve a problem.\n• **Programming**: The process of designing, writing, testing, and maintaining a program.\n• **Primitive Building Blocks**: Fundamental language elements governed by two pillars:\n  - 📐 **Syntax**: Provides the grammatical **structure** and formation rules.\n  - 💡 **Semantics**: Provides the operational **meaning** and execution logic behind statements.\n• **Domain Adaptation**: Different tasks demand different languages (e.g. C/C++ for OS kernels, Python for AI/Data Science, JavaScript for Web, and SQL for Databases).",
    explanationHi: "🗣️ **प्रोग्रामिंग लैंग्वेज की आवश्यकता क्यों है?**\n• जिस प्रकार इंसान आपस में बातचीत करने के लिए भाषा का उपयोग करते हैं, उसी प्रकार कंप्यूटर से काम कराने और संवाद स्थापित करने के लिए **Programming Language** की जरूरत होती है।\n• **समस्या समाधान के 2 चरण**:\n  1. 🧠 **एल्गोरिदम (Algorithm)**: पहले समस्या को हल करने का क्रमबद्ध लॉजिक (Step-by-step logic) बनाया जाता है।\n  2. 💻 **प्रोग्राम (Program)**: फिर उस एल्गोरिदम को किसी प्रोग्रामिंग भाषा के माध्यम से कोड में बदला जाता है।\n\n🧱 **Syntax और Semantics का मूल अंतर**:\n• **Syntax (वाक्य संरचना)**: यह भाषा का ग्रामर और ढांचा निर्धारित करता है (कि वाक्य कैसे लिखा जाएगा)।\n• **Semantics (अर्थ)**: यह स्टेटमेंट का वास्तविक अर्थ और कार्य निर्धारित करता है कि कोड असल में क्या निष्पादित करेगा।\n• **डोमेन चयन**: आवश्यकता अनुसार उपयुक्त भाषा चुनी जाती है (जैसे सिस्टम सॉफ्टवेयर के लिए C/C++, वेब के लिए JS, डेटा साइंस के लिए Python)।",
    blanks: [
      { num: 1, initial: "p", answer: "programming language", hint: "A medium used to design and describe computational instructions for a computer" },
      { num: 2, initial: "a", answer: "algorithm", hint: "Step-by-step problem-solving procedure designed before writing code" },
      { num: 3, initial: "p", answer: "program", hint: "A collection of statements/instructions that enable the computer to solve a problem" },
      { num: 4, initial: "s", answer: "syntax", hint: "Language component that provides grammatical structure to statements" },
      { num: 5, initial: "s", answer: "semantics", hint: "Language component that provides operational meaning to formulated statements" }
    ],
    mcq: {
      question: "In a programming language, what role do Syntax and Semantics respectively play?",
      options: [
        "Syntax provides structure, while Semantics provides meaning",
        "Semantics provides structure, while Syntax provides meaning",
        "Syntax compiles machine code, while Semantics links libraries",
        "Both Syntax and Semantics define only memory address allocation"
      ],
      answer: 0,
      explanation: "According to Section 3.3, Syntax provides structure (the grammatical rules) and Semantics provides meaning (the interpretation and operational effect) to statements."
    }
  },
  {
    pageNo: 2,
    bookPage: 66,
    section: "Section 3.3.1",
    title: "Syntax, The Grammar Quadruplet L(T, N, P, S) & BNF Notation",
    originalText: "Syntax provides the structure and how to formulate the phrase or sentence w.r.t grammar of the language. It tells us about which composition is allowed from the character set of the language. Each sentence must be a well formed sentence according to the grammar of the language. The grammar is expressed in a Number of rules that will be finite and these allow the formulation of any number of sentences. A language is defined in the form a quadruplet L(T,N,P,S) where T is set of terminals, N is a set of non terminals, P is set of productions or rules and S is the start symbol. For any language we must have an alphabet/character set, operators and rules. To form a grammar w.r.t a language rules need to be formed. The basic structure of rule is LHS and RHS with some set of terminal and non terminal symbol.\n\nSyntax comprises grammar and vocabulary whereas syntactic analysis is known as parsing. Semantics provides the meaning for the formulated /composed phrase or word or sentence. Semantic function can be incorporated inside the logic of a compiler or interpreter which evaluates ordering of statements for execution.\n\nS-> A\nA->Ab | b i.e any word with sequence of any number of occurrence of character b\n\nStart symbol:\nHere S is start symbol. Any sentence will start with start symbol only.\nIn respect of BNF notation it is as follows:\nL(T,N,P,S)\nT={b}\nN={A}\nP={S->A, A->Ab}\nS=Start sybmol\n\nExample grammar:\n\nProgram: statement\nStatement: stmt| stmt\nStmt: var=expression\nVar:a|b\nExpression: term +term | term-term\nTerm: var/const\n\ne.g x=y+2\n\nSimilarly\n\nSentence: subject,verb,object\nSubject: noun/article\n\ne.g Ram ate biscuits.",
    explanationEn: "📐 **Syntax & Parsing (Syntactic Analysis)**:\n• **Syntax Rules**: Dictates which compositions of characters from the language alphabet are legally permitted.\n• **Finite Rules ➔ Infinite Expressiveness**: A finite set of grammar rules allows the construction of an infinite number of valid programs.\n• **Parsing**: The syntactic analysis stage of a compiler/interpreter that verifies source code against grammar rules and builds a parse tree.\n• **Semantics in Compilers**: Evaluates statement ordering, type correctness, and ensures runtime behavior corresponds to developer intent.\n\n🏛️ **The Language Grammar Quadruplet: L(T, N, P, S)**:\nEvery formal language grammar is defined mathematically as a 4-tuple:\n1. 🔤 **T (Terminals)**: Atomic tokens and characters that cannot be further subdivided (e.g., `{b}`, `+`, `-`, `=`, literals).\n2. 🏷️ **N (Non-Terminals)**: Syntactic variables or placeholders that can be replaced by other symbols (e.g., `{A}`, `Program`, `Statement`).\n3. 🔄 **P (Productions / Rewrite Rules)**: Transformation rules with a Left-Hand Side (LHS) and Right-Hand Side (RHS) of the form `LHS ➔ RHS`.\n4. 🚀 **S (Start Symbol)**: The unique starting non-terminal symbol ($S \\in N$) from which every valid sentence derivation begins.\n\n📝 **BNF (Backus-Naur Form) & Derivations**:\n• Production: `S ➔ A`, `A ➔ Ab | b`\n• Generates any repetition of character `b`: `b`, `bb`, `bbb`, `bbbb`...\n• Code Example: `Stmt: var=expression` ➔ generates `x = y + 2`.\n• Natural Language Analogy: `Sentence: subject, verb, object` ➔ generates `Ram ate biscuits.`",
    explanationHi: "📐 **सिंटैक्स और पार्सिंग (Syntactic Analysis)**:\n• **Syntax**: यह तय करता है कि कैरेक्टर सेट में से कौन-कौन से शब्दों और प्रतीकों के संयोजन मान्य हैं।\n• **Parsing**: कंपाइलर या इंटरप्रेटर द्वारा व्याकरण के नियमों के अनुसार कोड की जांच करने की प्रक्रिया को पार्सिंग कहते हैं।\n• **सीमित नियम ➔ असीमित वाक्य**: व्याकरण के नियम सीमित (Finite) होते हैं, पर उनसे अनंत (Infinite) प्रोग्राम बनाए जा सकते हैं।\n\n🏛️ **भाषा का व्याकरण 4-टुपल L(T, N, P, S)**:\n1. **T (Terminals)**: मूल प्रतीक जिन्हें और आगे तोड़ा नहीं जा सकता (जैसे `{b}`, `+`, `=`, आदि)।\n2. **N (Non-Terminals)**: वे प्रतीक जिन्हें अन्य प्रतीकों में बदला जा सकता है (जैसे `{A}`, `Statement`, `Expression`)।\n3. **P (Productions)**: LHS और RHS वाले व्याकरणिक नियम (जैसे `S ➔ A`, `A ➔ Ab | b`)।\n4. **S (Start Symbol)**: वह मुख्य शुरुआती प्रतीक जिससे हर वाक्य की शुरुआत होती है।",
    blanks: [
      { num: 1, initial: "p", answer: "parsing", hint: "Syntactic analysis performed by compilers to validate grammatical correctness" },
      { num: 2, initial: "T", answer: "terminals", hint: "The set of atomic symbols in L(T, N, P, S) that cannot be replaced or decomposed" },
      { num: 3, initial: "N", answer: "non terminals", hint: "The set of variable syntactic placeholders in L(T, N, P, S)" },
      { num: 4, initial: "P", answer: "productions", hint: "The finite set of grammar transformation rules having LHS and RHS" },
      { num: 5, initial: "S", answer: "start symbol", hint: "The designated initial non-terminal from which any sentence must begin" }
    ],
    mcq: {
      question: "In the formal language grammar quadruplet L(T, N, P, S), what is syntactic analysis formally known as?",
      options: [
        "Lexical indexing",
        "Parsing",
        "Semantic mapping",
        "Assembly linking"
      ],
      answer: 1,
      explanation: "Syntactic analysis is known as parsing. It verifies whether statements adhere to the language's grammar rules."
    }
  },
  {
    pageNo: 3,
    bookPage: 67,
    section: "Section 3.3.2",
    title: "Component Derivations & Grammar Ambiguity",
    originalText: "Here each symbol on the left is described in terms of its components. Thus a program consists of statements, which are of the form of an assignment of a variable to an expression, and so on.\n\nAny number of sentences can be formed with the help of a grammar defined for a language. The grammar should be unambiguous. otherwise during syntactic analysis at some point of time it can have more than one meaning.",
    explanationEn: "🔄 **How Grammar Rules Decompose Programs**:\n• **Component Breakdown**: In every production rule, the Left-Hand Side (LHS) symbol expands into its constituent sub-components on the Right-Hand Side (RHS).\n• **Hierarchical Nesting**:\n  - A `Program` consists of `Statements`.\n  - A `Statement` can be an assignment of a `Variable` to an `Expression` (`x = y + 2`).\n  - An `Expression` breaks down into terms, operators (`+`, `-`), and constants.\n• **Generative Capacity**: A compact set of finite grammar rules can generate an infinite number of valid programs.\n\n⚠️ **Grammar Ambiguity (Crucial IGNOU Exam Concept)**:\n• **What is an Ambiguous Grammar?** A grammar is ambiguous if a single valid sentence can produce **more than one distinct parse tree** (derivation tree).\n• **Why Ambiguity Must Be Avoided in Programming Languages**:\n  - If a grammar is ambiguous, syntactic analysis cannot uniquely determine the meaning of an instruction.\n  - For example, in an ambiguous arithmetic grammar, `2 + 3 * 4` could evaluate to `20` or `14` depending on which parse tree is chosen!\n  - In conditional statements, the 'dangling else' problem can create confusion about which `if` an `else` branch attaches to.\n  - Therefore, programming language grammars **must be strictly unambiguous** so that every statement translates into exactly one unique machine instruction sequence.",
    explanationHi: "🔄 **ग्रामर नियमों द्वारा कोड का विभाजन**:\n• बाईं ओर का प्रत्येक प्रतीक (LHS) दाईं ओर अपने घटकों (Components) के रूप में वर्णित होता है।\n• जैसे: एक प्रोग्राम स्टेटमेंट्स से बनता है, और एक स्टेटमेंट किसी वेरिएबल में एक्सप्रेशन असाइन करने (`x = y + 2`) का रूप लेता है।\n\n⚠️ **Grammar Ambiguity (द्व्यर्थी व्याकरण की समस्या - महत्वपूर्ण परीक्षा प्रश्न)**:\n• **Ambiguity क्या है?** यदि किसी एक वाक्य के लिए व्याकरण दो अलग-अलग Parse Trees (व्याख्याएं) बना सकता है, तो वह व्याकरण Ambiguous कहलाता है।\n• **प्रोग्रामिंग में Ambiguity क्यों वर्जित है?**\n  - यदि व्याकरण Ambiguous होगा, तो सिंटैक्टिक एनालिसिस (Parsing) के दौरान एक ही कोड के **दो अलग-अलग अर्थ निकल सकते हैं**।\n  - कंप्यूटर को हर निर्देश का बिल्कुल सटीक और अद्वितीय (Unique) अर्थ चाहिए होता है।\n  - यदि एक कोड के दो अर्थ होंगे, तो कंपाइलर तय नहीं कर पाएगा कि कौन सा ऑपरेशन पहले चलाना है, जिससे गलत परिणाम आएंगे।",
    blanks: [
      { num: 1, initial: "c", answer: "components", hint: "The structural constituent parts on the RHS representing the symbol on the left" },
      { num: 2, initial: "u", answer: "unambiguous", hint: "Crucial grammar quality ensuring every sentence produces exactly one unique parse tree" },
      { num: 3, initial: "m", answer: "meaning", hint: "What an ambiguous grammar produces more than one of during syntactic analysis" },
      { num: 4, initial: "a", answer: "assignment", hint: "Common statement form where an expression is assigned to a variable" }
    ],
    mcq: {
      question: "Why must a programming language grammar be strictly unambiguous?",
      options: [
        "To ensure programs run on both Windows 11 and Linux",
        "Because otherwise during syntactic analysis a statement can have more than one meaning",
        "To allow variable names to have unlimited character length",
        "To eliminate the need for an Arithmetic Logic Unit (ALU)"
      ],
      answer: 1,
      explanation: "A programming language grammar must be unambiguous so that every statement yields a single, deterministic parse tree without multiple conflicting meanings during syntactic analysis."
    }
  }
];

// Master Quiz Questions covering Section 3.3
const MASTER_QUIZ = [
  {
    question: "1. What is the fundamental difference between an algorithm and a program?",
    options: [
      "An algorithm is written in binary machine code, while a program is written in English",
      "An algorithm is a conceptual step-by-step problem-solving procedure, while a program expresses that algorithm in a specific programming language",
      "An algorithm can only run on 🪟 Windows 11, while a program runs on any operating system",
      "An algorithm requires a compiler, while a program does not require any execution medium"
    ],
    answer: 1,
    explanation: "First, an algorithm is designed to solve a problem in question. Then, it is translated into a program using a programming language."
  },
  {
    question: "2. Which two foundational components define the primitive building blocks of any programming language?",
    options: [
      "Hardware and Peripherals",
      "Syntax and Semantics",
      "RAM and Cache",
      "Input and Output"
    ],
    answer: 1,
    explanation: "Section 3.3 states that primitive building blocks are defined by basic components having associated Syntax (structure) and Semantics (meaning)."
  },
  {
    question: "3. What is the formal mathematical representation of a language grammar?",
    options: [
      "A doublet L(Input, Output)",
      "A triplet L(RAM, CPU, ROM)",
      "A quadruplet L(T, N, P, S)",
      "A quintuplet L(Bit, Byte, Nibble, Word, Block)"
    ],
    answer: 2,
    explanation: "A language grammar is defined as a 4-tuple / quadruplet L(T, N, P, S) containing Terminals (T), Non-terminals (N), Productions (P), and a Start Symbol (S)."
  },
  {
    question: "4. In the quadruplet L(T, N, P, S), what is the role of the Start Symbol (S)?",
    options: [
      "It terminates program execution when memory overflows",
      "It represents the designated non-terminal from which any sentence in the language must begin derivation",
      "It counts the number of lines of code in a source file",
      "It converts source code directly into executable binary machine instructions"
    ],
    answer: 1,
    explanation: "Here S is the start symbol. Any sentence in the language begins its derivation from the start symbol only."
  },
  {
    question: "5. What do the symbols T and N represent respectively in L(T, N, P, S)?",
    options: [
      "T = Total memory, N = Network bandwidth",
      "T = Set of terminals, N = Set of non-terminals",
      "T = Thread count, N = Null pointers",
      "T = Time slice, N = Numeric constants"
    ],
    answer: 1,
    explanation: "T represents the finite set of terminal symbols (tokens that cannot be rewritten), while N represents non-terminals (syntactic placeholders)."
  },
  {
    question: "6. What is the process of syntactic analysis in a compiler or interpreter known as?",
    options: [
      "Parsing",
      "Paging",
      "Pipelining",
      "Polymorphism"
    ],
    answer: 0,
    explanation: "Section 3.3.1 explicitly states: 'Syntax comprises grammar and vocabulary whereas syntactic analysis is known as parsing.'"
  },
  {
    question: "7. Consider the BNF production: S -> A, A -> Ab | b. What kind of words does this grammar generate?",
    options: [
      "Only the single character 'A'",
      "Any sequence of any number of occurrences of the character 'b' (e.g. b, bb, bbb...)",
      "Only two characters 'Ab'",
      "All lowercase English alphabets from a to z"
    ],
    answer: 1,
    explanation: "As stated on textbook page 66: 'A -> Ab | b i.e any word with sequence of any number of occurrence of character b'."
  },
  {
    question: "8. Where is the semantic evaluation function incorporated inside language translation software?",
    options: [
      "Inside the physical BIOS chip",
      "Inside the logic of a compiler or interpreter which evaluates ordering of statements for execution",
      "Exclusively inside the external optical disc drive",
      "Inside the power supply voltage regulator"
    ],
    answer: 1,
    explanation: "The textbook notes: 'Semantic function can be incorporated inside the logic of a compiler or interpreter which evaluates ordering of statements for execution.'"
  },
  {
    question: "9. Why must a grammar for a programming language be unambiguous?",
    options: [
      "Because otherwise during syntactic analysis at some point of time it can have more than one meaning",
      "Because ambiguous grammars consume double the physical disk space",
      "Because ambiguous grammars prevent the installation of ⊞ Windows",
      "Because unambiguous grammars eliminate the need for programmers to write comments"
    ],
    answer: 0,
    explanation: "Page 67 states: 'The grammar should be unambiguous. otherwise during syntactic analysis at some point of time it can have more than one meaning.'"
  },
  {
    question: "10. In the sample grammar on page 66: 'Stmt: var=expression', which real-world code statement does it model?",
    options: [
      "print('Hello World')",
      "x = y + 2",
      "return 0",
      "while (true)"
    ],
    answer: 1,
    explanation: "The textbook demonstrates this rule with the exact concrete assignment expression: 'e.g x=y+2'."
  }
];

export default function Bcs011Unit3ProgrammingLanguagePage() {
  const router = useRouter();
  const { markCompleted } = useProgress();
  
  const [activeTab, setActiveTab] = useState<'notes' | 'quiz' | 'exam_qa'>('notes');
  const [currentPageIdx, setCurrentPageIdx] = useState(0);
  const [selectedLang, setSelectedLang] = useState<'both' | 'en' | 'hi'>('both');
  
  // MCQ state: pageIndex -> selected option index
  const [selectedMcqs, setSelectedMcqs] = useState<{ [pageIdx: number]: number }>({});
  
  // Blank interactive input: `${pageIdx}-${blankNum}` -> user string
  const [userBlankInputs, setUserBlankInputs] = useState<{ [key: string]: string }>({});
  const [revealedHints, setRevealedHints] = useState<{ [key: string]: boolean }>({});
  const [revealedAnswers, setRevealedAnswers] = useState<{ [key: string]: boolean }>({});

  const [completedPages, setCompletedPages] = useState<number[]>([]);
  const [userEmail, setUserEmail] = useState('guest');

  // Master Quiz state
  const [masterQuizAnswers, setMasterQuizAnswers] = useState<{ [qIdx: number]: number }>({});
  const [masterQuizSubmitted, setMasterQuizSubmitted] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('nextsem_user');
    let email = 'guest';
    if (savedUser) {
      try { email = JSON.parse(savedUser).email || 'guest'; } catch (e) {}
    }
    setUserEmail(email);

    const savedProgress = localStorage.getItem(`nextsem_bca_unit3_progress_${email}`);
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        if (parsed.completedPages) setCompletedPages(parsed.completedPages);
        if (parsed.selectedMcqs) setSelectedMcqs(parsed.selectedMcqs);
        if (parsed.userBlankInputs) setUserBlankInputs(parsed.userBlankInputs);
      } catch (e) {}
    }
  }, []);

  const saveState = (newPages: number[], newMcqs: any, newBlanks: any) => {
    localStorage.setItem(`nextsem_bca_unit3_progress_${userEmail}`, JSON.stringify({
      completedPages: newPages,
      selectedMcqs: newMcqs,
      userBlankInputs: newBlanks
    }));
  };

  const handleSelectMcq = (pageIdx: number, optionIdx: number) => {
    const updated = { ...selectedMcqs, [pageIdx]: optionIdx };
    setSelectedMcqs(updated);

    const isCorrect = optionIdx === LESSONS[pageIdx].mcq.answer;
    if (isCorrect && !completedPages.includes(pageIdx)) {
      const newCompleted = [...completedPages, pageIdx];
      setCompletedPages(newCompleted);
      saveState(newCompleted, updated, userBlankInputs);
      markCompleted(`bca_unit:1st Semester/BCS-111 Computer Basics and PC Software/Block 2 Basics of Computer Software/UNIT-3.pdf`);
    } else {
      saveState(completedPages, updated, userBlankInputs);
    }
  };

  const handleBlankChange = (pageIdx: number, blankNum: number, value: string) => {
    const key = `${pageIdx}-${blankNum}`;
    const updated = { ...userBlankInputs, [key]: value };
    setUserBlankInputs(updated);
    saveState(completedPages, selectedMcqs, updated);
  };

  const toggleHint = (pageIdx: number, blankNum: number) => {
    const key = `${pageIdx}-${blankNum}`;
    setRevealedHints(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleAnswer = (pageIdx: number, blankNum: number) => {
    const key = `${pageIdx}-${blankNum}`;
    setRevealedAnswers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const revealAllPageHints = (pageIdx: number) => {
    const updated = { ...revealedHints };
    LESSONS[pageIdx].blanks.forEach(b => {
      updated[`${pageIdx}-${b.num}`] = true;
    });
    setRevealedHints(updated);
  };

  const revealAllPageAnswers = (pageIdx: number) => {
    const updated = { ...revealedAnswers };
    LESSONS[pageIdx].blanks.forEach(b => {
      updated[`${pageIdx}-${b.num}`] = true;
    });
    setRevealedAnswers(updated);
  };

  const currentLesson = LESSONS[currentPageIdx];
  const progressPercent = Math.round((completedPages.length / LESSONS.length) * 100);

  // Calculate master quiz score
  const masterScore = Object.entries(masterQuizAnswers).filter(([qIdx, ansIdx]) => {
    return MASTER_QUIZ[parseInt(qIdx, 10)].answer === ansIdx;
  }).length;

  return (
    <div className="min-h-screen bg-[#060c18] text-slate-100 flex flex-col selection:bg-cyan-500/30">
      {/* BCA Navigation Bar */}
      <BcaHeaderNav />

      {/* Top Breadcrumb Trail (PERMANENT RULE) */}
      <div className="border-b border-slate-800/80 bg-[#081022]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 font-medium text-slate-400 overflow-x-auto py-1">
            <Link href="/" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
              🏠 Home
            </Link>
            <span>❯</span>
            <Link href="/bca" className="hover:text-cyan-400 transition-colors">
              BCA Hub
            </Link>
            <span>❯</span>
            <Link href="/bca/semester-1" className="hover:text-cyan-400 transition-colors">
              1st Semester
            </Link>
            <span>❯</span>
            <Link href="/bca/1/BCS-111" className="hover:text-cyan-400 transition-colors text-slate-300">
              BCS-011 / BCS-111
            </Link>
            <span>❯</span>
            <span className="text-cyan-300 font-semibold truncate max-w-[200px] sm:max-w-none">
              Block 2 • Unit 3: Concept in Programming Language
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Unit 3 Pages 65–67
            </span>
            <span className="text-slate-400 text-[11px] font-mono">
              By <strong className="text-amber-300 font-semibold">Er. Manoj Kumar</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Hero Header Section */}
      <header className="bg-gradient-to-b from-[#0c1328] via-[#091124] to-[#060c18] border-b border-slate-800/80 px-4 sm:px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-extrabold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  IGNOU BCS-011 / BCS-111
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-extrabold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Block 2 Basics of Computer Software
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                <Code className="w-7 h-7 text-cyan-400" />
                Unit 3: Concept in Programming Language
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                Complete line-by-line textbook study suite for Pages 65–67: Algorithms vs Programs, Syntax vs Semantics, Formal Grammar Quadruplet <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded">L(T, N, P, S)</code>, BNF Notation, Compiler Parsing, and Language Ambiguity.
              </p>
            </div>

            {/* Quick Stats & Original PDF Link */}
            <div className="flex items-center gap-3">
              <a 
                href="/BCA_NEW_Books/1st Semester/BCS-011 Computer Basics and PC Software/Block 2 Basics of Computer Software/UNIT-3.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-bold flex items-center gap-2 transition-all shadow-sm group"
              >
                <FileText className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>View Original PDF</span>
              </a>

              <div className="px-3.5 py-2 rounded-xl bg-[#0c1328] border border-cyan-500/30 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Progress</div>
                  <div className="text-xs font-black text-cyan-300">{completedPages.length} / {LESSONS.length} Pages ({progressPercent}%)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 mt-6 border-b border-slate-800 pb-0 overflow-x-auto">
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'notes'
                  ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10 rounded-t-lg'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>📖 Interactive Textbook Notes (Pages 65–67)</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'quiz'
                  ? 'border-emerald-400 text-emerald-300 bg-emerald-500/10 rounded-t-lg'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileQuestion className="w-4 h-4" />
              <span>🎯 Master Quiz Simulator (10 Questions)</span>
            </button>

            <button
              onClick={() => setActiveTab('exam_qa')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'exam_qa'
                  ? 'border-amber-400 text-amber-300 bg-amber-500/10 rounded-t-lg'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookMarked className="w-4 h-4" />
              <span>📝 IGNOU Exam Model Q&A Bank</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'notes' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Sidebar: Page Switcher */}
            <div className="lg:col-span-3 space-y-3">
              <div className="bg-[#0c1328] border border-slate-800 rounded-2xl p-4 shadow-sm">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                  <span>Textbook Pages</span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                    {completedPages.length}/{LESSONS.length} Done
                  </span>
                </h3>

                <div className="space-y-2">
                  {LESSONS.map((lesson, idx) => {
                    const isCurrent = idx === currentPageIdx;
                    const isDone = completedPages.includes(idx);

                    return (
                      <button
                        key={lesson.pageNo}
                        onClick={() => setCurrentPageIdx(idx)}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                          isCurrent
                            ? 'bg-cyan-500/10 border-cyan-500/50 text-white shadow-md shadow-cyan-950/40'
                            : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs font-black ${
                          isDone 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : isCurrent
                            ? 'bg-cyan-500 text-slate-950 font-black'
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {isDone ? '✓' : lesson.pageNo}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                            <span>Book Pg {lesson.bookPage}</span>
                            <span>•</span>
                            <span className="text-amber-400/90 font-medium">{lesson.section}</span>
                          </div>
                          <div className="text-xs font-bold truncate text-slate-100 mt-0.5">
                            {lesson.title}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Language Switcher Card */}
              <div className="bg-[#0c1328] border border-slate-800 rounded-2xl p-4 shadow-sm">
                <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                  Explanation Language
                </div>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setSelectedLang('both')}
                    className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                      selectedLang === 'both' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Both
                  </button>
                  <button
                    onClick={() => setSelectedLang('en')}
                    className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                      selectedLang === 'en' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setSelectedLang('hi')}
                    className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                      selectedLang === 'hi' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Hinglish
                  </button>
                </div>
              </div>
            </div>

            {/* Right Main Column: Active Page Lesson Details */}
            <div className="lg:col-span-9 space-y-6">
              {/* Header Box of Current Page */}
              <div className="bg-[#0c1328] border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-extrabold">
                      📖 Page {currentLesson.bookPage} of BCS-011 Unit 3
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-extrabold">
                      {currentLesson.section}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPageIdx(prev => Math.max(0, prev - 1))}
                      disabled={currentPageIdx === 0}
                      className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                      title="Previous Page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-bold text-slate-400">
                      {currentPageIdx + 1} / {LESSONS.length}
                    </span>
                    <button
                      onClick={() => setCurrentPageIdx(prev => Math.min(LESSONS.length - 1, prev + 1))}
                      disabled={currentPageIdx === LESSONS.length - 1}
                      className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                      title="Next Page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight">
                  {currentLesson.title}
                </h2>
              </div>

              {/* 1. Verbatim Original Textbook Content */}
              <div className="bg-[#0c1328] border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between mb-3 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400">
                    <BookOpen className="w-4 h-4" />
                    <span>Exact Line-by-Line Textbook Content (Page {currentLesson.bookPage})</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    IGNOU BCS-011 Official Unit PDF
                  </span>
                </div>

                <div className="bg-slate-950/80 p-4 sm:p-5 rounded-xl border border-slate-800/80 text-xs sm:text-sm text-slate-200 font-serif leading-relaxed whitespace-pre-line shadow-inner">
                  {currentLesson.originalText}
                </div>
              </div>

              {/* 2. Visual & Bilingual Conceptual Explanation */}
              <div className="bg-[#0c1328] border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-cyan-400 mb-4 border-b border-slate-800/80 pb-3">
                  <Sparkles className="w-4 h-4" />
                  <span>Interactive Conceptual Explanation & Visual Breakdown</span>
                </div>

                <div className="space-y-4">
                  {(selectedLang === 'both' || selectedLang === 'en') && (
                    <div className="bg-slate-900/80 p-4 sm:p-5 rounded-xl border border-cyan-500/20">
                      <div className="text-xs font-extrabold uppercase tracking-wider text-cyan-300 mb-2 flex items-center gap-1.5">
                        <span>🇬🇧 English Conceptual Guide</span>
                      </div>
                      <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line space-y-2 font-sans">
                        {currentLesson.explanationEn}
                      </div>
                    </div>
                  )}

                  {(selectedLang === 'both' || selectedLang === 'hi') && (
                    <div className="bg-slate-900/80 p-4 sm:p-5 rounded-xl border border-amber-500/20">
                      <div className="text-xs font-extrabold uppercase tracking-wider text-amber-300 mb-2 flex items-center gap-1.5">
                        <span>🇮🇳 Hinglish Explanation (सरल भाषा में)</span>
                      </div>
                      <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line space-y-2 font-sans">
                        {currentLesson.explanationHi}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 3. Interactive Fill-in-the-Blanks with Pill Hints */}
              <div className="bg-[#0c1328] border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-400">
                    <HelpCircle className="w-4 h-4" />
                    <span>Interactive Fill-in-the-Blanks (Memory Retain Pill Challenge)</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => revealAllPageHints(currentPageIdx)}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                      <span>Hints</span>
                    </button>
                    <button
                      onClick={() => revealAllPageAnswers(currentPageIdx)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Reveal Answers</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {currentLesson.blanks.map((item) => {
                    const key = `${currentPageIdx}-${item.num}`;
                    const userVal = userBlankInputs[key] || '';
                    const isHintRevealed = revealedHints[key];
                    const isAnswerRevealed = revealedAnswers[key];
                    const isMatched = userVal.trim().toLowerCase() === item.answer.trim().toLowerCase();

                    return (
                      <div 
                        key={item.num}
                        className={`p-3.5 rounded-xl border transition-all ${
                          isMatched
                            ? 'bg-emerald-950/20 border-emerald-500/40'
                            : 'bg-slate-950/60 border-slate-800'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                          <div className="flex items-start gap-2.5 min-w-0">
                            <span className="w-6 h-6 rounded-md bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-black flex items-center justify-center shrink-0">
                              {item.num}
                            </span>
                            <div className="min-w-0">
                              <div className="text-xs sm:text-sm font-medium text-slate-200">
                                Starts with letter: <strong className="text-cyan-400 font-mono text-base px-1.5 py-0.5 bg-slate-900 rounded border border-slate-800 uppercase">'{item.initial}'</strong>
                              </div>
                              {isHintRevealed && (
                                <div className="text-[11px] text-amber-300/90 mt-1 flex items-center gap-1">
                                  <Lightbulb className="w-3 h-3 shrink-0" />
                                  <span>Hint: {item.hint}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <input
                              type="text"
                              placeholder={`Type answer (${item.answer.length} chars)...`}
                              value={userVal}
                              onChange={(e) => handleBlankChange(currentPageIdx, item.num, e.target.value)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-900 border transition-all outline-none ${
                                isMatched
                                  ? 'border-emerald-500 text-emerald-300 font-bold'
                                  : 'border-slate-700 text-slate-100 focus:border-cyan-400'
                              }`}
                            />

                            <button
                              onClick={() => toggleHint(currentPageIdx, item.num)}
                              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-amber-300"
                              title="Toggle Hint"
                            >
                              <Lightbulb className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => toggleAnswer(currentPageIdx, item.num)}
                              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-emerald-400"
                              title="Toggle Answer"
                            >
                              {isAnswerRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>

                        {isAnswerRevealed && (
                          <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                            <span className="text-slate-400">Correct Answer:</span>
                            <span className="font-mono font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                              {item.answer}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 4. Page-Specific MCQ Knowledge Check */}
              <div className="bg-[#0c1328] border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-cyan-400 mb-4 border-b border-slate-800/80 pb-3">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Page {currentLesson.bookPage} Exam Check MCQ</span>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs sm:text-sm font-extrabold text-white leading-snug">
                    {currentLesson.mcq.question}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {currentLesson.mcq.options.map((opt, oIdx) => {
                      const selectedIdx = selectedMcqs[currentPageIdx];
                      const isSelected = selectedIdx === oIdx;
                      const isCorrect = oIdx === currentLesson.mcq.answer;
                      const hasAnswered = selectedIdx !== undefined;

                      let btnStyle = "bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-200";
                      if (hasAnswered) {
                        if (isCorrect) {
                          btnStyle = "bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold";
                        } else if (isSelected) {
                          btnStyle = "bg-rose-950/40 border-rose-500 text-rose-300";
                        } else {
                          btnStyle = "opacity-40 border-slate-800 text-slate-400";
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectMcq(currentPageIdx, oIdx)}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-2.5 ${btnStyle}`}
                        >
                          <span className="w-5 h-5 rounded-md bg-slate-950/80 border border-slate-700 flex items-center justify-center shrink-0 text-[11px] font-bold">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="min-w-0">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {selectedMcqs[currentPageIdx] !== undefined && (
                    <div className="mt-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
                      <div className="font-extrabold text-cyan-300 mb-1 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Explanation & Reference</span>
                      </div>
                      <p className="leading-relaxed">{currentLesson.mcq.explanation}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Navigation Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => setCurrentPageIdx(prev => Math.max(0, prev - 1))}
                  disabled={currentPageIdx === 0}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 text-xs font-bold flex items-center gap-2 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Page (Pg {currentPageIdx > 0 ? LESSONS[currentPageIdx - 1].bookPage : 65})</span>
                </button>

                <div className="text-center">
                  <span className="text-[11px] text-slate-400">
                    Unit Progress: <strong className="text-cyan-400">{completedPages.length} of {LESSONS.length} completed</strong>
                  </span>
                </div>

                {currentPageIdx < LESSONS.length - 1 ? (
                  <button
                    onClick={() => setCurrentPageIdx(prev => Math.min(LESSONS.length - 1, prev + 1))}
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black flex items-center gap-2 transition-all shadow-md shadow-cyan-950/50"
                  >
                    <span>Next Page (Pg {LESSONS[currentPageIdx + 1].bookPage})</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveTab('quiz')}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black flex items-center gap-2 transition-all shadow-md shadow-emerald-950/50"
                  >
                    <span>Take Master Quiz</span>
                    <Trophy className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Master Quiz Simulator */}
        {activeTab === 'quiz' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-[#0c1328] border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Unit 3 Exam Certification Quiz
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                  10-Question Master Test on Programming Language Concepts
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Covers Syntax, Semantics, Grammar Quadruplet L(T, N, P, S), BNF notation, Parsing, and Language Ambiguity from Pages 65–67.
                </p>
              </div>

              {masterQuizSubmitted && (
                <div className="px-4 py-3 rounded-xl bg-slate-950 border border-cyan-500/40 text-center shrink-0">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Your Score</div>
                  <div className="text-2xl font-black text-cyan-300">{masterScore} / {MASTER_QUIZ.length}</div>
                  <div className="text-[10px] font-bold text-emerald-400 mt-0.5">
                    {Math.round((masterScore / MASTER_QUIZ.length) * 100)}% Accuracy
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {MASTER_QUIZ.map((item, qIdx) => {
                const selected = masterQuizAnswers[qIdx];
                const hasSelected = selected !== undefined;
                const isCorrect = selected === item.answer;

                return (
                  <div 
                    key={qIdx}
                    className={`bg-[#0c1328] border rounded-2xl p-5 shadow-sm transition-all ${
                      masterQuizSubmitted 
                        ? isCorrect 
                          ? 'border-emerald-500/50 bg-emerald-950/10'
                          : 'border-rose-500/50 bg-rose-950/10'
                        : 'border-slate-800'
                    }`}
                  >
                    <h3 className="text-xs sm:text-sm font-extrabold text-white leading-snug mb-3">
                      {item.question}
                    </h3>

                    <div className="grid grid-cols-1 gap-2">
                      {item.options.map((opt, oIdx) => {
                        const isChosen = selected === oIdx;
                        let optClass = "bg-slate-900/80 border-slate-800 text-slate-200 hover:border-slate-700";

                        if (masterQuizSubmitted) {
                          if (oIdx === item.answer) {
                            optClass = "bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold";
                          } else if (isChosen) {
                            optClass = "bg-rose-950/60 border-rose-500 text-rose-300";
                          } else {
                            optClass = "opacity-40 border-slate-800 text-slate-500";
                          }
                        } else if (isChosen) {
                          optClass = "bg-cyan-950/40 border-cyan-500 text-cyan-300 font-bold";
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={masterQuizSubmitted}
                            onClick={() => setMasterQuizAnswers(prev => ({ ...prev, [qIdx]: oIdx }))}
                            className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-2.5 ${optClass}`}
                          >
                            <span className="w-5 h-5 rounded-md bg-slate-950 border border-slate-700 flex items-center justify-center shrink-0 text-[11px] font-bold">
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span className="min-w-0 leading-relaxed">{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {masterQuizSubmitted && (
                      <div className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
                        <div className="font-extrabold text-cyan-300 mb-1 flex items-center gap-1">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                          <span>Official Solution & Textbook Explanation</span>
                        </div>
                        <p>{item.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => {
                  setMasterQuizAnswers({});
                  setMasterQuizSubmitted(false);
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold flex items-center gap-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Answers</span>
              </button>

              {!masterQuizSubmitted ? (
                <button
                  onClick={() => setMasterQuizSubmitted(true)}
                  disabled={Object.keys(masterQuizAnswers).length === 0}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black flex items-center gap-2 transition-all shadow-md shadow-emerald-950/50 disabled:opacity-40 disabled:pointer-events-none"
                >
                  <span>Submit & Verify Score</span>
                  <Check className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setActiveTab('exam_qa')}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black flex items-center gap-2 transition-all shadow-md shadow-cyan-950/50"
                >
                  <span>View IGNOU Exam Q&A Bank</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: IGNOU Exam Model Q&A Bank */}
        {activeTab === 'exam_qa' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-[#0c1328] border border-slate-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Term-End Exam Prep
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                IGNOU BCA Semester 1 BCS-011 Model Questions & Detailed Solutions
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Frequently asked questions in IGNOU Term-End Examinations derived directly from Section 3.3 (Pages 65–67).
              </p>
            </div>

            <div className="space-y-4">
              {/* Question 1 */}
              <div className="bg-[#0c1328] border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-xs font-extrabold text-amber-400 border-b border-slate-800 pb-2">
                  <span>Q1 (5 Marks) • Concept of Programming</span>
                  <span className="bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded text-[10px]">Frequent Question</span>
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-white">
                  What is a Programming Language? Differentiate between an Algorithm and a Program.
                </h3>
                <div className="text-xs sm:text-sm text-slate-200 leading-relaxed space-y-2 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  <p><strong>Answer:</strong></p>
                  <p>• <strong>Programming Language:</strong> A formal language used to design and describe a set of instructions/actions for computation to be executed by a computer. It serves as the communication medium between human problem-solvers and digital hardware.</p>
                  <p>• <strong>Algorithm vs. Program:</strong></p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-300">
                    <li><strong className="text-cyan-300">Algorithm:</strong> A language-independent, step-by-step conceptual procedure or blueprint formulated to solve a given problem.</li>
                    <li><strong className="text-cyan-300">Program:</strong> A collection of statements/instructions written in a specific programming language (such as C, Python, Java) that strictly follows that language's syntax and can be directly compiled or interpreted by a computer.</li>
                  </ul>
                  <p><em>Key Takeaway:</em> First an algorithm is designed, and in the subsequent step, that algorithm is expressed in the form of a program.</p>
                </div>
              </div>

              {/* Question 2 */}
              <div className="bg-[#0c1328] border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-xs font-extrabold text-cyan-400 border-b border-slate-800 pb-2">
                  <span>Q2 (5 Marks) • Language Building Blocks</span>
                  <span className="bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded text-[10px]">High Priority</span>
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-white">
                  Explain the concepts of Syntax and Semantics in programming languages with illustrative examples.
                </h3>
                <div className="text-xs sm:text-sm text-slate-200 leading-relaxed space-y-2 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  <p><strong>Answer:</strong></p>
                  <p>Every programming language has basic primitive building blocks defined by two complementary properties:</p>
                  <p>1. <strong className="text-cyan-300">Syntax:</strong> Provides the grammatical <strong>structure</strong> and formation rules of the language. It determines which character compositions and token sequences are legally permitted from the language alphabet. Syntactic analysis is performed during compilation and is known as <em>parsing</em>.</p>
                  <p>2. <strong className="text-amber-300">Semantics:</strong> Provides the operational <strong>meaning</strong> and logic to the formulated statements. It dictates what the statement actually computes when executed by the CPU.</p>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-slate-300">
                    // Example:<br/>
                    int x = 10 / 0; // Syntactically VALID (correct grammar), but Semantically INVALID (Division by zero error at runtime)
                  </div>
                </div>
              </div>

              {/* Question 3 */}
              <div className="bg-[#0c1328] border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-xs font-extrabold text-emerald-400 border-b border-slate-800 pb-2">
                  <span>Q3 (10 Marks) • Formal Language Grammar</span>
                  <span className="bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded text-[10px]">Core Theory</span>
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-white">
                  Define a language formally in terms of the quadruplet L(T, N, P, S). Explain each component and show BNF production rules.
                </h3>
                <div className="text-xs sm:text-sm text-slate-200 leading-relaxed space-y-2 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  <p><strong>Answer:</strong></p>
                  <p>A programming language grammar is mathematically defined as a 4-tuple / quadruplet <code className="text-cyan-300">L(T, N, P, S)</code>:</p>
                  <ol className="list-decimal pl-5 space-y-1.5 text-slate-300">
                    <li><strong className="text-white">T (Set of Terminals):</strong> The elementary alphabet symbols, tokens, or characters that cannot be further decomposed (e.g., <code className="text-emerald-300 font-mono">{`{b}`}</code>, keywords, operators like <code className="text-emerald-300 font-mono">+</code>, <code className="text-emerald-300 font-mono">=</code>).</li>
                    <li><strong className="text-white">N (Set of Non-Terminals):</strong> Syntactic variables or category placeholders that can be replaced or expanded by production rules (e.g., <code className="text-cyan-300 font-mono">{`{A}`}</code>, <code className="text-cyan-300 font-mono">Statement</code>, <code className="text-cyan-300 font-mono">Expression</code>).</li>
                    <li><strong className="text-white">P (Set of Productions / Rules):</strong> The finite set of rewrite rules of the form <code className="text-amber-300 font-mono">LHS ➔ RHS</code> specifying how non-terminals can be expanded.</li>
                    <li><strong className="text-white">S (Start Symbol):</strong> The unique initial non-terminal symbol (<code className="text-cyan-300 font-mono">S ∈ N</code>) from which every valid sentence in the language must begin derivation.</li>
                  </ol>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 mt-2">
                    // BNF Example from Textbook (Page 66):<br/>
                    S ➔ A<br/>
                    A ➔ Ab | b<br/>
                    // Derivation generates: b, bb, bbb, bbbb, ... (any sequence of character 'b')
                  </div>
                </div>
              </div>

              {/* Question 4 */}
              <div className="bg-[#0c1328] border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-xs font-extrabold text-rose-400 border-b border-slate-800 pb-2">
                  <span>Q4 (5 Marks) • Language Ambiguity</span>
                  <span className="bg-rose-500/10 text-rose-300 px-2 py-0.5 rounded text-[10px]">Vital Concept</span>
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-white">
                  What is an Ambiguous Grammar? Why is ambiguity strictly prohibited in programming language design?
                </h3>
                <div className="text-xs sm:text-sm text-slate-200 leading-relaxed space-y-2 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  <p><strong>Answer:</strong></p>
                  <p>• <strong>Definition:</strong> A grammar is said to be <strong>ambiguous</strong> if there exists at least one sentence in the language that can produce <strong>more than one distinct parse tree</strong> (or more than one leftmost/rightmost derivation).</p>
                  <p>• <strong>Why Ambiguity is Prohibited:</strong></p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-300">
                    <li>As stated on Page 67 of the textbook: <em>"The grammar should be unambiguous, otherwise during syntactic analysis at some point of time it can have more than one meaning."</em></li>
                    <li>If a statement has more than one parse tree, the compiler cannot deterministically determine the programmer's execution intent.</li>
                    <li>For instance, an ambiguous arithmetic expression grammar could interpret <code className="text-amber-300 font-mono">2 + 3 * 4</code> as either <code className="text-emerald-300 font-mono">(2 + 3) * 4 = 20</code> or <code className="text-emerald-300 font-mono">2 + (3 * 4) = 14</code>.</li>
                    <li>Therefore, computer programming language grammars must always be unambiguous to ensure unique, deterministic compilation.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer attribution */}
      <footer className="border-t border-slate-800/80 bg-[#040812] py-6 px-4 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white">Nextsem Academy</span>
            <span>•</span>
            <span>IGNOU BCA 1st Semester BCS-011 Curriculum</span>
          </div>
          <div className="text-slate-400">
            Content Authored by <strong className="text-amber-400 font-semibold">Er. Manoj Kumar</strong> • Official IGNOU Textbook Revision
          </div>
        </div>
      </footer>
    </div>
  );
}
