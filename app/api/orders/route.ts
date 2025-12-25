import { NextResponse } from "next/server";

// Retrieving orders
export async function GET() {
    
    // Demo only, will implement back-end code later
    const sampleData = [
        {
            id: "ORD001",
            name: "Pancake - Tomorrow",
            customers: [
                { customer_name: "John Doe", quantity: 2, remarks: "Extra syrup" },
                { customer_name: "Jane Smith", quantity: 1, remarks: "No butter" },
            ],
        },
        {
            id: "ORD002",
            name: "BBQ Stick - Next Week",
            customers: [
                { customer_name: "Mark Cruz", quantity: 10, remarks: "Spicy" },
                { customer_name: "Anna Lopez", quantity: 5, remarks: "Medium heat" },
            ],
        },
        {
            id: "ORD003",
            name: "Eggplant - 1/25/20",
            customers: [
                { customer_name: "Carlos Reyes", quantity: 3, remarks: "Grilled" },
            ],
        },
        {
            id: "ORD004",
            name: "Chicken Adobo - Today",
            customers: [
                { customer_name: "Liza Fernandez", quantity: 2, remarks: "Less oil" },
                { customer_name: "Paul Lim", quantity: 1, remarks: "Extra sauce" },
            ],
        }
    ]
    
    return NextResponse.json({
        message: "Successfully retrieved data!",
        data: sampleData
    }, { status: 200 });
}

// Adding new orders
export async function POST() {

}

// Editing orders or order details
export async function PATCH() {
    
}

// Deleting orders
export async function DELETE() {

}