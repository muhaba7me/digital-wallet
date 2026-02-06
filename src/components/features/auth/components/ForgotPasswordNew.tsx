"use client";

import Image from "next/image";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useFormik, Field } from "formik";
import { PasswordSignupFormData, passwordSignupSchema } from "../../money-transfer/validation-schemas";
import { FieldLabel, FieldError } from "@/components/shared/field";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";

type Props = {
  onSuccess: () => Promise<void> | void;
};

function PasswordField({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  disabled,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <Field data-invalid={Boolean(error)}>
      <FieldLabel htmlFor={id} className="text-gray-700 font-medium">
        {label}
      </FieldLabel>
      <div className="relative">
        <Input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          placeholder="••••••••••••••••••••"
          disabled={disabled}
          autoComplete="new-password"
          className="h-12 pr-12 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setVisible(!visible)}
          disabled={disabled}
        >
          {visible ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
        </Button>
      </div>
      {error && <FieldError errors={[{ message: error }]} />}
    </Field>
  );
}

export default function ForgotPasswordNewPasswordForm({ onSuccess }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik<PasswordSignupFormData>({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: passwordSignupSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async () => {
      setIsLoading(true);
      try {
        await new Promise((r) => setTimeout(r, 700));
        await onSuccess();
      } finally {
        setIsLoading(false);
      }
    },
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = formik;

  return (
    <div className="w-full max-w-md space-y-8 border rounded-2xl p-8">
      <div className="text-center space-y-2 flex flex-col items-center">
        <Image src="/image-1.png" alt="Logo" width={100} height={100} />
        <h1 className="text-2xl font-bold text-gray-900 mt-6">Create New Password</h1>
        <p className="text-gray-600">Please create a new password.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <PasswordField
          id="reset-password"
          name="password"
          label="New Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password ? errors.password : undefined}
          disabled={isLoading}
        />

        <PasswordField
          id="reset-confirm-password"
          name="confirmPassword"
          label="Confirm Password"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.confirmPassword ? errors.confirmPassword : undefined}
          disabled={isLoading}
        />

        <Button
          type="submit"
          className="w-full h-12 bg-gradient-to-r from-primary/80 via-primary to-primary/80 hover:from-primary/70 hover:via-primary/90 hover:to-primary/70 text-white font-medium rounded-lg shadow-md"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
            </>
          ) : (
            "Continue"
          )}
        </Button>
      </form>
    </div>
  );
}
