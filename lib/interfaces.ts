import { HTMLInputTypeAttribute, SetStateAction } from "react";
import { HomeAccountSectionType, LoggedInPageType } from "./types";
import { RegisterOptions } from "react-hook-form";

// -------------------------------------------------------------
// Login Page interfaces

export interface LoginFormData {
  username: string;
  password: string;
}

export interface LoginFieldProps {
  name?: keyof LoginFormData;
  label?: string;
  type?: HTMLInputTypeAttribute;
  wrapper?: string;
  pattern?: string;
  registerOptions?: RegisterOptions<LoginFormData>;
  validate?: (value: string, getValues: () => RegisterFormData) => string | boolean;
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
  birth_date: string;
  password: string;
  confirm_password: string;
}

export interface RegisterFieldProps {
  name?: keyof RegisterFormData;
  label?: string;
  type?: HTMLInputTypeAttribute;
  wrapper?: string;
  pattern?: string;
  validate?: (value: string, getValues: () => RegisterFormData) => string | boolean;
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

export interface AccountManagementPasswordFormData {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

export interface AccountManagementFieldProps {
  name?: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  wrapper?: string;
  pattern?: string;
}
// -------------------------------------------------------------

// -------------------------------------------------------------
// Order Management interface
export interface OrderManagementOrderListProps {
  id: string;
  name: string;
  customers: {
    customer_name: string;
    quantity: number;
    remarks: string;
  }[];
}

export interface OrderManagementCustomerRefs {
  customer_name: HTMLInputElement | null;
  quantity: HTMLInputElement | null;
  remarks: HTMLInputElement | null;
};

// id: "ORD005",
//             name: "Waffles - Tomorrow",
//             details: [
//                 { customer_name: "Jane Smith", quantity: 4, remarks: "" },
//                 { customer_name: "Bob Lee", quantity: 2, remarks: "Urgent" },
//             ]
// -------------------------------------------------------------