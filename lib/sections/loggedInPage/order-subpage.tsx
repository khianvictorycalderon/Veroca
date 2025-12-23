'use client'

import { BaseText } from "@/lib/components/typography";
import { useRef, useState } from "react";

export default function OrderSubPage() {
    
    // ----------------------------------------------------------
    // Add order part
    const addOrderName = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
        if (addOrderName.current) {
            console.log("New Order Name:", addOrderName.current.value);
        }
    };
    // ----------------------------------------------------------

    // ----------------------------------------------------------
    // Order list/view part
    const [searchOrderInput, setSearchOrderInput] = useState<string>("");
    const [currentSelectedOrder, setCurrentSelectedOrder] = useState();

    // Sample only, actual implementation later (Fetched from back-end)
    const [orderItems, setOrderItems] = useState([
        {
            id: "ORD001",
            name: "BBQ Stick - Tomorrow",
            details: [
                { customer_name: "John Doe", quantity: 2, remarks: "Bring tomorrow" },
                { customer_name: "Jane Smith", quantity: 3, remarks: "Extra sauce" },
            ]
        },
        {
            id: "ORD002",
            name: "BBQ Stick - Next Week",
            details: [
                { customer_name: "Alice Tan", quantity: 1, remarks: "" },
                { customer_name: "Bob Lee", quantity: 2, remarks: "No onions" },
            ]
        },
        {
            id: "ORD003",
            name: "Pancake - 12/25/2025",
            details: [
                { customer_name: "Clara Reyes", quantity: 3, remarks: "Christmas special" },
                { customer_name: "David Lim", quantity: 1, remarks: "" },
            ]
        },
        {
            id: "ORD004",
            name: "Baby Powder - 1/24/2026",
            details: [
                { customer_name: "Eva Santos", quantity: 2, remarks: "Gift order" },
                { customer_name: "John Doe", quantity: 1, remarks: "" },
            ]
        },
        {
            id: "ORD005",
            name: "Waffles - Tomorrow",
            details: [
                { customer_name: "Jane Smith", quantity: 4, remarks: "" },
                { customer_name: "Bob Lee", quantity: 2, remarks: "Urgent" },
            ]
        },
        {
            id: "ORD006",
            name: "Chocolate Cake - 12/31/2025",
            details: [
                { customer_name: "David Lim", quantity: 1, remarks: "Birthday" },
                { customer_name: "Alice Tan", quantity: 2, remarks: "" },
            ]
        },
        {
            id: "ORD007",
            name: "Fruit Juice - Next Week",
            details: [
                { customer_name: "Clara Reyes", quantity: 3, remarks: "" },
                { customer_name: "Eva Santos", quantity: 2, remarks: "Bring cold" },
            ]
        },
    ]);


    const handleOnSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchOrderInput(e.target.value);
    }

    // ----------------------------------------------------------

    // ----------------------------------------------------------
    // Order details part (CRUD mostly)
    // ----------------------------------------------------------

    return (
        <div className="lg:flex lg:flex-row w-full bg-gray-50">
            
            {/* Add Order Section + View Order */}
            <div className="lg:flex-1/4 h-[80vh] lg:h-[100vh] flex flex-col text-white">
                <div className="flex-1/3 lg:flex-1/4 overflow-y-hidden pt-16 px-4 lg:px-8 bg-neutral-900">
                    
                    <div className="w-full text-center">
                        <label className="block mb-2"><BaseText>New Order Name: </BaseText></label>
                        <div className="flex gap-2">
                            <input
                                ref={addOrderName}
                                type="text"
                                placeholder="Enter order name..."
                                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                            />
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition cursor-pointer"
                            >Add</button>
                        </div>
                    </div>


                </div>
                <div className="flex-2/3 lg:flex-3/4 overflow-y-auto py-8 px-4 lg:px-8 bg-neutral-800">
                    
                    <div className="w-full text-center">
                        <label className="block mb-2"><BaseText>Search Order: </BaseText></label>
                        <input
                            value={searchOrderInput}
                            onChange={handleOnSearch}
                            type="text"
                            placeholder="Search order name..."
                            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition w-full"
                        />
                    </div>

                    <div className="mt-8">
                        {orderItems.length > 0 ? (
                            <div className="flex flex-col gap-2">
                                {orderItems.map((item, index) => (
                                    <button className="w-full text-left py-2 px-2 transition duration-300 cursor-pointer rounded-md hover:bg-gray-600" key={`${item.name}-${index}`}>
                                        {item.name}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <BaseText>No orders yet.</BaseText>
                        )}
                    </div>

                </div>
            </div>

            {/* Order Details Section */}
            <div className="lg:flex-3/4 bg-gray-100 text-neutral-700 h-[100vh] overflow-y-auto py-16 px-4 lg:px-8">

                Content here...

            </div>

        </div>
    )
}