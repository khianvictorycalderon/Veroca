'use client'

import { Input } from "@/lib/components/input-field";
import SectionContainer from "@/lib/components/section-container";
import { BaseText, HeadingText } from "@/lib/components/typography";
import { RegisterFieldProps, RegisterFormData, RegisterFormProps } from "@/lib/interfaces";
import { handleAPIRequest } from "@/utils/req-helper";
import axios from "axios";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function RegisterForm({
    setPage
}: RegisterFormProps) {

    const methods = useForm<RegisterFormData>({
        mode: "onChange",
        defaultValues: {
            first_name: "",
            last_name: "",
            username: "",
            birth_date: "",
            password: "",
            confirm_password: ""
        }
    });

    const { handleSubmit } = methods;

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const onSubmit = (data: RegisterFormData) => {
        setIsSubmitting(true);

        // Clears out any error (if there is any)
        setErrorMessage("");

        handleAPIRequest(
            async () => {
                await axios.post("/api/register", {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    username: data.username,
                    birth_date: data.birth_date,
                    password: data.password
                });

                // Clears all the input fields
                methods.reset();
            }, 
            "Failed to register",
            setErrorMessage,
            async () => {},
            async () => {
                setIsSubmitting(false);
            }
        );
    };

    const fields: RegisterFieldProps[] = [
        {
            name: "first_name",
            label: "First Name",
            validate: (value) =>
            /^[A-Za-z\s]+$/.test(value) || "First name cannot contain numbers or special characters"
        },
        {
            name: "last_name",
            label: "Last Name",
            validate: (value) =>
            /^[A-Za-z\s]+$/.test(value) || "Last name cannot contain numbers or special characters"
        },
        {
            name: "username",
            label: "Username",
            validate: (value) =>
            value.length >= 3 || "Username must be at least 3 characters"
        },
        {
            name: "birth_date",
            label: "Birth Date",
            type: "date",
            validate: (value: string) => {
                if (!value) return "Birth date is required";

                const birthDate = new Date(value);
                const today = new Date();

                // Calculate age
                const age = today.getFullYear() - birthDate.getFullYear();
                const m = today.getMonth() - birthDate.getMonth();
                const dayDiff = today.getDate() - birthDate.getDate();

                // Adjust if birthday hasn't occurred yet this year
                const actualAge = m < 0 || (m === 0 && dayDiff < 0) ? age - 1 : age;

                return actualAge >= 12 || "You must be at least 12 years old";
            }
        },
        {
            name: "password",
            label: "Password",
            type: "password",
            validate: (value) =>
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/.test(value) ||
            "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
        },
        {
            name: "confirm_password",
            label: "Confirm Password",
            type: "password",
            validate: (value, getValues) =>
            value === getValues().password || "Passwords do not match"
        },
    ];

    return (
        <SectionContainer>
            <div className="py-4 md:py-8 lg:py-16 min-h-[70vh] flex flex-col items-center justify-center">
                <div className="w-full">
                    <HeadingText className="text-center text-neutral-800">Create an Account</HeadingText>
                    <FormProvider {...methods}>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="text-neutral-950 grid grid-cols-1 lg:grid-cols-2 mt-8 gap-4 flex-1 w-full"
                        >
                            {fields.map(field => (
                                <div key={field.name} className={`w-full ${field?.wrapper}`}>
                                    <Input<RegisterFormData>
                                        name={field.name}
                                        label={field.label}
                                        type={field.type}
                                        disabled={isSubmitting}
                                        registerOptions={{
                                            required: `${field.label} is required`,
                                            validate: field.validate
                                            ? (value: string) => field.validate!(value, methods.getValues)
                                            : undefined,
                                        }}
                                        additionalClassName={{
                                            input: "disabled:!text-gray-400 disabled:!bg-gray-300 disabled:!cursor-not-allowed focus:!ring-orange-600"
                                        }}
                                    />
                                </div>
                            ))}

                            <div className="mt-4 lg:col-span-2 lg:mt-0">
                                <Input
                                    type="submit"
                                    value="Register"
                                    disabled={isSubmitting}
                                    additionalClassName={{
                                        input: "disabled:!text-gray-400 disabled:!bg-gray-300 disabled:!cursor-not-allowed !bg-orange-500 hover:!bg-orange-400 cursor-pointer font-semibold !text-white transition duration-300 focus:!ring-orange-600",
                                    }}
                                />
                            </div>
                        </form>
                    </FormProvider>
                    {errorMessage && <BaseText className="text-center mt-4 text-red-400">{errorMessage}</BaseText>}
                    <BaseText className="mt-4 text-right">Already have an Account? <button onClick={() => setPage("login")} className="text-orange-600 underline cursor-pointer">Sign-In</button></BaseText>
                </div>
            </div>
        </SectionContainer>
    )
}
