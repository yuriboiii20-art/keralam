import React from 'react';
import { Search, Bed, Calendar, CheckCircle2 } from 'lucide-react';

export default function BookingProgressSteps({ currentStep = 1, onStepClick }) {
  const steps = [
    { number: 1, label: 'Find Your Space', icon: Search },
    { number: 2, label: 'Choose Room', icon: Bed },
    { number: 3, label: 'Choose Stay Plan', icon: Calendar },
    { number: 4, label: 'Confirm Booking', icon: CheckCircle2 },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-3">
      <div className="flex items-center justify-between relative">
        {/* Background connector line */}
        <div className="absolute top-1/2 left-4 right-4 h-0.5 -translate-y-1/2 bg-white/10 -z-0" />
        {/* Active fill line */}
        <div
          className="absolute top-1/2 left-4 h-0.5 -translate-y-1/2 bg-gradient-to-r from-[#D4A64A] to-amber-500 transition-all duration-500 -z-0"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step) => {
          const Icon = step.icon;
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;
          const isFuture = step.number > currentStep;

          return (
            <div
              key={step.number}
              onClick={() => {
                if (onStepClick && step.number <= currentStep) {
                  onStepClick(step.number);
                }
              }}
              className={`flex flex-col items-center relative z-10 select-none ${
                step.number <= currentStep ? 'cursor-pointer group' : 'cursor-default opacity-60'
              }`}
            >
              {/* Circle Icon Badge */}
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 font-bold text-xs sm:text-sm ${
                  isCurrent
                    ? 'bg-gradient-to-r from-[#D4A64A] to-amber-500 text-[#0B1220] ring-4 ring-[#D4A64A]/25 shadow-lg shadow-[#D4A64A]/30 scale-110'
                    : isCompleted
                    ? 'bg-[#12372A] text-emerald-400 border border-emerald-500/40'
                    : 'bg-[#10192B] text-white/50 border border-white/15'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                ) : (
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                )}
              </div>

              {/* Label */}
              <span
                className={`mt-1.5 text-[10px] sm:text-xs font-semibold tracking-wide text-center truncate max-w-[80px] sm:max-w-none transition-colors ${
                  isCurrent
                    ? 'text-[#D4A64A] font-bold'
                    : isCompleted
                    ? 'text-white/80 group-hover:text-[#D4A64A]'
                    : 'text-white/40'
                }`}
              >
                <span className="hidden sm:inline">{step.number}. </span>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
