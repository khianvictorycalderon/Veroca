'use client'

export default function OrderSubPage() {
    return (
        <div className="lg:flex lg:flex-row w-full bg-gray-50">
            
            {/* Add Order Section + View Order */}
            <div className="lg:flex-1/4 h-[80vh] lg:h-[100vh] flex flex-col bg-neutral-900 text-white">
                <div className="flex-1/2 lg:flex-1/3 overflow-y-hidden pt-16 px-4 lg:px-8">
                    Add order input + button here...
                </div>
                <div className="flex-1/2 lg:flex-2/3 overflow-y-auto py-8 px-4 lg:px-8">
                    Orders and Search bar here...
                </div>
            </div>

            {/* Order Details Section */}
            <div className="lg:flex-3/4 bg-gray-100 text-neutral-700 h-[100vh] overflow-y-auto py-16 px-4 lg:px-8">
                Order details here...                
            </div>

        </div>
    )
}