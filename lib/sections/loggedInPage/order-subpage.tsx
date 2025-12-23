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

                </div>
            </div>

            {/* Order Details Section */}
            <div className="lg:flex-3/4 bg-gray-100 text-neutral-700 h-[100vh] overflow-y-auto py-16 px-4 lg:px-8">

                Content here...

            </div>

        </div>
    )
}