'use client'

import { useRouter } from "next/navigation";
import Footer from "./footer";

export default function GeneralFooter() {

    const router = useRouter();
    const sectionClassName = "space-y-4 [&_li]:cursor-pointer [&_li_a]:transition [&_li_a]:duration-300";
    
    return (
        <Footer
            
            className="!bg-neutral-800 !border-none"
            logo="icons/Khian_Icon_Logo.png"
            texts={[
                {
                    title: "Veroca Developed by",
                    content: (
                        <ul className={sectionClassName}>
                            <li>
                                <a href="https://khian.netlify.app" target="_blank" title="Developer's Official Website" className="hover:text-white">
                                    Khian Victory D. Calderon
                                </a>
                            </li>
                            <li>
                                <a href="https://khianvictorycalderon.github.io/donation/donate.html" target="_blank" title="Developer's Official Donation Page" className="hover:text-white">
                                    Donate
                                </a>
                            </li>
                        </ul>
                    ),
                },
                {
                    title: "Resources",
                    content: (
                        <ul className={sectionClassName}>
                            <li>
                                <a href="https://github.com/khianvictorycalderon/Veroca" target="_blank" title="Developer's Official Website" className="hover:text-white">
                                    Project Source Code
                                </a>
                            </li>
                        </ul>
                    ),
                },
                {
                    title: "Legal",
                    content: (
                        <ul className={sectionClassName}>
                            <li>
                                <a onClick={() => router.push("/privacy-policy")} className="hover:text-white">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a onClick={() => router.push("/terms-of-service")} className="hover:text-white">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    ),
                },
            ]}
        />
    )
}