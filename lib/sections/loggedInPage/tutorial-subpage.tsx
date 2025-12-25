'use client'

import SectionContainer from "@/lib/components/section-container";
import { BaseText, HeadingText, SubHeadingText } from "@/lib/components/typography";

export default function TutorialSubPage() {
    return (
        <SectionContainer className="bg-gray-50 min-h-[100vh] py-16">
            <div className="max-w-4xl mx-auto flex flex-col gap-8">

                <HeadingText className="text-center text-neutral-800">
                    Veroca Tutorial
                </HeadingText>
                <BaseText className="text-center text-gray-600 italic">
                    Learn how to manage your orders effectively and keep your account secure.
                </BaseText>

                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <SubHeadingText className="text-orange-500">Access Orders</SubHeadingText>
                    <BaseText className="mt-2 text-gray-700">
                        Click the <span className="font-semibold text-orange-600">Orders</span> tab from the sidebar. Here you can see all your existing orders and manage tomorrow&apos;s customer list.
                    </BaseText>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <SubHeadingText className="text-orange-500">Add a New Order</SubHeadingText>
                    <BaseText className="mt-2 text-gray-700">
                        Use the <span className="font-semibold text-orange-600">New Order Name</span> input to add a new order. After entering a name, click <span className="font-semibold text-orange-600">Add</span>.
                    </BaseText>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <SubHeadingText className="text-orange-500"> Search and Select Orders</SubHeadingText>
                    <BaseText className="mt-2 text-gray-700">
                        Use the <span className="font-semibold text-orange-600">Search Order</span> box to find an existing order. Click an order to view or edit its customer list.
                    </BaseText>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <SubHeadingText className="text-orange-500">Manage Customers</SubHeadingText>
                    <div className="mt-2 text-gray-700">
                        <BaseText>For each order, you can:</BaseText>
                        <ul className="list-disc list-inside mt-2 text-gray-700">
                        <li>Add customers using <span className="font-semibold text-orange-600">+ Add Customer</span>.</li>
                        <li>Edit customer name, quantity, or remarks directly in the table.</li>
                        <li>Remove a customer using the <span className="font-semibold text-orange-600">Delete</span> button.</li>
                        </ul>
                        <BaseText>After changes, click <span className="font-semibold text-orange-600">Save</span> to apply or <span className="font-semibold text-red-600">Cancel</span> to revert.</BaseText>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <SubHeadingText className="text-orange-500">Account Security & Tips</SubHeadingText>
                    <div className="mt-2 text-gray-700">
                        <BaseText>Important notes to keep your account safe:</BaseText>
                        <ul className="list-disc list-inside mt-2 text-gray-700">
                        <li>Your login session lasts 6 hours. After that, you will need to log in again.</li>
                        <li>This website does not provide password recovery. Make sure to store your password securely.</li>
                        <li>Update your personal information or password via the <span className="font-semibold text-orange-600">Account</span> page.</li>
                        </ul>
                        <BaseText>Following these tips will help prevent losing access to your orders.</BaseText>
                    </div>
                </div>

                <BaseText className="text-center text-gray-500 italic mt-8">
                    Enjoy managing your orders efficiently with Veroca!
                </BaseText>
            </div>
        </SectionContainer>
    )
}