'use client'

import { useEffect } from "react";
import SectionContainer from "@/lib/components/section-container";
import GeneralNavbar from "../components/general-navbar";
import GeneralFooter from "../components/general-footer";
import { BaseText, HeadingText, SubHeadingText } from "@/lib/components/typography";

export default function PrivacyPolicyPage() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const privacySections = [
        {
            title: "Introduction",
            desc: "Welcome to Veroca. We value your privacy and are committed to protecting your personal information. This Privacy Policy explains what data we collect, how we use it, who we share it with, and how we keep it secure."
        },
        {
            title: "Information Collection",
            desc: "To use Veroca, we collect only the essential information needed to manage your account and orders. This includes your name, username, password, and order-related data."
        },
        {
            title: "Usage of Information",
            desc: "We use your information to manage your orders, provide account access, and improve Veroca's functionality. Your data helps us keep your customer lists organized and ensure smooth order management."
        },
        {
            title: "Confidentiality",
            desc: "Veroca does not sell or share your personal information with third parties except where required by law. Data shared with trusted services is done only when necessary to operate the system."
        },
        {
            title: "Data Security",
            desc: "We implement industry-standard measures to protect your data. While no system can guarantee 100% security, we take all reasonable precautions to safeguard your information."
        },
        {
            title: "Session Expiration",
            desc: "Login sessions last 6 hours. After that, you will need to log in again to access your orders for you not to forget your password."
        },
        {
            title: "Account Management",
            desc: "You are responsible for keeping your password safe, as Veroca does not currently provide a password recovery option. Update your personal information or password via the Account page."
        },
        {
            title: "Advertising",
            desc: "Veroca is completely ad-free, focused solely on helping small and medium sellers manage pre-orders efficiently."
        },
        {
            title: "Data Rights",
            desc: "You have the right to access and manage your data related to orders and account information. We retain order records to ensure accuracy and consistency in the system."
        },
        {
            title: "Policy Updates",
            desc: "We may update this Privacy Policy occasionally. You are encouraged to review it periodically to stay informed of any changes."
        }
    ];

    return (
        <>
            <GeneralNavbar/>

            <SectionContainer className="bg-gray-50 min-h-[100vh] py-16 mt-8">
                <div className="max-w-4xl mx-auto flex flex-col gap-12">

                    <HeadingText className="text-center text-neutral-800">Privacy Policy</HeadingText>
                    <BaseText className="text-center text-gray-600 italic">
                        Learn how we handle your data safely and responsibly.<br/>
                        Last Updated: December 25, 2025
                    </BaseText>

                    {privacySections.map((section, index) => (
                        <div key={index} className={`bg-white p-6 rounded-lg shadow border border-gray-200`}>
                            <SubHeadingText className="text-orange-500">{section.title}</SubHeadingText>
                            <BaseText className="mt-2 text-gray-700">{section.desc}</BaseText>
                        </div>
                    ))}

                </div>
            </SectionContainer>

            <GeneralFooter/>
        </>
    )
}