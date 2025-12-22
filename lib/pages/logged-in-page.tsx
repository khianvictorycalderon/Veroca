'use client'

import { useState } from "react";
import GeneralSideBar from "../components/general-sidebar"
import { LoggedInPageType } from "../types";
import OrderSubPage from "../sections/loggedInPage/order-subpage";
import AccountSubPage from "../sections/loggedInPage/account-subpage";
import TutorialSubPage from "../sections/loggedInPage/tutorial-subpage";

export default function LoggedInHomePage() {

    const [page, setPage] = useState<LoggedInPageType>("order");

    return (
        <>
            <GeneralSideBar setPage={setPage}/>

            {page == "order" && (
                <OrderSubPage/>
            )}

            {page == "account" && (
                <AccountSubPage/>
            )}

            {page == "tutorial" && (
                <TutorialSubPage/>
            )}

        </>
    )
}