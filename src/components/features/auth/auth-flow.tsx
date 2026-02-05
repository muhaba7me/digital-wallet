"use client";

import { useRouter } from "next/router";
import React from "react";

import PasswordLogin from "./password-signin-form";
import VerifyEmailForm from "./verify-email-form";
import ForgotPasswordVerifyForm from "./forgot-password-verify-form";
import PasswordSignup from "./passwor-signup-form";
import ForgotPasswordNewPasswordForm from "./forgot-password-new-password-form";
import EmailForm from "./email-form";


type Step =
  | "EMAIL"
  | "VERIFY_EMAIL"
  | "SIGNIN_PASSWORD"
  | "SIGNUP_PASSWORD"
  | "FORGOT_PASSWORD_VERIFY"
  | "FORGOT_PASSWORD_NEW_PASSWORD";

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

export default function AuthFlow() {
  const router = useRouter();
  const [step, setStep] = React.useState<Step>("EMAIL");
  const [email, setEmail] = React.useState<string>("");

  React.useEffect(() => {
    const storedEmail = localStorage.getItem("signup_email");
    const storedStep = localStorage.getItem("auth_flow_step") as Step | null;

    if (storedEmail) setEmail(storedEmail);
    if (storedEmail && storedStep) setStep(storedStep);
  }, []);

  React.useEffect(() => {
    if (email) localStorage.setItem("signup_email", email);
    localStorage.setItem("auth_flow_step", step);
  }, [email, step]);

  const reset = React.useCallback(() => {
    setEmail("");
    setStep("EMAIL");
    localStorage.removeItem("signup_email");
    localStorage.removeItem("auth_flow_step");
  }, []);

  const handleForgotPassword = React.useCallback(() => {
    setStep("FORGOT_PASSWORD_VERIFY");
  }, []);

  const handleForgotPasswordVerified = React.useCallback(async () => {
    setStep("FORGOT_PASSWORD_NEW_PASSWORD");
  }, []);

  const handleForgotPasswordResetSuccess = React.useCallback(async () => {
    reset();
    router.push("/admin/signin");
  }, [reset, router]);

  const handleSubmitEmail = React.useCallback(
    async (submittedEmail: string) => {
      const normalizedEmail = submittedEmail.trim().toLowerCase();
      setEmail(normalizedEmail);

      const exists = await checkEmailExists(normalizedEmail);
      setStep(exists ? "SIGNIN_PASSWORD" : "VERIFY_EMAIL");
    },
    [],
  );

  const handleVerified = React.useCallback(async () => {
    setStep("SIGNUP_PASSWORD");
  }, []);

  const handleSigninSuccess = React.useCallback(async () => {
    reset();
    router.push("/admin/dashboard");
  }, [reset, router]);

  const handleSignupSuccess = React.useCallback(async () => {
    reset();
    router.push("/admin/signin");
  }, [reset, router]);

  if (step === "EMAIL") {
    return <EmailForm initialEmail={email} onSubmitEmail={handleSubmitEmail} />;
  }

  if (step === "SIGNIN_PASSWORD") {
    return (
      <PasswordLogin
        email={email}
        onSuccess={handleSigninSuccess}
        onForgotPassword={handleForgotPassword}
      />
    );
  }

  if (step === "VERIFY_EMAIL") {
    return <VerifyEmailForm onVerified={handleVerified} />;
  }

  if (step === "FORGOT_PASSWORD_VERIFY") {
    return <ForgotPasswordVerifyForm onVerified={handleForgotPasswordVerified} />;
  }

  if (step === "FORGOT_PASSWORD_NEW_PASSWORD") {
    return (
      <ForgotPasswordNewPasswordForm onSuccess={handleForgotPasswordResetSuccess} />
    );
  }

  return <PasswordSignup email={email} onSuccess={handleSignupSuccess} />;
}
