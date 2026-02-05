import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
interface EmailFormData {
  email: string;
}

const emailSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

export default function EmailForm({ initialEmail, onSubmitEmail }: { initialEmail?: string; onSubmitEmail: (email: string) => Promise<void> }) {
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
    <form onSubmit={formik.handleSubmit}>
      <input
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}
      <button type="submit" disabled={isLoading}>Submit</button>
    </form>
  );
}
