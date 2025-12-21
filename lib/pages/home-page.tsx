'use client'

import GeneralNavbar from "../components/general-navbar"
import { Hero } from "../components/hero"

export default function HomePage() {
    return (
        <>
            <GeneralNavbar/>
            <Hero
                background="/images/hero-bg.png"
                heading="Organize your items"
                subheading="Manage your order without manually writing it and never forget client's order again!"
                dark_cover_opacity={0.8}
            />
        </>
    )
}