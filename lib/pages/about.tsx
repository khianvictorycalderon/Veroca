'use client'

import SectionContainer from "@/lib/components/section-container";
import { BaseText, HeadingText, SubHeadingText } from "@/lib/components/typography";
import GeneralNavbar from "../components/general-navbar";
import GeneralFooter from "../components/general-footer";

export default function AboutPage() {
    return (
        <>
            <GeneralNavbar/>

            <SectionContainer className="bg-gray-50 min-h-[100vh] py-16 mt-8">
                <div className="max-w-4xl mx-auto flex flex-col gap-12 text-justify">

                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <HeadingText className="text-center text-neutral-800">About Veroca</HeadingText>
                        <BaseText className="mt-4 text-gray-700">
                            Veroca is an <span className="font-semibold text-orange-600">Order Management System</span> designed for small and medium sellers who need to manage pre-orders efficiently. 
                            With Veroca, users can create, edit, and track orders, manage customer lists, and keep everything organized for tomorrow or future dates.
                        </BaseText>
                        <BaseText className="mt-2 text-gray-700">
                            This is my first real <span className="font-semibold text-orange-600">full-stack website project</span> using <span className="italic">Next.js</span>, <span className="italic">Tailwind CSS</span>, and <span className="italic">PostgreSQL</span>. It allowed me to integrate front-end and back-end in a professional full-stack environment.
                        </BaseText>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <HeadingText className="text-center text-neutral-800">Why Veroca was Created</HeadingText>
                        <BaseText className="mt-4 text-gray-700">
                            The primary reason for creating Veroca is to help <span className="font-semibold text-orange-600">small and medium sellers</span> who need to manage pre-orders efficiently, whether for tomorrow or future dates.
                        </BaseText>
                        <BaseText className="mt-2 text-gray-700">
                            The secondary reason is personal: I wanted to <span className="font-semibold text-orange-600">deeply understand Next.js and PostgreSQL</span> by building a real full-stack project. 
                            Unlike my previous three semi full-stack projects using React + Firebase, Veroca allowed me to implement a complete, real-world full-stack workflow.
                        </BaseText>
                        <BaseText className="mt-2 text-gray-700">
                            Another reason for creating Veroca was to <span className="font-semibold text-orange-600">officially become a full-stack developer before 2026</span> by completing a professional full-stack project end-to-end.
                        </BaseText>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <HeadingText className="text-center text-neutral-800">How Veroca was Created</HeadingText>
                        <BaseText className="mt-4 text-gray-700">
                            Veroca was not my first idea when starting my first real full-stack website. My initial project was more complex and eventually scrapped. 
                            With Veroca, I prioritized <span className="font-semibold text-orange-600">simplicity and reliability</span>, avoiding dependency on external APIs.
                        </BaseText>
                        <BaseText className="mt-2 text-gray-700">
                            The development took place during my college vacation, as I was occupied with classes during the semester. This project taught me how to design, implement, and deploy a full-stack system from scratch while keeping the user experience intuitive.
                        </BaseText>
                    </div>

                </div>
            </SectionContainer>

            <GeneralFooter/>
        </>
    );
}
