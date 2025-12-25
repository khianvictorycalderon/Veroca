'use client'

import { MessagePopUp } from "@/lib/components/pop-up";
import { BaseText, HeadingText } from "@/lib/components/typography";
import { OrderManagementOrderListProps } from "@/lib/interfaces";
import { handleAPIRequest } from "@/utils/req-helper";
import axios from "axios";
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

    const [isFetchingOrders, setIsFetchingOrders] = useState<boolean>(true);
    const [orderItems, setOrderItems] = useState<OrderManagementOrderListProps[]>([]);

    // Fetch orders from API
    const fetchOrders = async () => {
        setIsFetchingOrders(true);

        return handleAPIRequest(
            async() => {
                const res = await axios.get("/api/orders");
                setOrderItems(res.data.data);
            },
            "Failed to fetch orders",
            setPopUpMessage,
            async () => {},
            async () => setIsFetchingOrders(false)
        )
    }

    // Initial load
    useEffect(() => {
        fetchOrders();
    },[]);

    const filteredOrders = orderItems.filter(order => order.name.toLowerCase().includes(searchOrderInput.toLowerCase()));

    const handleOnSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchOrderInput(e.target.value);

    const truncateText = (text: string, maxLength = 25) =>
        text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

    // ----------------------------------------------------------
    // Add order part
    const addOrderName = useRef<HTMLInputElement>(null);

    const handleAddNewOrder = async () => {
        const input = addOrderName.current;

        if (!input) return;

        const name = input.value.trim();
        if (!name) {
            setPopUpMessage("Please enter an order name.");
            return;
        }

        await handleAPIRequest(
            async () => {
                const res = await axios.post("/api/orders", { name });
                setOrderItems(prev => [res.data.order, ...prev]);
                input.value = "";
            },
            "Failed to add order",
            setPopUpMessage
        );
    };
    // ----------------------------------------------------------

    // ----------------------------------------------------------
    // Order details part (CRUD mostly)
    const [currentSelectedOrder, setCurrentSelectedOrder] = useState<OrderManagementOrderListProps | null>(null);
    const [currentCustomers, setCurrentCustomers] = useState<OrderManagementOrderListProps["customers"]>([]);

    // Whenever currentSelectedOrder changes, update currentCustomers
    useEffect(() => {
        setCurrentCustomers(currentSelectedOrder?.customers || []);
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
    const updateCustomerField = (index: number, field: keyof typeof currentCustomers[0], value: string | number) => {
        setCurrentCustomers(prev => {
            const newArr = [...prev];
            newArr[index] = { ...newArr[index], [field]: value };
            return newArr;
        });
    };

    // Save changes
    const handleSave = async () => {
        if (!currentSelectedOrder) return;

        await handleAPIRequest(
            async () => {
                const res = await axios.patch("/api/orders", {
                    id: currentSelectedOrder.id,
                    name: currentSelectedOrder.name,
                    customers: currentCustomers
                });

                // Update local state
                const updatedOrder = res.data.order;
                setOrderItems(prev => prev.map(order => order.id === updatedOrder.id ? updatedOrder : order));
                setCurrentSelectedOrder(updatedOrder);
            },
            "Failed to save order",
            setPopUpMessage
        );
    };

    // Cancel changes
    const handleCancel = () => {
        if (!currentSelectedOrder) return;
        setCurrentCustomers(currentSelectedOrder.customers);
    };

    // Edit order name
    const handleEditOrderName = async (orderId: string, newName: string) => {
        if (!newName.trim()) {
            setPopUpMessage("Order name cannot be empty.");
            return;
        }

        await handleAPIRequest(
            async () => {
                const res = await axios.patch("/api/orders", { id: orderId, name: newName });
                const updatedOrder = res.data.order;
                setOrderItems(prev => prev.map(order => order.id === updatedOrder.id ? updatedOrder : order));
                if (currentSelectedOrder?.id === updatedOrder.id) setCurrentSelectedOrder(updatedOrder);
                setEditingOrderId(null);
            },
            "Failed to update order",
            setPopUpMessage
        );
    };

    // Delete order
    const handleDeleteOrder = async (orderId: string) => {
        await handleAPIRequest(
            async () => {
                await axios.delete("/api/orders", { data: { id: orderId } });
                setOrderItems(prev => prev.filter(order => order.id !== orderId));
                if (currentSelectedOrder?.id === orderId) setCurrentSelectedOrder(null);
            },
            "Failed to delete order",
            setPopUpMessage
        );
    };
    // ----------------------------------------------------------

    return (
        <div className="lg:flex lg:flex-row w-full bg-gray-50">
            {popUpMessage && (
                <MessagePopUp message={popUpMessage} onClose={() => setPopUpMessage("")} />
            )}

            {/* Add Order Section + View Orders */}
            <div className="lg:flex-1/4 h-[80vh] lg:h-[100vh] flex flex-col text-white">
                <div className="flex-1/3 lg:flex-1/4 overflow-y-hidden pt-16 px-4 lg:px-8 bg-neutral-900">
                    <div className="w-full text-center">
                        <label className="block mb-2"><BaseText>New Order Name:</BaseText></label>
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
                        <label className="block mb-2"><BaseText>Search Order:</BaseText></label>
                        <input
                            value={searchOrderInput}
                            onChange={handleOnSearch}
                            type="text"
                            placeholder="Search order name..."
                            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition w-full"
                        />
                    </div>

                    <div className="mt-8">
                        {isFetchingOrders ? (
                            <BaseText className="text-center">Loading orders...</BaseText>
                        ) : (
                            <>
                                {filteredOrders.length > 0 ? (
                                    <div className="flex flex-col gap-2">
                                        {filteredOrders.map((item, index) => {
                                            const isSelected = currentSelectedOrder?.id === item.id;
                                            const isEditing = editingOrderId === item.id;

                                            return (
                                                <div key={`${item.name}-${index}`} className={`flex justify-between items-center rounded-md transition duration-300 z-10 ${isSelected ? "bg-orange-500 text-white" : "hover:bg-gray-600"}`}>
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
                                                                onClick={() => handleEditOrderName(item.id, editedOrderName)}
                                                                className="bg-green-600 hover:bg-green-800 w-full px-2 cursor-pointer"
                                                            >Save</button>
                                                            <button
                                                                onClick={() => setEditingOrderId(null)}
                                                                className="bg-red-600 hover:bg-red-800 w-full px-2 cursor-pointer"
                                                            >Cancel</button>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <button title="Edit order name" className="ml-2 text-blue-500 hover:text-blue-700 cursor-pointer z-40" onClick={() => { setEditingOrderId(item.id); setEditedOrderName(item.name); }}>
                                                                <MdEdit size={24} />
                                                            </button>
                                                            <button title="Delete order" onClick={() => handleDeleteOrder(item.id)} className="ml-2 text-red-500 hover:text-red-700 cursor-pointer z-40">
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
                            </>
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
                                    <th className="w-[50%] p-3 text-center rounded-tl-lg rounded-bl-lg">Customer Name</th>
                                    <th className="w-[30%] p-3 text-center">Remarks</th>
                                    <th className="w-[10%] p-3 text-center">Quantity</th>
                                    <th className="w-fit p-3 text-center rounded-tr-lg rounded-br-lg">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCustomers.map((customer, index) => (
                                    <tr key={index}>
                                        <td className="p-2">
                                            <input
                                                placeholder="Enter customer name..."
                                                type="text"
                                                value={customer.customer_name}
                                                onChange={e => updateCustomerField(index, "customer_name", e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                                            />
                                        </td>
                                        <td className="p-2">
                                            <input
                                                placeholder="Enter remarks..."
                                                type="text"
                                                value={customer.remarks}
                                                onChange={e => updateCustomerField(index, "remarks", e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                                            />
                                        </td>
                                        <td className="p-2">
                                            <input
                                                type="number"
                                                min={1}
                                                value={customer.quantity}
                                                onChange={e => updateCustomerField(index, "quantity", Number(e.target.value))}
                                                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                                            />
                                        </td>
                                        <td className="p-2 text-center">
                                            <button onClick={() => deleteCustomerRow(index)} className="text-orange-500 hover:text-orange-700 transition cursor-pointer">
                                                <TiDelete size={24} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="flex gap-4 mt-4 justify-center">
                            <button onClick={addCustomerRow} className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition cursor-pointer">+ Add Customer</button>
                            <button onClick={handleSave} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition cursor-pointer">Save</button>
                            <button onClick={handleCancel} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition cursor-pointer">Cancel</button>
                        </div>
                    </div>
                ) : (
                    <BaseText className="text-center">Select an order to edit</BaseText>
                )}
            </div>
        </div>
    );
}
