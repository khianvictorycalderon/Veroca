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
        },
        {
            id: "ORD005",
            name: "Milk Tea - Afternoon Pickup",
            customers: [
                { customer_name: "Samantha Lee", quantity: 4, remarks: "50% sugar" },
            ],
        },
        {
            id: "ORD006",
            name: "Burger Steak - Friday",
            customers: [
                { customer_name: "Nathan Wong", quantity: 2, remarks: "Extra gravy" },
                { customer_name: "Ivy Tan", quantity: 1, remarks: "No onions" },
            ],
        },
        {
            id: "ORD007",
            name: "Fish Fillet - 02/01/25",
            customers: [
                { customer_name: "Brian Santos", quantity: 3, remarks: "Crispy" },
            ],
        },
        {
            id: "ORD008",
            name: "Spaghetti - Weekend Order",
            customers: [
                { customer_name: "Kim Alvarez", quantity: 5, remarks: "Sweet style" },
                { customer_name: "Ronald Yu", quantity: 2, remarks: "Extra cheese" },
            ],
        },
        {
            id: "ORD009",
            name: "Fried Rice - Morning",
            customers: [
                { customer_name: "Ella Mendoza", quantity: 2, remarks: "With egg" },
            ],
        },
        {
            id: "ORD010",
            name: "Hotdog Sandwich - Lunch",
            customers: [
                { customer_name: "Joshua Kim", quantity: 3, remarks: "No mayo" },
                { customer_name: "Angela Park", quantity: 1, remarks: "Extra ketchup" },
            ],
        },
        {
            id: "ORD011",
            name: "Lechon Kawali - Party Order",
            customers: [
                { customer_name: "Miguel Bautista", quantity: 6, remarks: "Extra crispy" },
            ],
        },
        {
            id: "ORD012",
            name: "Vegetable Lumpia - 01/30/25",
            customers: [
                { customer_name: "Nina Gomez", quantity: 20, remarks: "Small size" },
                { customer_name: "Oscar Lim", quantity: 10, remarks: "With sauce" },
            ],
        },
        {
            id: "ORD013",
            name: "BBQ Isaw - Night Order",
            customers: [
                { customer_name: "Kevin Ramos", quantity: 15, remarks: "Well-done" },
            ],
        },
        {
            id: "ORD014",
            name: "Banana Cue - Afternoon",
            customers: [
                { customer_name: "Patricia Ong", quantity: 8, remarks: "Extra sugar" },
            ],
        },
        {
            id: "ORD015",
            name: "Pork Sisig - Saturday",
            customers: [
                { customer_name: "Daniel Chua", quantity: 2, remarks: "With egg" },
                { customer_name: "Rhea Velasco", quantity: 1, remarks: "No chili" },
            ],
        },
    ]);

    const [currentSelectedOrder, setCurrentSelectedOrder] = useState<OrderManagementOrderListProps | null>(
        orderItems.length > 0 ? orderItems[0] : null
    );

    const filteredOrders = orderItems
        .filter(order => order.name.includes(searchOrderInput)) // case-sensitive, partial match
        // Sorting must be done on the PostgreSQL query, not here
        // .sort((a, b) => a.name.localeCompare(b.name)); // alphabetical sort

    const handleOnSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchOrderInput(e.target.value);
    }

    const truncateText = (text: string, maxLength = 25) => {
        return text.length > maxLength
            ? text.slice(0, maxLength) + "..."
            : text;
    };

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
                                        {truncateText(item.name, 35)}
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