"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface Props {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "success";
  theme?: "light" | "dark";
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Go back",
  variant = "danger",
  theme = "light",
  loading = false,
  onConfirm,
  onCancel,
}: Props) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    confirmRef.current?.focus();
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onCancel]);

  if (!open) return null;

  // ── Theme tokens ────────────────────────────────────────────────────────────
  const panel =
    theme === "dark"
      ? "bg-[#161a1f] border border-white/10"
      : "bg-white border border-slate-100";

  const heading = theme === "dark" ? "text-white" : "text-slate-900";
  const body = theme === "dark" ? "text-slate-400" : "text-slate-500";
  const closeBtn =
    theme === "dark"
      ? "text-slate-500 hover:text-slate-300 hover:bg-white/5"
      : "text-slate-300 hover:text-slate-500 hover:bg-slate-50";

  const cancelBtn =
    theme === "dark"
      ? "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white focus-visible:ring-white/20"
      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-800 focus-visible:ring-slate-300";

  // ── Variant tokens ──────────────────────────────────────────────────────────
  const confirmBtn =
    variant === "danger"
      ? "bg-linear-to-r from-rose-500 to-rose-600 hover:brightness-105 shadow-lg shadow-rose-500/25 text-white focus-visible:ring-rose-300"
      : "bg-linear-to-r from-teal-500 to-blue-600 hover:brightness-105 shadow-lg shadow-teal-500/25 text-white focus-visible:ring-teal-300";

  const iconBg =
    variant === "danger"
      ? "bg-rose-50 text-rose-500 ring-8 ring-rose-500/5"
      : "bg-teal-50 text-teal-600 ring-8 ring-teal-500/5";

  const panelShadow =
    variant === "danger" ? "shadow-rose-900/10" : "shadow-slate-900/10";

  const dialog = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onCancel}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className={`relative w-full max-w-sm rounded-3xl shadow-2xl ${panelShadow} p-7
          animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-200 ${panel}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onCancel}
          disabled={loading}
          aria-label="Close"
          className={`absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center
            transition-colors duration-150 disabled:opacity-40 ${closeBtn}`}
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center mb-4`}
        >
          {variant === "danger" ? (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>

        <h3 className={`text-base font-bold tracking-tight mb-1.5 ${heading}`}>
          {title}
        </h3>
        <p className={`text-sm leading-relaxed mb-6 ${body}`}>{description}</p>

        <div className="flex gap-2.5">
          <button
            onClick={onCancel}
            disabled={loading}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold
              transition-all duration-150 disabled:opacity-50
              focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
              ${theme === "dark" ? "focus-visible:ring-offset-[#161a1f]" : "focus-visible:ring-offset-white"}
              ${cancelBtn}`}
          >
            {cancelLabel}
          </button>
          <button
            ref={confirmRef}
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold
              transition-all duration-150 active:scale-[0.98] disabled:opacity-60
              disabled:cursor-not-allowed disabled:active:scale-100
              flex items-center justify-center gap-2
              focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
              ${theme === "dark" ? "focus-visible:ring-offset-[#161a1f]" : "focus-visible:ring-offset-white"}
              ${confirmBtn}`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Working…
              </>
            ) : (
              confirmLabel
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(dialog, document.body);
}
