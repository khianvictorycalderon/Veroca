import { handleQuery } from "@/utils/qr-helper";
import { NextRequest, NextResponse } from "next/server";

// Trying to login
export async function DELETE() {
    
    return handleQuery(
        async () => {
        
            const response = NextResponse.json({ message: "Logout Successful!" }, { status: 200 })

            // Remove session
            response.cookies.delete("signed_in_user");
            
            return response;
        },
        "Failed to fetch data"
    );

}