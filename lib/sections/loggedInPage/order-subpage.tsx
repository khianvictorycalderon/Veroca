'use client'

import { BaseText, HeadingText } from "@/lib/components/typography";
import { OrderManagementCustomerRefs, OrderManagementOrderListProps } from "@/lib/interfaces";
import { useEffect, useRef, useState } from "react";
import { TiDelete } from "react-icons/ti";

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
    const [currentSelectedOrder, setCurrentSelectedOrder] = useState<OrderManagementOrderListProps | null>(
        orderItems.length > 0 ? orderItems[0] : null
    );

    const [currentCustomers, setCurrentCustomers] = useState<OrderManagementOrderListProps["customers"]>(
        currentSelectedOrder?.customers || []
    );

    // Whenever currentSelectedOrder changes, update currentCustomers
    useEffect(() => {
        if (currentSelectedOrder) {
            setCurrentCustomers(currentSelectedOrder.customers);
        } else {
            setCurrentCustomers([]);
        }
    }, [currentSelectedOrder]);

    // Add new customer
    const addCustomerRow = () => {
        setCurrentCustomers(prev => [...prev, { customer_name: "", quantity: 1, remarks: "" }]);
    };

    // Delete customer
    const deleteCustomerRow = (index: number) => {
        setCurrentCustomers(prev => prev.filter((_, i) => i !== index));
    };

    // Update customer field
    const updateCustomerField = (index: number, field: keyof typeof currentCustomers[0], value: any) => {
        setCurrentCustomers(prev => {
            const newArr = [...prev];
            newArr[index] = { ...newArr[index], [field]: value };
            return newArr;
        });
    };

    // Save changes
    const handleSave = () => {
        if (!currentSelectedOrder) return;

        // Update the selected order with current customer state
        const updatedOrder = { ...currentSelectedOrder, customers: currentCustomers };
        setCurrentSelectedOrder(updatedOrder);

        // Update the order list
        setOrderItems(prev => prev.map(order => order.id === updatedOrder.id ? updatedOrder : order));
        console.log("Saved", updatedOrder);
    };

    // Cancel changes
    const handleCancel = () => {
        if (!currentSelectedOrder) return;
        setCurrentCustomers(currentSelectedOrder.customers);
        console.log("Cancelled", currentSelectedOrder);
    };
    
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
                                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                            />
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-orange-400 text-white font-semibold rounded-lg hover:bg-orange-700 transition cursor-pointer"
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
                            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition w-full"
                        />
                    </div>

                    <div className="mt-8">
                        {filteredOrders.length > 0 ? (
                            <div className="flex flex-col gap-2">
                                {filteredOrders.map((item, index) => {
                                    const isSelected = currentSelectedOrder?.id === item.id;
                                    return (
                                        <div
                                            key={`${item.name}-${index}`}
                                            className={`flex justify-between items-center rounded-md transition duration-300 z-10
                                                ${isSelected ? "bg-orange-500 text-white" : "hover:bg-gray-600"}`}
                                        >
                                            <button
                                                onClick={() => setCurrentSelectedOrder(item)}
                                                className="text-left flex-1 cursor-pointer py-2 px-2 w-full"
                                            >
                                                {truncateText(item.name, 35)}
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setOrderItems(prev => prev.filter(order => order.id !== item.id));
                                                    if (currentSelectedOrder?.id === item.id) {
                                                        setCurrentSelectedOrder(null);
                                                        setCurrentCustomers([]);
                                                    }
                                                }}
                                                className="ml-2 text-red-500 hover:text-red-700 cursor-pointer z-40"
                                            >
                                                <TiDelete size={24} />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <BaseText className="text-center">No orders found.</BaseText>
                        )}
                    </div>

                </div>
            </div>

            {/* Order Details Section */}
            <div className="lg:flex-3/4 bg-gray-100 text-neutral-700 h-[100vh] overflow-y-auto py-16 px-4 lg:px-8">
                <HeadingText className="text-center mb-8">
                    {currentSelectedOrder?.name || "Select Order"}
                </HeadingText>

                {currentSelectedOrder ? (
                    <div className="overflow-x-auto">
                        <table className="w-full border-none overflow-hidden">
                           <thead className="bg-orange-500 text-white">
                                <tr>
                                    <th className="w-[50%] p-3 text-cebter rounded-tl-lg rounded-bl-lg">Customer<span className="hidden lg:inline"> Name</span></th>
                                    <th className="w-[30%] p-3 text-center">Remarks</th>
                                    <th className="w-[10%] p-3 text-center ">Quantity</th>
                                    <th className="w-fit p-3 text-center rounded-tr-lg rounded-br-lg"><span className="hidden lg:block">Delete</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCustomers.map((customer, index) => (
                                    <tr
                                        key={index}
                                        className="transition-colors duration-200"
                                    >
                                    <td className="p-2">
                                        <input
                                        placeholder="Enter customer name..."
                                        type="text"
                                        value={customer.customer_name}
                                        onChange={e =>
                                            updateCustomerField(index, "customer_name", e.target.value)
                                        }
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                                        />
                                    </td>
                                    <td className="p-2">
                                        <input
                                        placeholder="Enter customer remarks..."
                                        type="text"
                                        value={customer.remarks}
                                        onChange={e =>
                                            updateCustomerField(index, "remarks", e.target.value)
                                        }
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                                        />
                                    </td>
                                    <td className="p-2">
                                        <input
                                        placeholder="Enter order quantity..."
                                        type="number"
                                        min={1}
                                        value={customer.quantity}
                                        onChange={e =>
                                            updateCustomerField(index, "quantity", Number(e.target.value))
                                        }
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                                        />
                                    </td>
                                    <td className="p-2 text-center">
                                        <button
                                        onClick={() => deleteCustomerRow(index)}
                                        className="text-orange-500 hover:text-orange-700 transition cursor-pointer"
                                        >
                                        <TiDelete size={24} />
                                        </button>
                                    </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="flex gap-4 mt-4 justify-center">
                            <button
                                onClick={addCustomerRow}
                                className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition cursor-pointer"
                            >
                            + Add Customer
                            </button>

                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition cursor-pointer"
                            >
                            Save
                            </button>

                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition cursor-pointer"
                            >
                            Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <BaseText className="text-center">Select an order to edit</BaseText>
                )}
            </div>

        </div>
    );
}