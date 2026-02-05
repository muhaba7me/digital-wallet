export interface EmailFormData {
  email: string;
}

export interface PasswordFormData {
  password: string;
}

export interface PasswordSignupFormData extends PasswordFormData {
  confirmPassword: string;
}
