"use client";
import Image from "next/image";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import EmailForm from "./EmailForm";
import { findUserByEmail } from "@/lib/mock-auth/mock-data";

type Step = "EMAIL" | "PASSWORD" | "SUCCESS";

interface AuthState {
  step: Step;
  email: string;
}
type PasswordFormProps = {
  email: string;
  onSubmit: (password: string) => Promise<void>;
  onBack: () => void;
  error: string | null;
  title?: string;
  subtitle?: string;
};

export function PasswordForm({
  email,
  onSubmit,
  onBack,
  error,
  title = "Welcome back",
  subtitle = "Sign in to continue",
}: PasswordFormProps) {
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setIsLoading(true);
    try {
      await onSubmit(password);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md mx-auto">
       <div className="text-center space-y-2 flex flex-col items-center">
              <Image src="/image-1.png" alt="Logo" width={100} height={100} />
            
            </div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Login to your account
        </h2>
        <p className="text-gray-600">
          Enter your password to access your account
        </p>
        <p className="text-sm text-gray-500 mt-2">
          {email}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isLoading || !password.trim()}
            className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function MockAdminAuthFlow() {
  const router = useRouter();
  const { login, checkSession } = useAuth();
  const [authState, setAuthState] = React.useState<AuthState>({
    step: "EMAIL",
    email: "",
  });
  const [passwordError, setPasswordError] = React.useState<string | null>(null);
  const [emailError, setEmailError] = React.useState<string | null>(null);

  // Load saved email on mount
  React.useEffect(() => {
    const savedEmail = localStorage.getItem("mock_auth_email");
    if (savedEmail) {
      setAuthState(prev => ({ ...prev, email: savedEmail }));
    }

    // Check if user is already authenticated
    checkSession();
  }, [checkSession]);

  // Save email to localStorage when it changes
  React.useEffect(() => {
    if (authState.email) {
      localStorage.setItem("mock_auth_email", authState.email);
    }
  }, [authState.email]);

  const handleEmailSubmit = React.useCallback(
    async (email: string) => {
      const normalizedEmail = email.trim().toLowerCase();

      // Check if email exists in mock data
      const existingUser = findUserByEmail(normalizedEmail);

      if (!existingUser) {
        setEmailError("This email is not registered in our system. Please use a predefined account.");
        return;
      }

      setAuthState(prev => ({
        ...prev,
        step: "PASSWORD",
        email: normalizedEmail,
      }));
      setPasswordError(null);
      setEmailError(null);
    },
    []
  );

  const handlePasswordSubmit = React.useCallback(
    async (password: string) => {
      setPasswordError(null);

      try {
        await login(authState.email, password);

        // Clear saved email on successful login
        localStorage.removeItem("mock_auth_email");

        // Redirect to admin dashboard
        router.push("/admin/dashboard");
      } catch (error) {
        setPasswordError("Invalid email or password");
      }
    },
    [authState.email, login, router]
  );

  const handleBackToEmail = React.useCallback(() => {
    setAuthState(prev => ({
      ...prev,
      step: "EMAIL",
    }));
    setPasswordError(null);
    setEmailError(null);
  }, []);

  const renderCurrentStep = () => {
    const { step, email } = authState;

    switch (step) {
      case "EMAIL":
        return (
          <EmailForm
            initialEmail={email}
            onSubmitEmail={handleEmailSubmit}
            title="Login to your account"
            subtitle="Enter your email to continue"
            buttonText="Continue"
            error={emailError}
          />
        );

      case "PASSWORD":
        return (
          <PasswordForm
            email={email}
            onSubmit={handlePasswordSubmit}
            onBack={handleBackToEmail}
            error={passwordError}
          />
        );

      default:
        return (
          <EmailForm
            initialEmail={email}
            onSubmitEmail={handleEmailSubmit}
            title="Login to your account"
            subtitle="Enter your email to continue"
            buttonText="Continue"
          />
        );
    }
  };

  return renderCurrentStep();
}
