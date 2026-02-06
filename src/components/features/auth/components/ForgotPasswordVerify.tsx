import Image from "next/image";
import React from "react";

import { Loader2 } from "lucide-react";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";

export default function ForgotPasswordVerifyForm({
  onVerified,
}: {
  onVerified: () => Promise<void> | void;
}) {
  const [otp, setOtp] = React.useState<string[]>(Array(6).fill(""));
  const [isLoading, setIsLoading] = React.useState(false);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;

    const next = [...otp];
    next[index] = value;
    setOtp(next);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== 6) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      await onVerified();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 border rounded-2xl p-8">
      <div className="text-center space-y-2 flex flex-col items-center">
        <Image src="/image-1.png" alt="Logo" width={100} height={100} />
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Verification Code
          </h1>
          <p className="text-gray-600">
            Enter the verification code we sent to your email.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-center space-x-3">
          {otp.map((value, index) => (
            <Input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={value}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500"
              disabled={isLoading}
            />
          ))}
        </div>

        <Button
          onClick={handleVerify}
          className="w-full h-12 bg-gradient-to-r from-primary/80 via-primary to-primary/80 hover:from-primary/70 hover:via-primary/90 hover:to-primary/70 text-white font-medium rounded-lg shadow-md"
          disabled={isLoading || otp.join("").length !== 6}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Continue"
          )}
        </Button>
      </div>
    </div>
  );
}
