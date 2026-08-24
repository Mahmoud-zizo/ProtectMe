"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

export default function ViewDetailsButton({
  requestId,
}: {
  requestId: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        startTransition(() => {
          router.push(`/requests/${requestId}`);
        });
      }}
      className="font-semibold text-black hover:text-slate-900 transition-colors whitespace-nowrap
        bg-white border border-2 border-black px-4 py-3 rounded-full shadow-sm hover:bg-purple-400
        w-full md:w-auto text-center inline-flex items-center justify-center gap-2
        disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-white cursor-pointer"
    >
      {isPending ? (
        <>
          <svg
            className="animate-spin h-4 w-4 text-black"
            xmlns="http://www.w3.org/2000/svg"
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
          Loading…
        </>
      ) : (
        "View Details"
      )}
    </button>
  );
}
