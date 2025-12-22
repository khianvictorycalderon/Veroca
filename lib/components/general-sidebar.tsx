import { SetStateAction } from "react";
import { SideBar } from "./sidebar";
import { LoggedInPageType } from "../types";

interface GeneralSideBarProps {
    setPage: React.Dispatch<SetStateAction<LoggedInPageType>>;
}

export default function GeneralSideBar({
    setPage
}: GeneralSideBarProps) {

    const buttons = [
        {
            label: "Orders",
            action: () => setPage("order")
        },
        {
            label: "Account",
            action: () => setPage("account")
        },
        {
            label: "Tutorial",
            action: () => setPage("tutorial")
        },
        {
            label: "Log Out",
            action: () => alert("Logged Out!")
        },
    ]

    return (
        <SideBar
            className="!bg-neutral-900"
            footbar="Veroca by Khian Victory D. Calderon"
            buttons={buttons}
            hamburgerClassName="!bg-transparent !shadow-none !text-current text-4xl filter invert mix-blend-difference"
        />
    )
}