interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const progressPercentage = Math.round(((currentStep + 1) / totalSteps) * 100);

  return (
    <div className="w-full mx-auto py-4 px-4">
      {/* Contêiner da barra de progresso */}
      <div className="relative h-2 rounded-full bg-[#03C5F00D] overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-[#03C5F0] transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};