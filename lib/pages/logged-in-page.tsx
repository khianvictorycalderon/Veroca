'use client'

import { useState } from "react";
import GeneralSideBar from "../components/general-sidebar"
import { LoggedInPageType } from "../types";

export default function LoggedInHomePage() {

    const [page, setPage] = useState<LoggedInPageType>("order");

    return (
        <>
            <GeneralSideBar setPage={setPage}/>

        </>
    )
}