"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { useField } from "formik";

import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";

type FormFieldContextValue = {
  name: string;
  error?: { message?: string };
};

const FormFieldContext = React.createContext<FormFieldContextValue | undefined>(
  undefined,
);

const FormItemContext = React.createContext<{ id: string } | undefined>(
  undefined,
);

type FormFieldRenderProps = {
  field: {
    name: string;
    value: unknown;
    onChange: (eventOrValue: React.ChangeEvent<any> | any) => void;
    onBlur: React.FocusEventHandler<any>;
  };
  fieldState: {
    invalid: boolean;
    isTouched: boolean;
    isDirty: boolean;
    error?: { message?: string };
  };
};

type FormFieldProps = {
  name: string;
  control?: unknown;
  render: (props: FormFieldRenderProps) => React.ReactNode;
};

function FormField({ name, render }: FormFieldProps) {
  const [field, meta] = useField(name);

  const errorMessage =
    meta.touched && meta.error ? String(meta.error) : undefined;

  const fieldState: FormFieldRenderProps["fieldState"] = {
    invalid: Boolean(meta.touched && meta.error),
    isTouched: Boolean(meta.touched),
    // meta.initialValue is available in Formik meta; fallback to strict inequality check
    isDirty: (meta as any).initialValue !== field.value,
    error: errorMessage ? { message: errorMessage } : undefined,
  };

  return (
    <FormFieldContext.Provider value={{ name, error: fieldState.error }}>
      {render({
        field: {
          name: field.name,
          value: field.value,
          onChange: field.onChange,
          onBlur: field.onBlur,
        },
        fieldState,
      })}
    </FormFieldContext.Provider>
  );
}

function useFormField() {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);

  if (!fieldContext) {
    throw new Error("useFormField must be used within <FormField>");
  }
  if (!itemContext) {
    throw new Error("useFormField must be used within <FormItem>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    error: fieldContext.error,
  };
}

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("space-y-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}

function FormControl({
  className,
  ...props
}: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      className={className}
      {...props}
    />
  );
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function FormMessage({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error.message) : children;

  if (!body) return null;

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-destructive text-sm font-medium", className)}
      {...props}
    >
      {body}
    </p>
  );
}

export {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
};
