"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import EmailForm from "./EmailForm";
import PasswordLogin from "./PasswordSignin";
import VerifyEmailForm from "./VerifyEmail";
import ForgotPasswordVerifyForm from "./ForgotPasswordVerify";
import ForgotPasswordNewPasswordForm from "./ForgotPasswordNew";
import PasswordSignup from "./PasswordSignup";


type AuthFlowType = "FIRST_TIME_ONBOARDING" | "LOGIN" | "FORGOT_PASSWORD";

type Step =

  | "SIGNUP_EMAIL"
  | "VERIFY_EMAIL_CODE"
  | "CREATE_PASSWORD"
  | "LOGIN_AFTER_SIGNUP"
 
  | "LOGIN_EMAIL"
  | "LOGIN_PASSWORD"
  | "LOGIN_SUCCESS"

  | "FORGOT_PASSWORD_EMAIL"
  | "CHECK_EMAIL_SENT"
  | "CREATE_NEW_PASSWORD"
  | "PASSWORD_RESET_SUCCESS";

interface AuthFlowState {
  flowType: AuthFlowType;
  step: Step;
  email: string;
}

async function checkEmailExists(email: string): Promise<boolean> {
  const res = await fetch("/api/auth/email-exists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    throw new Error("EMAIL_EXISTS_CHECK_FAILED");
  }

  const data = (await res.json()) as { exists?: boolean };
  return Boolean(data.exists);
}

export default function ImprovedAuthFlow() {
  const router = useRouter();
  const [authState, setAuthState] = React.useState<AuthFlowState>({
    flowType: "LOGIN",
    step: "LOGIN_EMAIL",
    email: "",
  });

  // Load saved state from localStorage on mount
  React.useEffect(() => {
    const savedEmail = localStorage.getItem("auth_email");
    const savedFlowType = localStorage.getItem("auth_flow_type") as AuthFlowType | null;
    const savedStep = localStorage.getItem("auth_step") as Step | null;

    if (savedEmail && savedFlowType && savedStep) {
      setAuthState({
        flowType: savedFlowType,
        step: savedStep,
        email: savedEmail,
      });
    }
  }, []);

  // Save state to localStorage when it changes
  React.useEffect(() => {
    if (authState.email) {
      localStorage.setItem("auth_email", authState.email);
      localStorage.setItem("auth_flow_type", authState.flowType);
      localStorage.setItem("auth_step", authState.step);
    }
  }, [authState]);

  const resetAuthState = React.useCallback(() => {
    setAuthState({
      flowType: "LOGIN",
      step: "LOGIN_EMAIL",
      email: "",
    });
    localStorage.removeItem("auth_email");
    localStorage.removeItem("auth_flow_type");
    localStorage.removeItem("auth_step");
  }, []);

  // First Time Onboarding Flow Handlers
  const handleSignupEmailSubmit = React.useCallback(
    async (email: string) => {
      const normalizedEmail = email.trim().toLowerCase();
      setAuthState(prev => ({
        ...prev,
        flowType: "FIRST_TIME_ONBOARDING",
        step: "VERIFY_EMAIL_CODE",
        email: normalizedEmail,
      }));
    },
    []
  );

  const handleEmailVerified = React.useCallback(() => {
    setAuthState(prev => ({
      ...prev,
      step: "CREATE_PASSWORD",
    }));
  }, []);

  const handlePasswordCreated = React.useCallback(async () => {
    setAuthState(prev => ({
      ...prev,
      step: "LOGIN_AFTER_SIGNUP",
    }));
  }, []);

  // Login Flow Handlers
  const handleLoginEmailSubmit = React.useCallback(
    async (email: string) => {
      const normalizedEmail = email.trim().toLowerCase();
      const exists = await checkEmailExists(normalizedEmail);

      setAuthState(prev => ({
        ...prev,
        flowType: exists ? "LOGIN" : "FIRST_TIME_ONBOARDING",
        step: exists ? "LOGIN_PASSWORD" : "VERIFY_EMAIL_CODE",
        email: normalizedEmail,
      }));
    },
    []
  );

  const handleLoginSuccess = React.useCallback(async () => {
    resetAuthState();
    router.push("/admin/dashboard");
  }, [resetAuthState, router]);

  const handleLoginAfterSignupSuccess = React.useCallback(async () => {
    resetAuthState();
    router.push("/admin/signin");
  }, [resetAuthState, router]);

  // Forgot Password Flow Handlers
  const handleForgotPasswordEmailSubmit = React.useCallback(
    async (email: string) => {
      const normalizedEmail = email.trim().toLowerCase();
      setAuthState(prev => ({
        ...prev,
        flowType: "FORGOT_PASSWORD",
        step: "CHECK_EMAIL_SENT",
        email: normalizedEmail,
      }));
    },
    []
  );

  const handleCheckEmailVerified = React.useCallback(() => {
    setAuthState(prev => ({
      ...prev,
      step: "CREATE_NEW_PASSWORD",
    }));
  }, []);

  const handlePasswordResetSuccess = React.useCallback(async () => {
    resetAuthState();
    router.push("/admin/signin");
  }, [resetAuthState, router]);

  // Navigation handlers
  const handleForgotPassword = React.useCallback(() => {
    setAuthState(prev => ({
      ...prev,
      flowType: "FORGOT_PASSWORD",
      step: "FORGOT_PASSWORD_EMAIL",
    }));
  }, []);

  const handleBackToLogin = React.useCallback(() => {
    resetAuthState();
  }, [resetAuthState]);

  // Render appropriate component based on current state
  const renderCurrentStep = () => {
    const { flowType, step, email } = authState;

    // First Time Onboarding Flow
    if (flowType === "FIRST_TIME_ONBOARDING") {
      switch (step) {
        case "SIGNUP_EMAIL":
          return (
            <EmailForm
              initialEmail={email}
              onSubmitEmail={handleSignupEmailSubmit}
              title="Sign up to get started"
              subtitle="Create your account to continue"
            />
          );
        case "VERIFY_EMAIL_CODE":
          return (
            <VerifyEmailForm
              onVerified={handleEmailVerified}
              email={email}
              title="Verify your email"
              subtitle={`We sent a verification code to ${email}`}
            />
          );
        case "CREATE_PASSWORD":
          return (
            <PasswordSignup
              email={email}
              onSuccess={handlePasswordCreated}
              title="Create your password"
              subtitle="Set a secure password for your account"
            />
          );
        case "LOGIN_AFTER_SIGNUP":
          return (
            <PasswordLogin
              email={email}
              onSuccess={handleLoginAfterSignupSuccess}
              title="Login to your account"
              subtitle="Enter your password to access your account"
            />
          );
      }
    }

    // Login Flow
    if (flowType === "LOGIN") {
      switch (step) {
        case "LOGIN_EMAIL":
          return (
            <EmailForm
              initialEmail={email}
              onSubmitEmail={handleLoginEmailSubmit}
              title="Login to your account"
              subtitle="Enter your email to continue"
            />
          );
        case "LOGIN_PASSWORD":
          return (
            <PasswordLogin
              email={email}
              onSuccess={handleLoginSuccess}
              onForgotPassword={handleForgotPassword}
              title="Login to your account"
              subtitle="Enter your password to access your account"
            />
          );
      }
    }

    // Forgot Password Flow
    if (flowType === "FORGOT_PASSWORD") {
      switch (step) {
        case "FORGOT_PASSWORD_EMAIL":
          return (
            <EmailForm
              initialEmail={email}
              onSubmitEmail={handleForgotPasswordEmailSubmit}
              title="Forgot password"
              subtitle="Enter your email to reset your password"
              buttonText="Reset password"
            />
          );
        case "CHECK_EMAIL_SENT":
          return (
            <ForgotPasswordVerifyForm
              onVerified={handleCheckEmailVerified}
            />
          );
        case "CREATE_NEW_PASSWORD":
          return (
            <ForgotPasswordNewPasswordForm
              onSuccess={handlePasswordResetSuccess}
            />
          );
      }
    }

    // Default fallback
    return (
      <EmailForm
        initialEmail={email}
        onSubmitEmail={handleLoginEmailSubmit}
        title="Login to your account"
        subtitle="Enter your email to continue"
      />
    );
  };

  return renderCurrentStep();
}
