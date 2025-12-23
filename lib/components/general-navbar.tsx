'use client'

import { useRouter } from "next/navigation";
import { NavBar } from "./navbar";
import { useOnScrollAt } from "@/utils/scroll-detector";
import { useState } from "react";

export default function GeneralNavbar() {
  const router = useRouter();

  const buttonsClassName = "font-semibold transition duration-300 hover:bg-gray-900";

  const [navbarBG, setNavbarBG] = useState<string>("");
  useOnScrollAt(
    "homepage-hero-section",
    () => setNavbarBG("bg-transparent"), // If hero section is visible, then background must be transparent
    () => setNavbarBG("bg-amber-500") // If hero section is not visible, then this is the background
  )
  
  const navbarButtons = [
    {
      label: "Home",
      action: () => router.push("/"),
      className: buttonsClassName
    },
    {
      label: "About",
      action: () => router.push("/about"),
      className: buttonsClassName
    },
    {
      label: "Changelogs",
      action: () => router.push("/changelogs"),
      className: buttonsClassName
    },
    {
      label: "Contact",
      action: () => router.push("/contact"),
      className: buttonsClassName
    },
  ];

  return (
    <NavBar
      image="icons/veroca.png"
      title="Veroca"
      className={`${navbarBG} text-white transition duration-300`}
      buttons={navbarButtons}
    />
  );
}