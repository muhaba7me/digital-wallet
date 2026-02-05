import { Button } from "@/components/shared/button";

export function StepFooter({
  onBack,
  onNext,
  isLastStep,
  nextLabel,
}: {
  onBack?: () => void;
  onNext: () => void;
  isLastStep?: boolean;
  nextLabel?: string;
}) {
  return (
    <div className="mt-8 flex gap-4">
      {onBack && (
        <Button
          type="button"
          variant="outline"
          className="h-14 flex-1 rounded-full"
          onClick={onBack}
        >
          Back
        </Button>
      )}

      <Button
        type="button"
        className="h-14 flex-1 rounded-full bg-linear-to-r from-teal-950 via-emerald-900 to-emerald-700"
        onClick={onNext}
      >
        {nextLabel ?? (isLastStep ? "Submit" : "Continue")}
      </Button>
    </div>
  );
}
