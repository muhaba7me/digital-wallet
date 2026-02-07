"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import EmailForm from "./EmailForm";

type Step = "EMAIL" | "PASSWORD" | "SUCCESS";

interface AuthState {
  step: Step;
  email: string;
}

function PasswordForm({
  email,
  onSubmit,
  onBack,
  error
}: {
  email: string;
  onSubmit: (password: string) => Promise<void>;
  onBack: () => void;
  error: string | null;
}) {
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

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

  return (
    <div className="w-full max-w-md mx-auto">
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
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your password"
            required
          />
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
      setAuthState(prev => ({
        ...prev,
        step: "PASSWORD",
        email: normalizedEmail,
      }));
      setPasswordError(null);
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
