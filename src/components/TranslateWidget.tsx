"use client";

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Languages, X, Check } from 'lucide-react';

export const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'Hindi (हिंदी)', flag: '🇮🇳' },
  { code: 'hi-trans', label: 'Hinglish (Latin Hindi)', flag: '🇮🇳' },
  { code: 'es', label: 'Spanish (Español)', flag: '🇪🇸' },
  { code: 'fr', label: 'French (Français)', flag: '🇫🇷' },
  { code: 'de', label: 'German (Deutsch)', flag: '🇩🇪' },
];

const vowels: Record<string, string> = {
  'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo', 'ऋ': 'ri', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',
  'ा': 'a', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo', 'ृ': 'ri', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au',
  'ं': 'n', 'ः': 'h', 'ँ': 'n', 'ॉ': 'o'
};

const consonants: Record<string, string> = {
  'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'n',
  'च': 'ch', 'छ': 'chh', 'ज': 'j', 'झ': 'jh', 'ञ': 'n',
  'ट': 't', 'ठ': 'th', 'ड': 'd', 'ढ': 'dh', 'ण': 'n',
  'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
  'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm',
  'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v', 'श': 'sh', 'ष': 'sh', 'स': 's', 'ह': 'h',
  'क्ष': 'ksh', 'त्र': 'tr', 'ज्ञ': 'gy',
  'क़': 'q', 'ख़': 'kh', 'ग़': 'g', 'ज़': 'z', 'ड़': 'd', 'ढ़': 'dh', 'फ़': 'f'
};

export const transliterateDevnagari = (text: string): string => {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (consonants[char]) {
      const nextChar = text[i + 1];
      if (nextChar === '्') {
        result += consonants[char];
        i++; // skip halant
      } else if (vowels[nextChar]) {
        result += consonants[char] + vowels[nextChar];
        i++; // skip vowel
      } else {
        const isEndOfWord = !nextChar || nextChar === ' ' || /[\s,.\-!?"'():]/.test(nextChar);
        result += consonants[char] + (isEndOfWord ? '' : 'a');
      }
    } else if (vowels[char]) {
      result += vowels[char];
    } else {
      result += char;
    }
  }
  // Clean up double vowels/edge cases for natural reading
  return result
    .replace(/aa+/g, 'aa')
    .replace(/ee+/g, 'ee')
    .replace(/oo+/g, 'oo')
    .replace(/a+/g, 'a')
    .replace(/kh+a/g, 'kha')
    .replace(/sh+a/g, 'sha');
};

export const changeLanguage = (langCode: string) => {
  if (typeof window === 'undefined') return;
  
  // Hinglish uses Hindi translation from Google Translate, then we transliterate it
  const targetCode = langCode === 'hi-trans' ? 'hi' : langCode;
  
  const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
  if (select) {
    select.value = targetCode;
    select.dispatchEvent(new Event('change'));
    localStorage.setItem('preferred_lang', langCode);
    
    // Trigger local state change event so the widget updates
    window.dispatchEvent(new CustomEvent('langchange', { detail: langCode }));
  } else {
    document.cookie = `googtrans=/en/${targetCode}; path=/;`;
    document.cookie = `googtrans=/en/${targetCode}; path=/; domain=.nextsem.online`;
    localStorage.setItem('preferred_lang', langCode);
    window.location.reload();
  }
};


interface GoogleTranslateElement {
  new (
    options: {
      pageLanguage: string;
      includedLanguages?: string;
      layout?: unknown;
      autoDisplay?: boolean;
    },
    elementId: string
  ): void;
  InlineLayout: {
    SIMPLE: unknown;
  };
}

interface WindowWithGoogleTranslate extends Window {
  googleTranslateElementInit?: () => void;
  google?: {
    translate: {
      TranslateElement: GoogleTranslateElement;
    };
  };
}

const TranslateWidget = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const isInBook = pathname?.startsWith('/book');

  useEffect(() => {

    if (typeof window === 'undefined') return;

    const isDismissed = localStorage.getItem('translate_banner_dismissed') === 'true';
    const savedLang = localStorage.getItem('preferred_lang') || 'en';

    setTimeout(() => {
      setIsVisible(!isDismissed);
      setCurrentLang(savedLang);
    }, 0);

    // Watch for global language changes
    const handleLangChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setCurrentLang(detail);
    };
    window.addEventListener('langchange', handleLangChange);

    const handleOpenTranslate = () => {
      setDropdownOpen(true);
    };
    window.addEventListener('open_translate', handleOpenTranslate);

    const win = window as unknown as WindowWithGoogleTranslate;
    win.googleTranslateElementInit = () => {
      if (win.google && win.google.translate) {
        new win.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,hi,es,fr,de',
          layout: win.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        }, 'google_translate_element');
      }
      setScriptLoaded(true);
    };

    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    } else {
      setTimeout(() => setScriptLoaded(true), 0);
    }

    return () => {
      window.removeEventListener('langchange', handleLangChange);
      window.removeEventListener('open_translate', handleOpenTranslate);
    };
  }, []);

  // Transliteration observer logic for Hinglish
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let observer: MutationObserver | null = null;

    const translateNode = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE && node.nodeValue) {
        if (/[\u0900-\u097F]/.test(node.nodeValue)) {
          // Temporarily disconnect observer to prevent infinite loop of character mutation
          if (observer) observer.disconnect();
          
          node.nodeValue = transliterateDevnagari(node.nodeValue);
          
          if (observer) {
            observer.observe(document.body, {
              childList: true,
              subtree: true,
              characterData: true
            });
          }
        }
      } else {
        for (const child of Array.from(node.childNodes)) {
          translateNode(child);
        }
      }
    };

    if (currentLang === 'hi-trans') {
      // 1. Initial transliteration run
      translateNode(document.body);

      // 2. Continuous translation run for any dynamic elements translated by Google
      observer = new MutationObserver((mutations) => {
        if (observer) observer.disconnect();
        
        for (const mutation of mutations) {
          if (mutation.type === 'characterData') {
            translateNode(mutation.target);
          } else {
            for (const addedNode of Array.from(mutation.addedNodes)) {
              translateNode(addedNode);
            }
          }
        }

        if (observer) {
          observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true
          });
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [currentLang, scriptLoaded]);

  const handleSelectLanguage = (langCode: string) => {
    changeLanguage(langCode);
    setCurrentLang(langCode);
    setDropdownOpen(false);
  };

  if (pathname === '/playground' || isInBook) return null;

  return (
    <>
      <div id="google_translate_element" className="hidden" />
    </>
  );
};

export default TranslateWidget;
