"use client";

import { useState } from "react";
import { Bell } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description?: string;
  buttonText?: string;
  doneText?: string;
  eventName?: string;
  eventParams?: Record<string, string | number>;
}

export default function ComingSoon({
  title,
  description,
  buttonText = "期待上线",
  doneText = "谢谢关注",
  eventName = "coming_soon_click",
  eventParams = {},
}: ComingSoonProps) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    const gtag = (
      window as unknown as { gtag?: (...args: unknown[]) => void }
    ).gtag;
    if (typeof gtag === "function") {
      gtag("event", eventName, eventParams);
    }
    setClicked(true);
  };

  return (
    <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6 dark:border-indigo-800 dark:bg-indigo-950/40">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>
      {description && (
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
          {description}
        </p>
      )}
      <button
        type="button"
        onClick={handleClick}
        disabled={clicked}
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-default disabled:opacity-70"
      >
        <Bell className="h-4 w-4" />
        {clicked ? doneText : buttonText}
      </button>
    </div>
  );
}
