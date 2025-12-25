'use client'

import { MessagePopUp } from "@/lib/components/pop-up";
import { BaseText, HeadingText } from "@/lib/components/typography";
import { OrderManagementOrderListProps } from "@/lib/interfaces";
import { useEffect, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { TiDelete } from "react-icons/ti";

export default function OrderSubPage() {
    const [popUpMessage, setPopUpMessage] = useState<string>("");

    // ----------------------------------------------------------
    // Order list/view and edit part
    const [searchOrderInput, setSearchOrderInput] = useState<string>("");
    const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
    const [editedOrderName, setEditedOrderName] = useState<string>("");

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
        }
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
    // Add order part
    const addOrderName = useRef<HTMLInputElement>(null);

    const handleAddNewOrder = () => {
        const input = addOrderName.current;

        if (!input) {
            console.error("Order input is undefined or null.");
            return;
        }

        const name = input.value.trim();

        if (name === "") {
            setPopUpMessage("Please enter an order name.");
            return;
        }

        // Simulating...
        setOrderItems(prevItems => [
            ...prevItems,
            {
                id: (prevItems.length + 1).toString().padStart(5, "0"), // generates unique ID like "00001", "00002", ...
                name,
                customers: []
            }
        ]);

        // Clear the input
        input.value = "";
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

            {popUpMessage && (
                <MessagePopUp
                    message={popUpMessage}
                    onClose={() => setPopUpMessage("")}
                />
            )}
            
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
                                onClick={handleAddNewOrder}
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
                                    const isEditing = editingOrderId === item.id;

                                    return (
                                        <div
                                            key={`${item.name}-${index}`}
                                            className={`flex justify-between items-center rounded-md transition duration-300 z-10
                                                ${isSelected ? "bg-orange-500 text-white" : "hover:bg-gray-600"}`}
                                        >
                                            {!isEditing && (
                                                <button
                                                    onClick={() => setCurrentSelectedOrder(item)}
                                                    className="text-left flex-1 cursor-pointer py-2 px-2 w-full"
                                                >
                                                    {truncateText(item.name, 35)}
                                                </button>
                                            )}

                                            {isEditing ? (
                                                <div className="flex w-full">
                                                    <input
                                                        value={editedOrderName}
                                                        onChange={(e) => setEditedOrderName(e.target.value)}
                                                        className="px-2 py-2 border border-gray-300 bg-neutral-800"
                                                    />
                                                    <button
                                                        onClick={() => {
                                                            if (editedOrderName.trim() === "") {
                                                                setPopUpMessage("Order name cannot be empty.");
                                                                return;
                                                            }
                                                            // Update orderItems
                                                            setOrderItems(prev =>
                                                                prev.map(order =>
                                                                    order.id === item.id
                                                                        ? { ...order, name: editedOrderName }
                                                                        : order
                                                                )
                                                            );

                                                            // Update currentSelectedOrder if necessary
                                                            if (currentSelectedOrder?.id === item.id) {
                                                                setCurrentSelectedOrder(prev => prev ? { ...prev, name: editedOrderName } : prev);
                                                            }

                                                            setEditingOrderId(null);
                                                        }}
                                                        className="bg-green-600 hover:bg-green-800 w-full px-2 cursor-pointer"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingOrderId(null)}
                                                        className="bg-red-600 hover:bg-red-800 w-full px-2 cursor-pointer"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <button
                                                        title="Edit order name"
                                                        className="ml-2 text-blue-500 hover:text-blue-700 cursor-pointer z-40"
                                                        onClick={() => {
                                                            setEditingOrderId(item.id);
                                                            setEditedOrderName(item.name);
                                                        }}
                                                    >
                                                        <MdEdit size={24} />
                                                    </button>
                                                    <button
                                                        title="Delete order"
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
                                                </>
                                            )}
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