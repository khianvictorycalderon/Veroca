'use client'
import { Input } from "@/lib/components/input-field";
import SectionContainer from "@/lib/components/section-container";
import { HeadingText } from "@/lib/components/typography";
import { AccountManagementFieldProps, AccountManagementFormData } from "@/lib/interfaces";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function AccountSubPage() {

    const methods = useForm<AccountManagementFormData>({
        defaultValues: {
            first_name: "John",
            last_name: "Doe",
            username: "JohnDoe123",
            email: "johndoe@gmail.com",
            birth_date: "2003-03-02"
        }
    });
    const { handleSubmit } = methods;

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const onSave = (data: AccountManagementFormData) => {
        console.log(data);
        setIsEditing(false);
    };

    const onCancel = () => {
        setIsEditing(false);
    }

    const fields: AccountManagementFieldProps[] = [
        { name: "first_name", label: "First Name" },
        { name: "last_name", label: "Last Name" },
        { name: "username", label: "Username" },
        { name: "email", label: "Email", type: "email" },
        { name: "birth_date", label: "Birth Date", type: "date" }
    ];

    return (
        <SectionContainer className="bg-gray-50">
            
            <div className="py-4 md:py-8 lg:py-16 min-h-[100vh] flex flex-col items-center justify-center">
                
                <div className="w-full">
                    <HeadingText className="text-center text-neutral-800">Manage your Account</HeadingText>
                    {isEditing ? (
                        <FormProvider {...methods}>
                            <form
                                onSubmit={handleSubmit(onSave)}
                                className="text-neutral-950 grid grid-cols-1 lg:grid-cols-2 mt-8 gap-4 flex-1 w-full"
                            >
                                {fields.map(field => (
                                    <div key={field.name} className={`w-full ${field?.wrapper}`}>
                                        <Input additionalClassName={{
                                            input: "disabled:!text-gray-400 disabled:!bg-gray-300"
                                        }} disabled={!isEditing} {...field} />
                                    </div>
                                ))}

                                <div className="mt-4 lg:col-span-2 lg:mt-0 grid grid-cols-2 gap-4">
                                    <Input
                                        type="submit"
                                        value="Save"
                                        additionalClassName={{
                                            input: "!flex-1 disabled:!text-gray-400 disabled:!bg-gray-300 !bg-green-600 hover:!bg-green-500 cursor-pointer font-semibold !text-white transition duration-300",
                                        }}
                                    />
                                    <Input
                                        type="button"
                                        value="Cancel"
                                        additionalClassName={{
                                            input: "!flex-1 disabled:!text-gray-400 disabled:!bg-gray-300 !bg-red-600 hover:!bg-red-500 cursor-pointer font-semibold !text-white transition duration-300",
                                        }}
                                        onClick={onCancel}
                                    />
                                </div>
                            </form>
                        </FormProvider>
                    ) : (
                        <>
                            <button onClick={() => setIsEditing(true)}>Edit your data</button>
                        </>
                    )}
                </div>
                
            </div>

        </SectionContainer>
    )
}