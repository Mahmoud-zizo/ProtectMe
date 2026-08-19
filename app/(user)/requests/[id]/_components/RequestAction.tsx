"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  confirmRequest,
  cancelRequest,
} from "../../../dashboard/dashboardAction";
import ConfirmDialog from "@/components/ConfirmDialog";

type Dialog = "confirm" | "cancel" | null;

interface Props {
  requestId: string;
  status: string;
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5M12 16h.01" />
    </svg>
  );
}

export default function RequestActions({ requestId, status }: Props) {
  const router = useRouter();
  const [dialog, setDialog] = useState<Dialog>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canConfirm = status === "QUOTED";
  const canCancel = ["PENDING_REVIEW", "QUOTED"].includes(status);

  async function handleConfirm() {
    setLoading(true);
    setError("");

    const result =
      dialog === "confirm"
        ? await confirmRequest(requestId)
        : await cancelRequest(requestId);

    if (result.success) {
      setDialog(null);
      router.refresh();
    } else {
      setError(result.error ?? "Something went wrong.");
    }
    setLoading(false);
  }

  return (
    <>
      <div className="space-y-2">
        {error && (
          <p className="flex items-center gap-1.5 text-xs font-medium text-rose-600 bg-rose-50 border border-rose-100 rounded-xl px-3 py-2">
            <AlertIcon className="w-3.5 h-3.5 shrink-0" />
            {error}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-2.5">
          {canConfirm && (
            <button
              onClick={() => {
                setError("");
                setDialog("confirm");
              }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 bg-linear-to-r from-teal-500 to-blue-600 text-white text-sm font-bold
                rounded-xl shadow-sm shadow-teal-500/20 hover:opacity-90 active:scale-[0.98]
                transition-all duration-200"
            >
              <CheckIcon className="w-4 h-4" />
              Confirm Appointment
            </button>
          )}

          {canCancel && (
            <button
              onClick={() => {
                setError("");
                setDialog("cancel");
              }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 bg-white border border-slate-200 text-slate-500 text-sm font-bold
                rounded-xl hover:border-rose-200 hover:text-rose-500 hover:bg-rose-50
                active:scale-[0.98] transition-all duration-200"
            >
              <XIcon className="w-4 h-4" />
              Cancel Booking
            </button>
          )}
        </div>
      </div>

      {/* Confirm appointment dialog */}
      <ConfirmDialog
        open={dialog === "confirm"}
        theme="light"
        variant="success"
        title="Confirm your appointment?"
        description="You're confirming this booking. Our team will prepare everything for your scheduled date."
        confirmLabel="Yes, confirm it"
        loading={loading}
        onConfirm={handleConfirm}
        onCancel={() => setDialog(null)}
      />

      {/* Cancel booking dialog */}
      <ConfirmDialog
        open={dialog === "cancel"}
        theme="light"
        variant="danger"
        title="Cancel this booking?"
        description="Your appointment slot will be released. You can book again anytime."
        confirmLabel="Yes, cancel it"
        loading={loading}
        onConfirm={handleConfirm}
        onCancel={() => setDialog(null)}
      />
    </>
  );
}
