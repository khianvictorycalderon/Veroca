import { Input } from "@/lib/components/input-field";
import SectionContainer from "@/lib/components/section-container";
import { HeadingText } from "@/lib/components/typography";
import { HTMLInputTypeAttribute } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface FormData {
  username: string;
  password: string;
}

interface FieldProps {
  name?: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  wrapper?: string;
  pattern?: string;
}

export default function LoginForm() {

    const methods = useForm<FormData>();
    const { handleSubmit } = methods;

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    const fields: FieldProps[] = [
        { name: "login_username", label: "Username" },
        { name: "login_password", label: "Password", type: "password" },
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
                </div>
            </div>
        </SectionContainer>
    )
}