"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";

import { INITIAL_FORM_DATA, STEPS, STEP_SUBTITLES } from "./constants";
import { validateStep } from "./validation";
import { createRequest } from "../bookAction";

import {
  BookingFormData,
  BranchOption,
  ServiceOption,
  SlotOption,
  StepErrors,
} from "./types";

// ─── Props ────────────────────────────────────────────────────────────────────

interface BookingFormProps {
  branches: BranchOption[];
  services: ServiceOption[];
  slots: SlotOption[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function BookingForm({
  branches,
  services,
  slots,
}: BookingFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<BookingFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<StepErrors>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // ── update ──────────────────────────────────────────────────────────────────
  const update = useCallback((key: keyof BookingFormData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key as string];
      return next;
    });
  }, []);

  // ── navigation ──────────────────────────────────────────────────────────────
  const goToStep = useCallback((step: number) => {
    setErrors({});
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleNext = useCallback(() => {
    const stepErrors = validateStep(currentStep, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    goToStep(currentStep + 1);
  }, [currentStep, formData, goToStep]);

  const handleBack = useCallback(() => {
    goToStep(currentStep - 1);
  }, [currentStep, goToStep]);

  // ── submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;
    setSubmitError("");
    setIsSubmitting(true);

    const result = await createRequest(formData);

    if (result.success) {
      setSubmitted(true);
    } else {
      setSubmitError(result.error);
      setIsSubmitting(false);
    }
  }, [formData, isSubmitting]);

  // ── success screen ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <main className="min-h-screen relative flex items-center justify-center p-4 bg-[#E0E0E0] overflow-hidden font-sans">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 sm:w-200 h-150 sm:h-200 bg-[#F5C518]/15 blur-[120px] rounded-full -z-10 pointer-events-none" />

        <div className="max-w-md w-full text-center space-y-6 bg-white p-10 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-black/5">
          <div className="mx-auto w-16 h-16 bg-[#F5C518] rounded-2xl flex items-center justify-center shadow-[0_4px_16px_rgba(245,197,24,0.3)] mb-6">
            <svg
              className="w-8 h-8 text-[#16181B]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#16181B] tracking-tight">
            Booking Submitted
          </h2>
          <p className="text-sm font-medium text-gray-500 leading-relaxed">
            Your request is pending review. Our team will contact you shortly to
            confirm pricing and scheduling.
          </p>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="w-full cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#F5C518] hover:bg-[#e0b512] active:scale-[0.98]
              rounded-xl text-sm text-[#16181B] font-bold transition-all duration-200 shadow-[0_4px_16px_rgba(245,197,24,0.3)] mt-4"
          >
            Go to Dashboard <span className="ml-1">→</span>
          </button>
        </div>
      </main>
    );
  }

  // ── form ────────────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen relative py-12 px-4 bg-[#E0E0E0] overflow-hidden flex flex-col items-center justify-center font-sans">
      {/* Ambient glow */}
      <div className="fixed top-[-10%] right-[-5%] w-125 sm:w-200 h-125 sm:h-200 bg-[#F5C518]/12 blur-[140px] rounded-full -z-10 pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-5%] w-125 sm:w-200 h-125 sm:h-200 bg-[#F5C518]/8 blur-[140px] rounded-full -z-10 pointer-events-none" />

      <div
        className={`w-full ${currentStep === 4 ? "max-w-3xl lg:max-w-208" : "max-w-xl"} bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-black/5 p-8 sm:p-10 relative z-10 transition-all duration-500`}
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <Image
            src="/images/protectmedark.jpg"
            alt="logo"
            width={80}
            height={80}
            className="rounded-2xl object-cover"
          />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#16181B] tracking-tight mb-2 mt-8 sm:mb-3">
            Book a Service
          </h1>
          <p className="text-sm sm:text-base lg:text-lg font-medium text-gray-500 mb-6 sm:mb-8">
            {STEP_SUBTITLES[currentStep]}
          </p>

          {/* Step indicators */}
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm lg:text-base font-semibold text-gray-500 mr-2 uppercase tracking-wide">
              Step {currentStep} of {STEPS.length}
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i + 1 === currentStep
                      ? "w-6 bg-[#F5C518]"
                      : i + 1 < currentStep
                        ? "bg-[#16181B]/40 w-2"
                        : "w-2 bg-slate-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Form area */}
        <div className="space-y-6">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {currentStep === 1 && (
              <StepOne data={formData} errors={errors} update={update} />
            )}
            {currentStep === 2 && (
              <StepTwo data={formData} errors={errors} update={update} />
            )}
            {currentStep === 3 && (
              <StepThree
                data={formData}
                errors={errors}
                update={update}
                branches={branches}
                services={services}
                slots={slots}
              />
            )}
            {currentStep === 4 && (
              <StepFour
                data={formData}
                branches={branches}
                services={services}
                slots={slots}
              />
            )}
          </div>

          {submitError && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
              <p className="text-sm font-medium text-red-600 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                {submitError}
              </p>
            </div>
          )}

          {/* Nav Buttons */}
          <div className="pt-6 mt-4 flex items-center justify-between gap-3 sm:gap-4 w-full">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                disabled={isSubmitting}
                className="px-5 cursor-pointer sm:px-8 py-3.5 sm:py-4 bg-white border-2 border-black/10 rounded-2xl
                  text-sm sm:text-base font-bold text-gray-500 hover:text-[#16181B] hover:border-black/20 hover:bg-slate-50
                  transition-all duration-200 disabled:opacity-50 shrink-0"
              >
                ← Back
              </button>
            )}

            {currentStep < STEPS.length ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 w-full cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 bg-[#F5C518] hover:bg-[#e0b512]
                  active:scale-[0.98] rounded-2xl text-sm sm:text-base font-bold text-[#16181B]
                  transition-all duration-200 shadow-[0_8px_24px_-6px_rgba(245,197,24,0.5)]"
              >
                Continue <span className="ml-1">→</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 w-full cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 bg-[#F5C518] hover:bg-[#e0b512]
                  active:scale-[0.98] rounded-2xl text-sm sm:text-base font-bold text-[#16181B]
                  transition-all duration-200 shadow-[0_8px_24px_-6px_rgba(245,197,24,0.5)]
                  disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#16181B]"
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
                    Submitting…
                  </>
                ) : (
                  <>
                    Submit Booking <span className="ml-1">→</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
