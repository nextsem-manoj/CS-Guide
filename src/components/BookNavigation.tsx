"use client";

import React from "react";

interface BookNavigationProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

// Bottom navigation completely removed from web site per release directive (reserved for native Android/iOS builds only).
export default function BookNavigation(_props: BookNavigationProps) {
  return null;
}
