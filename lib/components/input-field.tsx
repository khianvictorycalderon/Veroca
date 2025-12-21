import React from "react";
import { useFormContext } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name?: string;
  additionalClassName?: {
    label?: string;
    input?: string;
    feedback?: string;
  };
}

export const Input: React.FC<InputProps> = ({
  label,
  name,
  additionalClassName,
  ...props
}) => {
  
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = name && errors[name]?.message as string | undefined;

  return (
    <div>
      {label && (
        <label
          className={`pl-2 block text-sm font-medium mb-1 text-neutral-800 ${additionalClassName?.label ?? ""}`}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <input
        id={name}
        className={`w-full px-4 py-2 bg-gray-200 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow ${
          additionalClassName?.input ?? ""
        }`}
        placeholder={label ? `Enter ${label.toLowerCase()}...` : ""}
        {...(name ? register(name as any, { required: `${label} is required` }) : {})}
        {...props}
      />
      {errorMessage && (
        <p
          className={`pl-2 mt-1 text-sm text-red-400 ${
            additionalClassName?.feedback ?? ""
          }`}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};
