'use client'
import { NavBar } from "./navbar";

export default function GeneralNavbar() {

    const buttonsClassName = "font-semibold transition duration-300 hover:bg-amber-400";
    const navbarButtons = [
        {
            label: "Home",
            action: () => alert("Clicked"),
            className: buttonsClassName
        },
        {
            label: "About",
            action: () => alert("Clicked"),
            className: buttonsClassName
        },
        {
            label: "Changelogs",
            action: () => alert("Clicked"),
            className: buttonsClassName
        },
        {
            label: "Contact",
            action: () => alert("Clicked"),
            className: buttonsClassName
        },
    ]

    return (
        <NavBar
            image="icons/veroca.png"
            title="Veroca"
            className="bg-amber-500 text-white"
            buttons={navbarButtons}
        />
    )
}