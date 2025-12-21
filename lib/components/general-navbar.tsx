'use client'

import { useRouter } from "next/navigation";
import { NavBar } from "./navbar";

export default function GeneralNavbar() {
  const router = useRouter();

  const buttonsClassName = "font-semibold transition duration-300 hover:bg-gray-900";

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
      className="bg-amber-500 text-white"
      buttons={navbarButtons}
    />
  );
}