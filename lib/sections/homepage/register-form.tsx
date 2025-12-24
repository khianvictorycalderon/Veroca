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
    const methods = useForm<RegisterFormData>();
    const { handleSubmit } = methods;

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const onSubmit = (data: RegisterFormData) => {
        setIsSubmitting(true);

        handleAPIRequest(
            async () => {
                await axios.post("/api/register", {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    username: data.username,
                    email: data.email,
                    birth_date: data.birth_date,
                    password: data.password
                });
               // window.location.reload(); // Refresh for the login session
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
        { name: "first_name", label: "First Name" },
        { name: "last_name", label: "Last Name" },
        { name: "username", label: "Username" },
        { name: "email", label: "Email", type: "email" },
        { name: "birth_date", label: "Birth Date", type: "date" },
        { name: "password", label: "Password", type: "password" },
        { name: "confirm_password", label: "Confirm Password", type: "password" },
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
                                    <Input
                                        disabled={isSubmitting} 
                                        additionalClassName={{
                                            input: "disabled:!text-gray-400 disabled:!bg-gray-300 disabled:!cursor-not-allowed focus:!ring-orange-600"
                                        }} 
                                        {...field} />
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
