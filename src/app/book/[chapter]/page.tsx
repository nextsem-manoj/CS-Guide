import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import BookPagination from '@/components/BookPagination';
import MarkCompleteButton from '@/components/MarkCompleteButton';
import { notFound } from 'next/navigation';
import InteractivePre from '@/components/InteractivePre';
import AdSenseBanner from '@/components/AdSenseBanner';
import DeveloperProfile from '@/components/DeveloperProfile';
import VideoEmbed from '@/components/VideoEmbed';
import GraphBar from '@/components/GraphBar';
import PracticeAssignment from '@/components/PracticeAssignment';
import ChromeQuiz from '@/components/ChromeQuiz';
import PaginatedSections from '@/components/PaginatedSections';
import TabbedOS from '@/components/TabbedOS';
import TabbedDevTools from '@/components/TabbedDevTools';
import DragDropQuestion from '@/components/DragDropQuestion';
import CommandLineQuiz from '@/components/CommandLineQuiz';
import StartMenuGuide from '@/components/StartMenuGuide';
import CommandInterpreterSimulation from '@/components/CommandInterpreterSimulation';
import GuiVsCliSimulation from '@/components/GuiVsCliSimulation';
import WindowsHistoryTimeline from '@/components/WindowsHistoryTimeline';
import WhyLearnCliSimulation from '@/components/WhyLearnCliSimulation';
import TerminalTypingAnimation from '@/components/TerminalTypingAnimation';
import CommandLineBasicsSimulation from '@/components/CommandLineBasicsSimulation';
import CommandLineRunner from '@/components/CommandLineRunner';
import FolderTreeVisualizer from '@/components/FolderTreeVisualizer';
import SpotTheError from '@/components/SpotTheError';
import PillCommandBuilder from '@/components/PillCommandBuilder';
import CommandFlashcard from '@/components/CommandFlashcard';
import { getChapterSimulator } from '@/data/chapterSimulators';
import InteractiveChapterSimulator from '@/components/InteractiveChapterSimulator';
import MatchingQuiz from '@/components/MatchingQuiz';
import MultipleChoiceQuiz from '@/components/MultipleChoiceQuiz';
import ClientRedirect from '@/components/ClientRedirect';
import { getChapterUrl } from '@/lib/htmlLessonsHelper';
import { cliLessons } from '@/data/cliLessonsData';
import CliLessonClient from '@/components/CliLessonClient';


/* eslint-disable @typescript-eslint/no-explicit-any */
const mdxComponents = {
  pre: (props: any) => <InteractivePre {...props} />,
  DeveloperProfile: (props: any) => <DeveloperProfile {...props} />,
  VideoEmbed: (props: any) => <VideoEmbed {...props} />,
  GraphBar: (props: any) => <GraphBar {...props} />,
  ChromeQuiz: (props: any) => <ChromeQuiz {...props} />,
  TabbedOS: () => <TabbedOS />,
  TabbedDevTools: () => <TabbedDevTools />,
  DragDropQuestion: (props: any) => <DragDropQuestion {...props} />,
  CommandLineQuiz: (props: any) => <CommandLineQuiz {...props} />,
  CommandLineRunner: (props: any) => <CommandLineRunner {...props} />,
  StartMenuGuide: () => <StartMenuGuide />,
  CommandInterpreterSimulation: () => <CommandInterpreterSimulation />,
  GuiVsCliSimulation: () => <GuiVsCliSimulation />,
  WindowsHistoryTimeline: () => <WindowsHistoryTimeline />,
  WhyLearnCliSimulation: () => <WhyLearnCliSimulation />,
  TerminalTypingAnimation: () => <TerminalTypingAnimation />,
  CommandLineBasicsSimulation: () => <CommandLineBasicsSimulation />,
  FolderTreeVisualizer: (props: any) => <FolderTreeVisualizer {...props} />,
  SpotTheError: (props: any) => <SpotTheError {...props} />,
  PillCommandBuilder: (props: any) => <PillCommandBuilder {...props} />,
  CommandFlashcard: (props: any) => <CommandFlashcard {...props} />,
  MatchingQuiz: (props: any) => <MatchingQuiz {...props} />,
  MultipleChoiceQuiz: (props: any) => <MultipleChoiceQuiz {...props} />,
};
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'src/content');
  const files = fs.existsSync(contentDir) ? fs.readdirSync(contentDir) : [];
  return files.map((filename) => ({
    chapter: filename.replace('.mdx', ''),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapter: string }>;
}) {
  const { chapter } = await params;
  const filePath = path.join(process.cwd(), 'src/content', `${chapter}.mdx`);

  if (!fs.existsSync(filePath)) {
    return {
      title: "Chapter Not Found",
      description: "This chapter is currently being written by the instructor.",
    };
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContent);
  const title = data.title || chapter;
  const description = data.description || `Study ${title} with Nextsem Academy's structured web development curriculum.`;

  return {
    title: title,
    description,
    alternates: { canonical: `/book/${chapter}` },
    openGraph: {
      title: `${title} | Nextsem Academy`,
      description,
      url: `https://nextsem.online/book/${chapter}`,
    },
    twitter: {
      card: "summary",
      title: `${title} | Nextsem Academy`,
      description,
    },
  };
}


export default async function ChapterPage({
  params,
}: {
  params: Promise<{ chapter: string }>;
}) {
  const { chapter } = await params;

  if (chapter.startsWith('p1-')) {
    const targetUrl = chapter === 'p1-1-intro-and-text' ? '/html' : getChapterUrl(chapter);
    return <ClientRedirect url={targetUrl} />;
  }

  // Check if we have an interactive simulator for this chapter
  // const simulator = getChapterSimulator(chapter);
  // if (simulator) {
  //   return <InteractiveChapterSimulator simulator={simulator} chapterId={chapter} />;
  // }

  // Check if we have a CLI lesson for this chapter and redirect to SEO URL
  const cliLesson = cliLessons.find((l) => l.originalChapterId === chapter || l.slug === chapter);
  if (cliLesson) {
    return <ClientRedirect url={`/cli/${cliLesson.slug}`} />;
  }

  const filePath = path.join(process.cwd(), 'src/content', `${chapter}.mdx`);

  if (!fs.existsSync(filePath)) {
    // Return a beautiful placeholder if the chapter isn't written yet
    return (
      <article className="prose prose-slate dark:prose-invert max-w-none">
        <h1>Chapter Not Found</h1>
        <p>
          The chapter <strong>{chapter}</strong> is currently being written by the instructor. 
          Please check back later!
        </p>
        <BookPagination />
      </article>
    );
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  // Parse out Practice Assignment if present
  let mdxSource = content;
  let instructions: string[] = [];
  let hasAssignment = false;

  const assignmentRegex = /## 🎓 Practice Assignment|🎓 Practice Assignment/;
  const match = content.split(assignmentRegex);
  
  if (match.length > 1) {
    mdxSource = match[0];
    const isHtmlCssOrJs = chapter.startsWith('p1-') || chapter.startsWith('p2-') || chapter.startsWith('p3-');
    if (isHtmlCssOrJs) {
      const rawInstructions = match[1] || "";
      instructions = rawInstructions
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.') || line.startsWith('5.') || line.startsWith('-') || line.startsWith('*'))
        .map(line => line.replace(/^\d+\.\s*/, '').replace(/^[-*]\s*/, ''));
      
      hasAssignment = instructions.length > 0;
    }
  }

  // Split the MDX source into slides by horizontal rules (---)
  const slidesMdx = mdxSource.split(/\n---\r?\n/).map(s => s.trim()).filter(Boolean);

  const renderedSlides = slidesMdx.map((slideContent, idx) => (
    <MDXRemote key={idx} source={slideContent} components={mdxComponents} />
  ));

  return (
    <div className="animate-in fade-in duration-500 space-y-4">
      <AdSenseBanner />

      {/* Navigation Breadcrumbs */}
      <nav aria-label="Breadcrumbs" className="flex flex-wrap items-center gap-2 text-xs text-slate-300 font-bold py-1">
        <Link href="/" className="hover:text-[#04AA6D] transition-colors flex items-center gap-1">
          <span>🏠 Home</span>
        </Link>
        <span className="text-slate-600 font-bold">❯</span>
        <span className="text-[#04AA6D] font-extrabold truncate max-w-[280px] sm:max-w-none">
          {data?.title || chapter}
        </span>
      </nav>

      <PaginatedSections
        slides={renderedSlides}
        hasAssignment={hasAssignment}
        chapterId={chapter}
        instructions={instructions}
      />

      <div className="mt-4">
        <AdSenseBanner />
      </div>
    </div>
  );
}


