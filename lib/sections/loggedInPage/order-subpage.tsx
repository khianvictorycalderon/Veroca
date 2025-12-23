'use client'

import { BaseText } from "@/lib/components/typography";
import { OrderManagementOrderListProps } from "@/lib/interfaces";
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

    // Sample only, actual implementation later (Fetched from back-end)
    const [orderItems, setOrderItems] = useState<OrderManagementOrderListProps[]>([
        {
            id: "ORD001",
            name: "Pancake - Tomorrow",
            details: [
            { customer_name: "John Doe", quantity: 2, remarks: "Bring tomorrow" },
            { customer_name: "Jane Smith", quantity: 3, remarks: "Extra syrup" },
            ],
        },
        {
            id: "ORD002",
            name: "Waffles - Tomorrow",
            details: [
            { customer_name: "Alice Tan", quantity: 1, remarks: "" },
            { customer_name: "Bob Lee", quantity: 2, remarks: "No nuts" },
            { customer_name: "Clara Reyes", quantity: 2, remarks: "Urgent" },
            ],
        },
        {
            id: "ORD003",
            name: "Omelette - Tomorrow",
            details: [
            { customer_name: "David Lim", quantity: 3, remarks: "Extra cheese" },
            { customer_name: "Eva Santos", quantity: 1, remarks: "" },
            ],
        },
        {
            id: "ORD004",
            name: "French Toast - 12/25/2025",
            details: [
            { customer_name: "John Doe", quantity: 2, remarks: "Bring tomorrow" },
            { customer_name: "Alice Tan", quantity: 2, remarks: "" },
            { customer_name: "Bob Lee", quantity: 1, remarks: "Special request" },
            ],
        },
        {
            id: "ORD005",
            name: "BBQ Stick - Next Week",
            details: [
            { customer_name: "Jane Smith", quantity: 4, remarks: "Already paid" },
            { customer_name: "Clara Reyes", quantity: 3, remarks: "Pending payment" },
            ],
        },
        {
            id: "ORD006",
            name: "Chocolate Cake - 12/31/2025",
            details: [
            { customer_name: "David Lim", quantity: 1, remarks: "Birthday" },
            { customer_name: "Alice Tan", quantity: 2, remarks: "" },
            ],
        },
        {
            id: "ORD007",
            name: "Fruit Juice - Next Week",
            details: [
            { customer_name: "Clara Reyes", quantity: 3, remarks: "" },
            { customer_name: "Eva Santos", quantity: 2, remarks: "Bring cold" },
            ],
        },
        {
            id: "ORD008",
            name: "Pancake - 12/26/2025",
            details: [
            { customer_name: "John Doe", quantity: 1, remarks: "Allergy: nuts" },
            { customer_name: "David Lim", quantity: 2, remarks: "" },
            ],
        },
        {
            id: "ORD009",
            name: "Waffles - 12/27/2025",
            details: [
            { customer_name: "Alice Tan", quantity: 3, remarks: "" },
            { customer_name: "Eva Santos", quantity: 1, remarks: "Urgent" },
            ],
        },
        {
            id: "ORD010",
            name: "Omelette - 12/28/2025",
            details: [
            { customer_name: "Jane Smith", quantity: 2, remarks: "Extra cheese" },
            { customer_name: "Clara Reyes", quantity: 1, remarks: "" },
            ],
        },
        {
            id: "ORD011",
            name: "French Toast - 12/29/2025",
            details: [
            { customer_name: "John Doe", quantity: 2, remarks: "Bring tomorrow" },
            { customer_name: "Alice Tan", quantity: 1, remarks: "" },
            ],
        },
        {
            id: "ORD012",
            name: "BBQ Stick - 1/2/2026",
            details: [
            { customer_name: "David Lim", quantity: 3, remarks: "Already paid" },
            { customer_name: "Eva Santos", quantity: 2, remarks: "Pending payment" },
            ],
        },
        {
            id: "ORD013",
            name: "Chocolate Cake - 1/5/2026",
            details: [
            { customer_name: "Jane Smith", quantity: 1, remarks: "Birthday" },
            { customer_name: "John Doe", quantity: 2, remarks: "" },
            ],
        },
        {
            id: "ORD014",
            name: "Fruit Juice - 1/6/2026",
            details: [
            { customer_name: "Alice Tan", quantity: 2, remarks: "" },
            { customer_name: "Bob Lee", quantity: 1, remarks: "Bring cold" },
            ],
        },
        {
            id: "ORD015",
            name: "Pancake - 1/7/2026",
            details: [
            { customer_name: "Clara Reyes", quantity: 3, remarks: "Allergy: milk" },
            { customer_name: "Eva Santos", quantity: 2, remarks: "" },
            ],
        },
        {
            id: "ORD016",
            name: "Waffles - 1/8/2026",
            details: [
            { customer_name: "John Doe", quantity: 1, remarks: "" },
            { customer_name: "David Lim", quantity: 2, remarks: "Extra syrup" },
            ],
        },
        {
            id: "ORD017",
            name: "Omelette - 1/9/2026",
            details: [
            { customer_name: "Jane Smith", quantity: 2, remarks: "" },
            { customer_name: "Alice Tan", quantity: 1, remarks: "Urgent" },
            ],
        },
        {
            id: "ORD018",
            name: "French Toast - 1/10/2026",
            details: [
            { customer_name: "Clara Reyes", quantity: 2, remarks: "" },
            { customer_name: "Bob Lee", quantity: 1, remarks: "Special request" },
            ],
        },
        {
            id: "ORD019",
            name: "BBQ Stick - 1/12/2026",
            details: [
            { customer_name: "John Doe", quantity: 3, remarks: "" },
            { customer_name: "Eva Santos", quantity: 2, remarks: "Already paid" },
            ],
        },
        {
            id: "ORD020",
            name: "Chocolate Cake - 1/14/2026",
            details: [
            { customer_name: "Alice Tan", quantity: 1, remarks: "" },
            { customer_name: "David Lim", quantity: 2, remarks: "Birthday" },
            ],
        },
    ]);

    const [currentSelectedOrder, setCurrentSelectedOrder] = useState<OrderManagementOrderListProps | null>(
        orderItems.length > 0 ? orderItems[0] : null
    );

    const filteredOrders = orderItems
        .filter(order => order.name.includes(searchOrderInput)) // case-sensitive, partial match
        .sort((a, b) => a.name.localeCompare(b.name)); // alphabetical sort

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
                        {filteredOrders.length > 0 ? (
                            <div className="flex flex-col gap-2">
                                {filteredOrders.map((item, index) => (
                                    <button
                                        key={`${item.name}-${index}`}
                                        onClick={() => setCurrentSelectedOrder(item)}
                                        className="w-full text-left py-2 px-2 transition duration-300 cursor-pointer rounded-md hover:bg-gray-600"
                                    >
                                        {item.name}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <BaseText className="text-center">No orders found.</BaseText>
                        )}
                    </div>


                </div>
            </div>

            {/* Order Details Section */}
            <div className="lg:flex-3/4 bg-gray-100 text-neutral-700 h-[100vh] overflow-y-auto py-16 px-4 lg:px-8">

                Current Selected Order: {currentSelectedOrder?.name || "No order selected yet"}

            </div>

        </div>
    )
}