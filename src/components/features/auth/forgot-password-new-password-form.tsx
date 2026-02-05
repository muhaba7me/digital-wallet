import Image from "next/image";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { useState } from "react";

import { Field, useFormik } from "formik";
import { PasswordSignupFormData, passwordSignupSchema } from "../transfer/validation-schemas";
import { FieldError, FieldLabel } from "@/components/shared/field";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";

export default function ForgotPasswordNewPasswordForm({
  onSuccess,
}: {
  onSuccess: () => Promise<void> | void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik<PasswordSignupFormData>({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: passwordSignupSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 700));
        await onSuccess();
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="w-full max-w-md space-y-8 border rounded-2xl p-8">
      <div className="text-center space-y-2 flex flex-col items-center">
        <Image src="/image-1.png" alt="Logo" width={100} height={100} />
        <h1 className="text-2xl font-bold text-gray-900 mt-6">
          Create New Password
        </h1>
        <p className="text-gray-600">Please create a new password.</p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <Field
          data-invalid={Boolean(
            formik.touched.password && formik.errors.password,
          )}
        >
          <FieldLabel
            htmlFor="reset-password"
            className="text-gray-700 font-medium"
          >
            New Password
          </FieldLabel>
          <div className="relative">
            <Input
              id="reset-password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••••••••••"
              disabled={isLoading}
              aria-invalid={Boolean(
                formik.touched.password && formik.errors.password,
              )}
              autoComplete="new-password"
              className="h-12 pr-12 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </Button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <FieldError
              errors={[{ message: formik.errors.password }]}
            />
          )}
        </Field>

        <Field
          data-invalid={Boolean(
            formik.touched.confirmPassword &&
              formik.errors.confirmPassword,
          )}
        >
          <FieldLabel
            htmlFor="reset-confirm-password"
            className="text-gray-700 font-medium"
          >
            Confirm Password
          </FieldLabel>
          <div className="relative">
            <Input
              id="reset-confirm-password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••••••••••••••"
              disabled={isLoading}
              aria-invalid={Boolean(
                formik.touched.confirmPassword &&
                  formik.errors.confirmPassword,
              )}
              autoComplete="new-password"
              className="h-12 pr-12 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              disabled={isLoading}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </Button>
          </div>
          {formik.touched.confirmPassword &&
            formik.errors.confirmPassword && (
              <FieldError
                errors={[{ message: formik.errors.confirmPassword }]}
              />
            )}
        </Field>

        <Button
          type="submit"
          className="w-full h-12 bg-gradient-to-r from-primary/80 via-primary to-primary/80 hover:from-primary/70 hover:via-primary/90 hover:to-primary/70 text-white font-medium rounded-lg shadow-md"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            "Continue"
          )}
        </Button>
      </form>
    </div>
  );
}
