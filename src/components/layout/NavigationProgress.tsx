"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export default function NavigationProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const prevPathname = useRef(pathname);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Intercept click on all <a> tags for instant feedback
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("http") ||
        href.startsWith("mailto") ||
        href.startsWith("tel") ||
        href.startsWith("wa.me") ||
        anchor.target === "_blank"
      )
        return;

      // Same page — no progress needed (compare base path without query params)
      try {
        const url = new URL(href, window.location.origin);
        if (url.pathname === pathname) return;
      } catch {
        if (href.split("?")[0] === pathname) return;
      }

      // Start progress bar immediately on click
      setProgress(15);
      setVisible(true);

      // Simulate progress while waiting
      timeoutRef.current = setTimeout(() => setProgress(45), 100);
      const slowTimeout = setTimeout(() => setProgress(70), 300);
      // Store for cleanup
      (timeoutRef as any).slow = slowTimeout;
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      // Page has changed — complete the bar
      prevPathname.current = pathname;

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if ((timeoutRef as any).slow) clearTimeout((timeoutRef as any).slow);

      setProgress(100);

      // Hide after animation completes
      const hideTimeout = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);

      return () => clearTimeout(hideTimeout);
    }
  }, [pathname]);

  if (!visible && progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[2.5px] pointer-events-none">
      <div
        className="h-full bg-gold shadow-[0_0_8px_rgba(183,149,86,0.5)]"
        style={{
          width: `${progress}%`,
          transition:
            progress === 100
              ? "width 0.2s ease-out, opacity 0.3s ease 0.15s"
              : "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          opacity: progress === 100 ? 0 : 1,
        }}
      />
    </div>
  );
}
