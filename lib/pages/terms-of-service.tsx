'use client'

import { useEffect } from "react";
import SectionContainer from "@/lib/components/section-container";
import GeneralNavbar from "../components/general-navbar";
import GeneralFooter from "../components/general-footer";
import { BaseText, HeadingText, SubHeadingText } from "@/lib/components/typography";

export default function TermsOfServicePage() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const termsSections = [
        {
            title: "Introduction",
            desc: "Welcome to Veroca. By using this platform, you agree to follow these Terms of Service. Please read them carefully, as they outline your rights, responsibilities, and limitations while using Veroca."
        },
        {
            title: "Permitted Use",
            desc: "Veroca is intended for small and medium sellers to manage pre-orders efficiently. Any use for illegal, fraudulent, or unauthorized purposes is strictly prohibited."
        },
        {
            title: "Prohibited Actions",
            desc: "Violating these terms may result in warnings, temporary suspension, or permanent deletion of your account. This includes attempting to tamper with orders, manipulate data, or disrupt normal system operations."
        },
        {
            title: "Account Responsibility",
            desc: "You are responsible for keeping your account credentials secure. Veroca does not provide password recovery, so safeguard your password carefully. Any activity under your account is your responsibility."
        },
        {
            title: "Order & Data Integrity",
            desc: "Orders and customer data you create are permanent within your account. Modifications should be done carefully. Incorrect or malicious changes may affect your records and cannot always be undone."
        },
        {
            title: "User Conduct",
            desc: "You agree to use Veroca responsibly and for its intended purpose: managing orders efficiently. Any attempt to gain unauthorized access, misuse features, or interfere with system operations is forbidden."
        },
        {
            title: "Session Expiration",
            desc: "Login sessions last 6 hours. After expiration, you must log in again to continue using Veroca. Always log out when using shared or public devices."
        },
        {
            title: "Service Availability",
            desc: "We strive to maintain continuous access to Veroca but cannot guarantee uninterrupted service. We reserve the right to update, suspend, or discontinue features at any time."
        },
        {
            title: "Limitation of Liability",
            desc: "Veroca is not responsible for losses or issues caused by your use, or inability to use, the platform. Users accept responsibility for their own data management and account security."
        },
        {
            title: "Updates to Terms",
            desc: "We may update these Terms of Service periodically. Continued use of Veroca after changes indicates your acceptance of the new terms. Users are encouraged to review this page regularly."
        }
    ];

    return (
        <>
            <GeneralNavbar/>

            <SectionContainer className="bg-gray-50 min-h-[100vh] py-16 mt-8">
                <div className="max-w-4xl mx-auto flex flex-col gap-12">

                    <HeadingText className="text-center text-neutral-800">Terms of Service</HeadingText>
                    <BaseText className="text-center text-gray-600 italic">
                        Understand the rules for using Veroca safely and responsibly.<br/>
                        Last Updated: December 25, 2025
                    </BaseText>

                    {termsSections.map((section, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow border border-gray-200">
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