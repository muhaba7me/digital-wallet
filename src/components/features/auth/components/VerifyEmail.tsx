"use client";

import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";

interface VerifyEmailFormProps {
  onVerified: () => Promise<void> | void;
  email?: string;
  title?: string;
  subtitle?: string;
}

// Hook to handle resend timer
function useResendTimer(initial = 59) {
  const [timer, setTimer] = useState(initial);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const reset = () => setTimer(initial);
  return { timer, reset };
}

function OTPInput({
  index,
  value,
  onChange,
  onKeyDown,
  inputRef,
  disabled,
}: {
  index: number;
  value: string;
  onChange: (index: number, value: string) => void;
  onKeyDown: (index: number, e: KeyboardEvent<HTMLInputElement>) => void;
  inputRef: (el: HTMLInputElement | null) => void;
  disabled?: boolean;
}) {
  return (
    <Input
      ref={inputRef}
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={value}
      onChange={(e) => onChange(index, e.target.value)}
      onKeyDown={(e) => onKeyDown(index, e)}
      className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500"
      disabled={disabled}
    />
  );
}

export default function VerifyEmailForm({
  onVerified,
  email,
  title = "Verification Code",
  subtitle = "We sent you a confirmation code to your phone number."
}: VerifyEmailFormProps) {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { timer: resendTimer, reset: resetTimer } = useResendTimer(59);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < otp.length - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) inputRefs.current[index - 1]?.focus();
    if (e.key === "ArrowLeft" && index > 0) inputRefs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < otp.length - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      setOtp(Array(6).fill(""));
      inputRefs.current[0]?.focus();
      resetTimer();
    } finally {
      setIsResending(false);
    }
  };

  const handleVerify = async () => {
    if (otp.join("").length !== 6) return;
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      await onVerified();
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-md space-y-8 border rounded-2xl p-8">
      <div className="text-center space-y-2 flex flex-col items-center">
        <Image src="/image-1.png" alt="Logo" width={100} height={100} />
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600">{subtitle}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="text-center">
          <span className="text-green-600 font-medium text-lg">{formatTimer(resendTimer)} Sec</span>
        </div>

        <div className="flex justify-center space-x-3">
          {otp.map((value, idx) => (
            <OTPInput
              key={idx}
              index={idx}
              value={value}
              onChange={handleOtpChange}
              onKeyDown={handleKeyDown}
              inputRef={(el) => (inputRefs.current[idx] = el)}
              disabled={isLoading}
            />
          ))}
        </div>

        <div className="text-center">
          {resendTimer > 0 ? (
            <span className="text-gray-500 text-sm">Resend code in {formatTimer(resendTimer)}</span>
          ) : (
            <Button
              variant="ghost"
              onClick={handleResend}
              disabled={isResending}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              {isResending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                </>
              ) : (
                "Resend SMS Code"
              )}
            </Button>
          )}
        </div>

        <Button
          onClick={handleVerify}
          disabled={isLoading || otp.join("").length !== 6}
          className="w-full h-12 bg-linear-to-r from-primary/80 via-primary to-primary/80 hover:from-primary/70 hover:via-primary/90 hover:to-primary/70 text-white font-medium rounded-lg shadow-md"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
            </>
          ) : (
            "Continue"
          )}
        </Button>
      </div>
    </div>
  );
}
