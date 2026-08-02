"use client";

import React from 'react';

/**
 * Triggers an instant lightweight DOM celebration emoji particle burst at the event coordinates or screen center.
 */
export function triggerCelebration(event?: React.MouseEvent | MouseEvent) {
  if (typeof window === "undefined") return;

  const originX = event ? event.clientX : window.innerWidth / 2;
  const originY = event ? event.clientY : window.innerHeight / 2;

  const emojis = ["🎉", "✨", "⭐", "🌟", "🎊", "💥", "🥇", "🎈", "🚀"];

  for (let i = 0; i < 28; i++) {
    const el = document.createElement("div");
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    el.innerText = emoji;
    el.style.position = "fixed";
    el.style.left = `${originX}px`;
    el.style.top = `${originY}px`;
    el.style.fontSize = `${Math.floor(Math.random() * 14) + 16}px`;
    el.style.pointerEvents = "none";
    el.style.zIndex = "99999";
    el.style.transition = "all 1.2s cubic-bezier(0.25, 1, 0.5, 1)";
    el.style.opacity = "1";
    el.style.transform = "translate(-50%, -50%) scale(0.4)";

    document.body.appendChild(el);

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 150 + 50;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance - 70; // Float slightly upward
    const rotation = (Math.random() - 0.5) * 360;

    requestAnimationFrame(() => {
      el.style.transform = `translate(${destX}px, ${destY}px) rotate(${rotation}deg) scale(1.3)`;
      el.style.opacity = "0";
    });

    setTimeout(() => {
      if (document.body.contains(el)) {
        document.body.removeChild(el);
      }
    }, 1300);
  }
}
