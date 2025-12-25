'use client'
import GeneralFooter from "@/lib/components/general-footer";
import { Input } from "@/lib/components/input-field";
import SectionContainer from "@/lib/components/section-container";
import { BaseText, HeadingText } from "@/lib/components/typography";
import { AccountManagementFieldProps, AccountManagementFormData, AccountManagementPasswordFieldProps, AccountManagementPasswordFormData } from "@/lib/interfaces";
import { handleAPIRequest } from "@/utils/req-helper";
import axios from "axios";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function AccountSubPage() {

    const accountInputFieldDefaultValues = {
        first_name: "Loading...",
        last_name: "Loading...",
        username: "",
        birth_date: ""
    }

    // ---------------------------------------------------------
    // Account Management

    const accountMethods = useForm<AccountManagementFormData>({
        defaultValues: accountInputFieldDefaultValues
    });
    const { handleSubmit } = accountMethods;

    const fields: AccountManagementFieldProps[] = [
        { name: "first_name", label: "First Name" },
        { name: "last_name", label: "Last Name" },
        { name: "birth_date", label: "Birth Date", type: "date" }
    ];

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const [fetchedUserData, setFecthedUserData] = useState<AccountManagementFormData>({
        first_name: "",
        last_name: "",
        username: "",
        birth_date: ""
    })

    // Fetch 
    async function fetchUserData() {
        await handleAPIRequest(
        async () => {
            const res = await axios.get("/api/account/info");
            const userData: AccountManagementFormData = res.data;

            // Normalize birth_date to YYYY-MM-DD string
            if (userData.birth_date) {
                const date = new Date(userData.birth_date);
                userData.birth_date = date.toLocaleDateString("en-CA"); // YYYY-MM-DD
            }

            setFecthedUserData(userData)
            accountMethods.reset(userData);
        },
        "Failed to retrieve user data",
        () => {}, // optional setState for error handling
        async () => {}, // optional errAction
        async () => {}  // optional finally
        );
    }

    // On page load, fetch user data
    useEffect(() => {
        fetchUserData();
    }, [accountMethods]);

    const [saveErrorMessage, setSaveErrorMessage] = useState<string>("");
    const onSave = async (data: AccountManagementFormData) => {
        setIsSubmitting(true);
        setSaveErrorMessage("");

        await handleAPIRequest(
            async () => {
                await axios.patch("/api/account/info", data);
                await fetchUserData();
                setIsEditing(false);
            },
            "Failed to update account",
            setSaveErrorMessage,
            async () => {}, // optional error action
            async () => {
                setIsSubmitting(false)
            }
        );

    };

    const onCancel = () => {
        setIsEditing(false);
        accountMethods.reset(fetchedUserData); // Return to old values
    }

    // ---------------------------------------------------------

    // ---------------------------------------------------------
    // Password Management
    const passwordMethods = useForm<AccountManagementPasswordFormData>({
        mode: "onChange",
        defaultValues: {
            old_password: "",
            new_password: "",
            confirm_password: ""
        }
    });

    const changePasswordFields: AccountManagementPasswordFieldProps[] = [
        { 
            name: "old_password",
            label: "Old Password",
            type: "password"
        },
        { 
            name: "new_password",
            label: "New Password",
            type: "password",
            validate: (value) =>
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/.test(value) ||
                "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
        },
        { 
            name: "confirm_password",
            label: "Confirm New Password",
            type: "password",
            validate: (value, getValues) =>
                value === getValues().new_password || "Passwords do not match"
        },
    ]

    const { handleSubmit: handlePasswordSubmit } = passwordMethods;

    const [changePassErrorMessage, setChangePassErrorMessage] = useState<string>("");
    const [changePassSuccessMessage, setChangePassSuccessMessage] = useState<string>("");
    const [isUpdatingPassword, setIsUpdatingPassword] = useState<boolean>(false);

    const onChangePassword = async (data: AccountManagementPasswordFormData) => {
        setIsUpdatingPassword(true);
        setChangePassErrorMessage("");
        setChangePassSuccessMessage("");

        await handleAPIRequest(
            async () => {
                await axios.post("/api/account/password", {
                    old_password: data.old_password,
                    new_password: data.new_password
                });

                setChangePassSuccessMessage("Password successfully changed!");
                passwordMethods.reset();
            },
            "Failed to update password",
            setChangePassErrorMessage,
            async () => {}, // optional error action
            async () => {
                setIsUpdatingPassword(false);
            }
        );
    };

    // ---------------------------------------------------------

    return (
        <>
            <SectionContainer className="bg-gray-50">
                
                <div className="py-4 md:py-8 lg:py-16 min-h-[100vh] flex flex-col items-center justify-center gap-16">
                    
                    <div className="w-full">
                        <HeadingText className="text-center text-neutral-800 mt-8 lg:mt-0">Manage your Account</HeadingText>
                        
                        <div className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-200 mt-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div>
                                <BaseText className="text-sm text-gray-600">Username</BaseText>
                                <BaseText className="font-semibold text-lg text-neutral-800 underline">{fetchedUserData.username || "Loading..."}</BaseText>
                                </div>
                                <div className="sm:text-right">
                                <BaseText className="text-xs italic text-gray-500">
                                    NOTE: Username cannot be changed after creating an account.
                                </BaseText>
                                </div>
                            </div>
                        </div>

                        <FormProvider {...accountMethods}>
                            <form
                                onSubmit={handleSubmit(onSave)}
                                className="text-neutral-950 grid grid-cols-1 lg:grid-cols-2 mt-8 gap-4 flex-1 w-full"
                            >
                                {fields.map(field => (
                                    <div key={field.name} className={`w-full ${field?.wrapper}`}>
                                        <Input 
                                            additionalClassName={{
                                                input: "disabled:cursor-not-allowed disabled:!text-neutral-950 disabled:!bg-gray-300 bg-gray-200 focus:ring-2 focus:ring-orange-600"
                                            }} 
                                            disabled={!isEditing || isSubmitting} {...field} />
                                    </div>
                                ))}

                                {isEditing ? (
                                    <div className="mt-4 lg:col-span-2 lg:mt-0 grid grid-cols-2 gap-4">
                                        <Input
                                            disabled={isSubmitting}
                                            type="submit"
                                            value="Save"
                                            additionalClassName={{
                                                input: "disabled:cursor-not-allowed disabled:!text-gray-400 disabled:!bg-gray-300 !bg-blue-600 hover:!bg-blue-500 cursor-pointer font-semibold !text-white transition duration-300 !ring-0",
                                            }}
                                        />
                                        <button
                                            disabled={isSubmitting}
                                            type="button"
                                            value="Cancel"
                                            className="disabled:cursor-not-allowed disabled:!text-gray-400 disabled:!bg-gray-300 !bg-red-600 hover:!bg-red-500 cursor-pointer font-semibold !text-white transition duration-300 py-2 rounded-md !ring-0"
                                            onClick={onCancel}
                                        >Cancel</button>
                                    </div>
                                ) : (
                                    <div className="mt-4 lg:col-span-2 lg:mt-0 grid grid-cols-1 gap-4">
                                        <button
                                            disabled={isSubmitting}
                                            className="disabled:!text-gray-400 disabled:!bg-gray-300 !bg-orange-600 hover:!bg-orange-500 cursor-pointer font-semibold !text-white transition duration-300 py-2 rounded-md !ring-0"
                                            onClick={() => setIsEditing(true)}
                                        >Edit</button>
                                    </div>
                                )}
                            </form>
                        </FormProvider>
                        {saveErrorMessage && <BaseText className="text-red-600 text-center mt-2">{saveErrorMessage}</BaseText>}
                    </div>

                    <div className="w-full">
                        <HeadingText className="text-center text-neutral-800">Change Password</HeadingText>
                        <FormProvider {...passwordMethods}>
                            <form
                                onSubmit={handlePasswordSubmit(onChangePassword)}
                                className="text-neutral-950 grid grid-cols-1 lg:grid-cols-2 mt-8 gap-4 flex-1 w-full"
                            >
                                {changePasswordFields.map(field => {
                                    const { validate, ...rest } = field;   // strip it out

                                    return (
                                        <div key={field.name} className="w-full">
                                        <Input
                                            disabled={isUpdatingPassword}
                                            registerOptions={{
                                            required: `${field.label} is required`,
                                            validate: validate
                                                ? (value: string) =>
                                                    validate(value, passwordMethods.getValues)
                                                : undefined,
                                            }}
                                            additionalClassName={{
                                            input:
                                                "disabled:cursor-not-allowed disabled:!text-neutral-950 disabled:!bg-gray-300 bg-gray-200 focus:ring-2 focus:ring-orange-600",
                                            }}
                                            {...rest}
                                        />
                                        </div>
                                    );
                                })}

                                <div className="mt-4 lg:col-span-2 grid grid-cols-1 gap-4">
                                    <Input
                                        disabled={isUpdatingPassword}
                                        type="submit"
                                        value="Update Password"
                                        additionalClassName={{
                                            input: "disabled:cursor-not-allowed disabled:!text-neutral-950 disabled:!bg-gray-300 !bg-amber-500 hover:!bg-amber-400 cursor-pointer font-semibold !text-white transition duration-300 !ring-0",
                                        }}
                                    />
                                </div>
                            </form>
                        </FormProvider>
                        {changePassErrorMessage && <BaseText className="text-red-600 text-center mt-2">{changePassErrorMessage}</BaseText>}
                        {changePassSuccessMessage && <BaseText className="text-green-600 text-center mt-2">{changePassSuccessMessage}</BaseText>}
                    </div>
                </div>

                <div className="w-full">
                    <HeadingText className="text-center text-neutral-800">Account Deletion</HeadingText>
                </div>

            </SectionContainer>

            <GeneralFooter/>
        </>
    )
}