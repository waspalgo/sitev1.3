interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export default function StepIndicator({ currentStep, totalSteps, labels }: StepIndicatorProps) {
  return (
    <div className="mb-10 sm:mb-12 md:mb-14 px-2 sm:px-0">
      <div className="flex items-start justify-center max-w-2xl mx-auto w-full">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const step = index + 1;
          const isActive = step === currentStep;
          const isCompleted = step < currentStep;

          return (
            <div key={step} className="flex items-start flex-shrink-0">
              {/* Conteneur avec cercle et label */}
              <div className="flex flex-col items-center flex-shrink-0">
                {/* Cercle */}
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base transition-all duration-300 flex-shrink-0 ${
                    isActive
                      ? 'bg-purple-primary text-white shadow-glow-md'
                      : isCompleted
                        ? 'bg-positive text-white'
                        : 'bg-text-muted/20 text-text-muted'
                  }`}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    step
                  )}
                </div>
                {/* Label directement sous le cercle - petit espacement */}
                {labels[index] && (
                  <span
                    className={`text-[10px] sm:text-xs text-center whitespace-normal max-w-[90px] sm:max-w-[140px] ${
                      isActive ? 'text-purple-accent font-semibold' : 'text-text-muted'
                    }`}
                    style={{ 
                      wordBreak: 'break-word', 
                      hyphens: 'auto', 
                      lineHeight: '1.1',
                      marginTop: '9px'
                    }}
                  >
                    {labels[index]}
                  </span>
                )}
              </div>
              {/* Ligne de connexion - alignée avec le centre des cercles */}
              {step < totalSteps && (
                <div
                  className={`h-0.5 w-8 sm:w-20 md:w-24 mx-1 sm:mx-3 md:mx-4 transition-all duration-300 flex-shrink-0 ${
                    isCompleted ? 'bg-positive' : 'bg-text-muted/20'
                  }`}
                  style={{ marginTop: '1rem' }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}






