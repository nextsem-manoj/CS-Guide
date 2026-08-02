"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Key, Send, Award, Zap, BookOpen, ChevronRight, X } from 'lucide-react';
import { askGemini } from '@/lib/gemini';
import { getSemmyResponses, querySemmy } from '@/data/semmyAiData';

interface BookRightSidebarProps {
  currentChapterId: string;
  currentChapterTitle: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'semmy';
  text: string;
}

export default function BookRightSidebar(_props: BookRightSidebarProps) {
  return null;
}
