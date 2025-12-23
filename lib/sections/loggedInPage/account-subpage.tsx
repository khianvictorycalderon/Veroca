'use client'
import GeneralFooter from "@/lib/components/general-footer";
import { Input } from "@/lib/components/input-field";
import SectionContainer from "@/lib/components/section-container";
import { HeadingText } from "@/lib/components/typography";
import { AccountManagementFieldProps, AccountManagementFormData, AccountManagementPasswordFormData } from "@/lib/interfaces";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function AccountSubPage() {

    const accountInputFieldDefaultValues = {
        first_name: "John",
        last_name: "Doe",
        username: "JohnDoe123",
        email: "johndoe@gmail.com",
        birth_date: "2003-03-02"
    }

    // ---------------------------------------------------------
    // Account Management
    const accountMethods = useForm<AccountManagementFormData>({
        defaultValues: accountInputFieldDefaultValues
    });
    const { handleSubmit } = accountMethods;

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const onSave = (data: AccountManagementFormData) => {
        console.log(data);
        setIsEditing(false);
    };

    const onCancel = () => {
        setIsEditing(false);
        accountMethods.reset(); // Return to old values
    }

    const fields: AccountManagementFieldProps[] = [
        { name: "first_name", label: "First Name" },
        { name: "last_name", label: "Last Name" },
        { name: "username", label: "Username" },
        { name: "email", label: "Email", type: "email" },
        { name: "birth_date", label: "Birth Date", type: "date" }
    ];
    // ---------------------------------------------------------

    // ---------------------------------------------------------
    // Password Management
    const passwordMethods = useForm<AccountManagementPasswordFormData>({
        defaultValues: {
            old_password: "",
            new_password: "",
            confirm_password: ""
        }
    });

    const { handleSubmit: handlePasswordSubmit } = passwordMethods;

    const onChangePassword = (data: AccountManagementPasswordFormData) => {
        console.log("Password change:", data);
        alert("Password changed!");
        passwordMethods.reset();
    };

    // ---------------------------------------------------------

    return (
        <>
            <SectionContainer className="bg-gray-50">
                
                <div className="py-4 md:py-8 lg:py-16 min-h-[100vh] flex flex-col items-center justify-center gap-16">
                    
                    <div className="w-full">
                        <HeadingText className="text-center text-neutral-800">Manage your Account</HeadingText>
                        <FormProvider {...accountMethods}>
                            <form
                                onSubmit={handleSubmit(onSave)}
                                className="text-neutral-950 grid grid-cols-1 lg:grid-cols-2 mt-8 gap-4 flex-1 w-full"
                            >
                                {fields.map(field => (
                                    <div key={field.name} className={`w-full ${field?.wrapper}`}>
                                        <Input additionalClassName={{
                                            input: "disabled:!text-neutral-950 disabled:!bg-gray-300 bg-gray-200 focus:ring-2 focus:ring-orange-600"
                                        }} disabled={!isEditing} {...field} />
                                    </div>
                                ))}

                                {isEditing ? (
                                    <div className="mt-4 lg:col-span-2 lg:mt-0 grid grid-cols-2 gap-4">
                                        <Input
                                            type="submit"
                                            value="Save"
                                            additionalClassName={{
                                                input: "disabled:!text-gray-400 disabled:!bg-gray-300 !bg-blue-600 hover:!bg-blue-500 cursor-pointer font-semibold !text-white transition duration-300 !ring-0",
                                            }}
                                        />
                                        <button
                                            type="button"
                                            value="Cancel"
                                            className="disabled:!text-gray-400 disabled:!bg-gray-300 !bg-red-600 hover:!bg-red-500 cursor-pointer font-semibold !text-white transition duration-300 py-2 rounded-md !ring-0"
                                            onClick={onCancel}
                                        >Cancel</button>
                                    </div>
                                ) : (
                                    <div className="mt-4 lg:col-span-2 lg:mt-0 grid grid-cols-1 gap-4">
                                        <button
                                            className="disabled:!text-gray-400 disabled:!bg-gray-300 !bg-orange-600 hover:!bg-orange-500 cursor-pointer font-semibold !text-white transition duration-300 py-2 rounded-md !ring-0"
                                            onClick={() => setIsEditing(true)}
                                        >Edit</button>
                                    </div>
                                )}
                            </form>
                        </FormProvider>
                    </div>

                    <div className="w-full">
                        <HeadingText className="text-center text-neutral-800">Change Password</HeadingText>
                        <FormProvider {...passwordMethods}>
                            <form
                                onSubmit={handlePasswordSubmit(onChangePassword)}
                                className="text-neutral-950 grid grid-cols-1 lg:grid-cols-2 mt-8 gap-4 flex-1 w-full"
                            >
                                {[
                                    { name: "old_password", label: "Old Password", type: "password" },
                                    { name: "new_password", label: "New Password", type: "password" },
                                    { name: "confirm_password", label: "Confirm New Password", type: "password" },
                                ].map(field => (
                                    <div key={field.name} className="w-full">
                                        <Input
                                            additionalClassName={{
                                                input: "bg-gray-200 focus:ring-2 focus:ring-orange-600"
                                            }}
                                            {...field}
                                        />
                                    </div>
                                ))}

                                <div className="mt-4 lg:col-span-2 grid grid-cols-1 gap-4">
                                    <Input
                                        type="submit"
                                        value="Update Password"
                                        additionalClassName={{
                                            input: "!bg-amber-500 hover:!bg-amber-400 cursor-pointer font-semibold !text-white transition duration-300 !ring-0",
                                        }}
                                    />
                                </div>
                            </form>
                        </FormProvider>
                    </div>
                    
                </div>

            </SectionContainer>

            <GeneralFooter/>
        </>
    )
}