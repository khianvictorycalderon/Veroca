'use client'

import SectionContainer from "@/lib/components/section-container";
import { BaseText, HeadingText, SubHeadingText } from "@/lib/components/typography";
import GeneralNavbar from "../components/general-navbar";
import GeneralFooter from "../components/general-footer";

export default function ChangelogsPage() {

    const changelogs = [
        {
            release: "1.0.1",
            info: [
                "Released shortly after 1.0.0 at approximately 3:38 PM",
                "Added footer donation page"
            ]
        },
        {
            release: "1.0.0",
            info: [
                "Released officially December 25, 2025 at 2:20 PM (PH Time)",
                "Initial release of Veroca",
                "Basic order and account management functionality"
            ]
        }
    ];

    return (
        <>
            <GeneralNavbar/>

            <SectionContainer className="bg-gray-50 min-h-[100vh] py-16 mt-8">
                <div className="max-w-4xl mx-auto flex flex-col gap-8">

                    <HeadingText className="text-center text-neutral-800">Changelogs</HeadingText>
                    <BaseText className="text-center text-gray-600 italic">
                        See what&apos;s new in each version of Veroca
                    </BaseText>

                    {changelogs.map((log, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow border border-gray-200">
                            <SubHeadingText className="text-orange-500">Version {log.release}</SubHeadingText>
                            <ul className="list-disc list-inside mt-2 text-gray-700">
                                {log.info.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}

                </div>
            </SectionContainer>

            <GeneralFooter/>
        </>
    );
}