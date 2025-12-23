'use client'

import { useState } from "react"
import GeneralNavbar from "../components/general-navbar"
import { Hero } from "../components/hero"
import LoginForm from "../sections/homepage/login-form"
import { HomeAccountSectionType } from "../types"
import RegisterForm from "../sections/homepage/register-form"
import GeneralFooter from "../components/general-footer"
import { slideTo } from "@/utils/slide-ref"

export default function HomePage() {

    const [accountSection, setAccountSection] = useState<HomeAccountSectionType>("login");

    const CTAButton = [
        <button onClick={() => slideTo("home-page-account-section", -80)} className="text-md md:text-lg lg:text-xl font-semibold tracking-wider bg-green-600 px-16 py-4 rounded-md shadow hover:bg-green-500 transition duration-300 cursor-pointer">
            GET STARTED!
        </button>
    ]

    return (
        <>
            <GeneralNavbar/>
            <div id="homepage-hero-section">
                <Hero
                    background="/images/hero-bg.png"
                    heading="Organize your items"
                    subheading="Manage your order without manually writing it and never forget client's order again!"
                    dark_cover_opacity={0.8}
                    cta_buttons={CTAButton}
                />
            </div>
            <div id="home-page-account-section"/>
            {accountSection == "login" && <LoginForm setPage={setAccountSection}/>}
            {accountSection == "register" && <RegisterForm setPage={setAccountSection}/>}
            <GeneralFooter/>
        </>
    )
}