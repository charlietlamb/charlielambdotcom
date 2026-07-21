"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

const SOURCES: Record<string, { video: string; poster: string }> = {
  light: { video: "/bg-light-min.webm", poster: "/bg-light-poster.webp" },
  dark: { video: "/bg-dark-min.webm", poster: "/bg-dark-poster.webp" },
};

export function BackgroundVideo() {
  const { resolvedTheme } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const source = mounted ? SOURCES[resolvedTheme ?? "dark"] : undefined;

  useEffect(() => {
    setReady(false);
    const video = videoRef.current;
    if (!video || !source) return;

    video.load();

    const reveal = () => setReady(true);
    if (video.readyState >= 2) {
      reveal();
      return;
    }
    video.addEventListener("canplay", reveal, { once: true });
    return () => video.removeEventListener("canplay", reveal);
  }, [source]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {source ? (
        <video
          ref={videoRef}
          src={source.video}
          poster={source.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          data-ready={ready}
          className="h-full w-full object-cover opacity-0 transition-opacity duration-[900ms] ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none data-[ready=true]:opacity-[0.05] dark:data-[ready=true]:opacity-[0.045]"
        />
      ) : null}
    </div>
  );
}
