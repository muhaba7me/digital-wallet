import Image from "next/image";
import React from "react";

import { Loader2 } from "lucide-react";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";

const verifyEmailForm = ({
  onVerified,
}: {
  onVerified: () => Promise<void> | void;
}) => {
  const [otp, setOtp] = React.useState<string[]>(Array(6).fill(""));
  const [isLoading, setIsLoading] = React.useState(false);
  const [isResending, setIsResending] = React.useState(false);
  const [resendTimer, setResendTimer] = React.useState(59);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  // Resend timer effect
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleOtpChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) return;

    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleResend = async () => {
    setIsResending(true);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setResendTimer(59); // Reset timer
      setOtp(Array(6).fill("")); // Clear OTP inputs
      inputRefs.current[0]?.focus();
    } catch (error) {
      console.error("Failed to resend OTP:", error);
    } finally {
      setIsResending(false);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Focus previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) return;

    setIsLoading(true);
    try {
      // Mock API call - accept any 6-digit code
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await onVerified();
    } catch (error) {
      console.error("OTP verification failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
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
            We sent you a confirmation code to your phone number.
          </p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Timer */}
        <div className="text-center">
          <span className="text-green-600 font-medium text-lg">
            {formatTimer(resendTimer)} Sec
          </span>
        </div>

        {/* OTP Inputs */}
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

        {/* Resend Button */}
        <div className="text-center">
          {resendTimer > 0 ? (
            <span className="text-gray-500 text-sm">
              Resend code in {formatTimer(resendTimer)}
            </span>
          ) : (
            <Button
              variant="ghost"
              onClick={handleResend}
              disabled={isResending}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              {isResending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Resend SMS Code"
              )}
            </Button>
          )}
        </div>

        {/* Continue Button */}
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
};

export default verifyEmailForm;
