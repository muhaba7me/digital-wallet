"use client";

type PinNumpadProps = {
  open: boolean;
  keys: string[];
  onKeyPress: (key: string) => void;
};

export function PinNumpad({ open, keys, onKeyPress }: PinNumpadProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+0.5rem)] z-30 sm:hidden">
      <div className="mx-auto w-[calc(100%-2rem)] max-w-2xl">
        <div className="rounded-3xl border border-border bg-card/95 p-3 shadow-lg">
          <div className="grid grid-cols-3 gap-2">
            {keys.map((key) => (
              <button
                key={key}
                type="button"
                className="flex h-12 items-center justify-center rounded-2xl bg-background text-lg font-semibold text-foreground shadow-sm transition-colors active:bg-muted/60"
                onPointerDown={(event) => event.preventDefault()}
                onClick={() => onKeyPress(key)}
                aria-label={key === "backspace" ? "Backspace" : `Enter ${key}`}
              >
                {key === "backspace" ? "⌫" : key}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
