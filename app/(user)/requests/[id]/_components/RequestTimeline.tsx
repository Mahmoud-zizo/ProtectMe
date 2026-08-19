"use client";

import { useState } from "react";
import RequestActions from "./RequestAction";
import {
  STATUS_CONFIG,
  Row,
  BagIcon,
  DocumentIcon,
  CalendarCheckIcon,
  FlagCheckIcon,
  CheckMarkIcon,
  ChevronIcon,
  formatDate,
  formatShort,
  getStepState,
} from "./timelineConfig";

type ServiceItem = { service: { name: string } };

interface RequestTimelineProps {
  requestId: string;
  status: string;
  createdAt: string;
  slotDate?: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  carMake: string;
  carModel: string;
  carYear: number;
  branchName: string;
  services: ServiceItem[];
  notes?: string | null;
  quote?: { price: number; durationDays: number; notes?: string | null } | null;
}

export default function RequestTimeline({
  requestId,
  status,
  createdAt,
  slotDate,
  customerName,
  phoneNumber,
  address,
  carMake,
  carModel,
  carYear,
  branchName,
  services,
  notes,
  quote,
}: RequestTimelineProps) {
  // Default open: whichever step matches the current status.
  const [openStep, setOpenStep] = useState<string | null>(status);

  const toggle = (key: string) =>
    setOpenStep((prev) => (prev === key ? null : key));

  const steps = [
    {
      key: "PENDING_REVIEW",
      label: "Request Submitted",
      desc: "Your booking request was received",
      icon: BagIcon,
      date: formatShort(createdAt),
      content: (
        <div className="pt-1">
          <p className="text-xs font-bold tracking-wider text-teal-600 uppercase mb-2">
            Your Info
          </p>
          <div className="bg-slate-50 rounded-xl px-3.5 mb-3">
            <Row label="Name" value={customerName} />
            <Row label="Phone" value={phoneNumber} />
            <Row label="Address" value={address} />
          </div>
          <p className="text-xs font-bold tracking-wider text-teal-600 uppercase mb-2">
            Vehicle
          </p>
          <div className="bg-slate-50 rounded-xl px-3.5">
            <Row label="Make" value={carMake} />
            <Row label="Model" value={carModel} />
            <Row label="Year" value={String(carYear)} />
          </div>
          {status === "PENDING_REVIEW" && (
            <div className="mt-4">
              <RequestActions requestId={requestId} status={status} />
            </div>
          )}
        </div>
      ),
    },
    {
      key: "QUOTED",
      label: "Quote Prepared",
      desc: "Our team prepared your quote",
      icon: DocumentIcon,
      date: null,
      content: quote ? (
        <div className="pt-1">
          <p className="text-3xl font-bold text-slate-800 mb-1">
            EGP {quote.price.toLocaleString()}
          </p>
          <p className="text-sm text-slate-500 mb-3">
            Estimated duration: {quote.durationDays}{" "}
            {quote.durationDays === 1 ? "day" : "days"}
          </p>
          {quote.notes && (
            <p className="text-xs text-slate-600 bg-blue-50 rounded-xl px-3 py-2 border border-blue-100 mb-3">
              {quote.notes}
            </p>
          )}
          {status === "QUOTED" && (
            <RequestActions requestId={requestId} status={status} />
          )}
        </div>
      ) : (
        <p className="text-sm text-slate-400 pt-1">
          A quote hasn&apos;t been prepared yet.
        </p>
      ),
    },
    {
      key: "CONFIRMED",
      label: "Appointment Confirmed",
      desc: "Your service is scheduled",
      icon: CalendarCheckIcon,
      date: slotDate ? formatShort(slotDate) : null,
      content: (
        <div className="pt-1">
          <div className="bg-slate-50 rounded-xl px-3.5 mb-3">
            <Row label="Branch" value={branchName} />
            <Row label="Date" value={slotDate ? formatDate(slotDate) : "—"} />
          </div>
          <p className="text-xs font-bold tracking-wider text-teal-600 uppercase mb-2">
            Services
          </p>
          <div className="bg-slate-50 rounded-xl px-3.5">
            {services.map((s, i) => (
              <div
                key={i}
                className="py-2.5 border-b border-slate-100 last:border-0"
              >
                <span className="text-sm font-medium text-slate-700">
                  {s.service.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      key: "COMPLETED",
      label: "Service Completed",
      desc: "Your vehicle service is done",
      icon: FlagCheckIcon,
      date: null,
      content: notes ? (
        <div className="bg-slate-50 rounded-xl px-3.5 pt-1">
          <Row label="Notes" value={notes} />
        </div>
      ) : (
        <p className="text-sm text-slate-400 pt-1">
          Thanks for choosing us — no additional notes were left.
        </p>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm px-5 py-6 sm:px-7 sm:py-7">
      {/* Top row */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200 rounded-full px-3.5 py-1.5">
          Timeline
        </span>
        <span className="flex-1 border-t border-dashed border-slate-200" />
      </div>

      {/* Steps */}
      <div className="flex flex-col">
        {steps.map((step, i) => {
          const state = getStepState(step.key, status);
          const Icon = step.icon;
          const isLast = i === steps.length - 1;
          const isOpen = openStep === step.key;
          const isDisabled = state === "upcoming" || state === "cancelled";

          const iconStyles =
            state === "done"
              ? "bg-green-50 border-green-300 text-green-600"
              : state === "current"
                ? "bg-teal-50 border-teal-300 text-teal-600"
                : state === "cancelled"
                  ? "bg-rose-50 border-rose-200 text-rose-300"
                  : "bg-slate-50 border-slate-200 text-slate-300";

          const titleStyles =
            state === "upcoming"
              ? "text-slate-300"
              : state === "cancelled"
                ? "text-slate-400"
                : "text-slate-800";

          const descStyles =
            state === "upcoming" || state === "cancelled"
              ? "text-slate-300"
              : "text-slate-400";

          return (
            <div key={step.key} className="flex gap-4">
              {/* Icon + connector */}
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={`w-10 h-10 rounded-full border-2 border-dashed flex items-center justify-center ${iconStyles}`}
                >
                  {state === "done" ? (
                    <CheckMarkIcon className="w-4.5 h-4.5" />
                  ) : (
                    <Icon className="w-4.5 h-4.5" />
                  )}
                </div>
                {!isLast && (
                  <div
                    className={`w-px flex-1 min-h-6 border-l-2 border-dashed mt-1 ${
                      state === "cancelled"
                        ? "border-rose-100"
                        : "border-slate-200"
                    }`}
                  />
                )}
              </div>

              {/* Header (clickable) + collapsible content */}
              <div className={`flex-1 min-w-0 ${isLast ? "" : "pb-4"}`}>
                <button
                  type="button"
                  disabled={isDisabled}
                  onClick={() => toggle(step.key)}
                  className={`w-full flex items-start justify-between gap-4 pt-1.5 text-left ${
                    isDisabled ? "cursor-default" : "cursor-pointer"
                  }`}
                >
                  <div>
                    <p className={`text-[15px] font-bold ${titleStyles}`}>
                      {step.label}
                    </p>
                    <p className={`text-sm mt-0.5 ${descStyles}`}>
                      {step.desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 pt-0.5">
                    {step.date && (
                      <span className="text-xs font-medium text-slate-400 whitespace-nowrap">
                        {step.date}
                      </span>
                    )}
                    {!isDisabled && (
                      <ChevronIcon
                        className={`w-4 h-4 text-slate-300 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </div>
                </button>

                {!isDisabled && isOpen && (
                  <div className="mt-3 border-t border-slate-100 pt-3">
                    {step.content}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
