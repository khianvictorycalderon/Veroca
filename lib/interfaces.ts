import { HTMLInputTypeAttribute, SetStateAction } from "react";
import { HomeAccountSectionType, LoggedInPageType } from "./types";

// -------------------------------------------------------------
// Login Page interfaces

export interface LoginFormData {
  username: string;
  password: string;
}

export interface LoginFieldProps {
  name?: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  wrapper?: string;
  pattern?: string;
}

export interface LoginFormProps {
    setPage: React.Dispatch<SetStateAction<HomeAccountSectionType>>;
}

// -------------------------------------------------------------

// -------------------------------------------------------------
// Register Page interfaces
export interface RegisterFormData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  birth_date: string;
  password: string;
  confirm_password: string;
}

export interface RegisterFieldProps {
  name?: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  wrapper?: string;
  pattern?: string;
}

export interface RegisterFormProps {
    setPage: React.Dispatch<SetStateAction<HomeAccountSectionType>>;
}

// -------------------------------------------------------------

// -------------------------------------------------------------
// General Side Bar interface
export interface GeneralSideBarProps {
    setPage: React.Dispatch<SetStateAction<LoggedInPageType>>;
}

// -------------------------------------------------------------

// -------------------------------------------------------------
// Account Management interface
export interface AccountManagementFormData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  birth_date: string;
}

export interface AccountManagementFieldProps {
  name?: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  wrapper?: string;
  pattern?: string;
}
// -------------------------------------------------------------