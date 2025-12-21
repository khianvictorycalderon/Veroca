'use client'

import GeneralNavbar from "../components/general-navbar"
import { Hero } from "../components/hero"

export default function HomePage() {

    const CTAButton = [
        <button className="text-lg md:text-xl lg:text-2xl font-bold bg-green-600 px-6 py-2 rounded-md shadow hover:bg-green-500 transition duration-300 cursor-pointer">
            GET STARTED!
        </button>
    ]

    return (
        <>
            <GeneralNavbar/>
            <Hero
                background="/images/hero-bg.png"
                heading="Organize your items"
                subheading="Manage your order without manually writing it and never forget client's order again!"
                dark_cover_opacity={0.8}
                cta_buttons={CTAButton}
            />
        </>
    )
}