import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import * as Yup from "yup";
import Image from "next/image";
import { FieldLabel, FieldError } from "@/components/shared/field";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";
interface EmailFormData {
  email: string;
}

const emailSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

export default function EmailForm({
  initialEmail,
  onSubmitEmail,
  title = "Enter your email",
  subtitle = "We'll use this to sign you in or create your account",
  buttonText = "Continue"
}: {
  initialEmail?: string;
  onSubmitEmail: (email: string) => Promise<void>;
  title?: string;
  subtitle?: string;
  buttonText?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik<EmailFormData>({
    initialValues: {
      email: initialEmail ?? "",
    },
    validationSchema: emailSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (data: EmailFormData) => {
      setIsLoading(true);
      try {
        await onSubmitEmail(data.email);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="w-full max-w-md space-y-8 border rounded-2xl p-8">
      <div className="text-center space-y-2 flex flex-col items-center">
        <Image src="/image-1.png" alt="Logo" width={100} height={100} />
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600">{subtitle}</p>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <FieldLabel htmlFor="email" className="text-gray-700 font-medium">
            Email
          </FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            className="h-12 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
            aria-invalid={Boolean(formik.touched.email && formik.errors.email)}
          />
          {formik.touched.email && formik.errors.email && (
            <FieldError errors={[{ message: formik.errors.email }]} />
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-linear-to-r from-primary/80 via-primary to-primary/80 hover:from-primary/70 hover:via-primary/90 hover:to-primary/70 text-white font-medium rounded-lg shadow-md"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {buttonText}...
            </>
          ) : (
            buttonText
          )}
        </Button>
      </form>
    </div>
  );
}
