import { NextResponse } from "next/server";

type SessionType = "signed_in" | "signed_out";

export default async function GET() {
    
    // This is to be changed later for cookies
    const session:SessionType = "signed_in";
    
    return NextResponse.json(
        { session },
        { status: 200 }
    );

}