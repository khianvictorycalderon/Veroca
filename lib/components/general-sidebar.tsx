'use client'

import { handleAPIRequest } from "@/utils/req-helper";
import { GeneralSideBarProps } from "../interfaces";
import { SideBar } from "./sidebar";
import axios from "axios";

export default function GeneralSideBar({
    setPage
}: GeneralSideBarProps) {

    const logout = async() => {
        handleAPIRequest(
          async () => {
              const res = await axios.delete("/api/logout");
              console.log("Logout successful:", res.data);
              window.location.reload();
          },
          "Unable to logout",
          
          // Blank expressions
          () => {},
          async () => {},
          async () => {}
      );
    }

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
            action: logout
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