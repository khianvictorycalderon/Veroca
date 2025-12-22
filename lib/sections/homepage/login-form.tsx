'use client'

import { Input } from "@/lib/components/input-field";
import SectionContainer from "@/lib/components/section-container";
import { BaseText, HeadingText } from "@/lib/components/typography";
import { LoginFieldProps, LoginFormData, LoginFormProps } from "@/lib/interfaces";
import { handleAPIRequest } from "@/utils/req-helper";
import axios from "axios";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function LoginForm({
    setPage
}: LoginFormProps) {
    const methods = useForm<LoginFormData>();
    const { handleSubmit } = methods;

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const onSubmit = (data: LoginFormData) => {
        handleAPIRequest(
            async () => {
                await axios.post("/api/login", {
                    username: data.username,
                    password: data.password
                }, {
                    withCredentials: true
                });
            }, 
            "Failed to login",
            setErrorMessage,
            async () => {},
            async () => {
                setIsSubmitting(false);
            }
        );
    };

    const fields: LoginFieldProps[] = [
        { name: "username", label: "Username" },
        { name: "password", label: "Password", type: "password" },
    ];

    return (
        <SectionContainer>
            <div className="py-4 md:py-8 lg:py-16 min-h-[70vh] flex flex-col items-center justify-center">
                <div className="w-full">
                    <HeadingText className="text-center text-neutral-800">Login your Account</HeadingText>
                    <FormProvider {...methods}>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="text-neutral-950 grid grid-cols-1 lg:grid-cols-2 mt-8 gap-4 flex-1 w-full"
                        >
                            {fields.map(field => (
                                <div key={field.name} className={`w-full ${field?.wrapper}`}>
                                    <Input {...field} />
                                </div>
                            ))}

                            <div className="mt-4 lg:col-span-2 lg:mt-0">
                            <Input
                                type="submit"
                                value="Login"
                                additionalClassName={{
                                    input: "!bg-green-600 hover:!bg-green-500 cursor-pointer font-semibold !text-white transition duration-300",
                                }}
                            />
                            </div>
                        </form>
                    </FormProvider>
                    {errorMessage && <BaseText className="text-center mt-4 text-red-400">{errorMessage}</BaseText>}
                    <BaseText className="mt-4 text-right">No Account? <button onClick={() => setPage("register")} className="text-blue-600 underline cursor-pointer">Create One</button></BaseText>
                </div>
            </div>
        </SectionContainer>
    )
}