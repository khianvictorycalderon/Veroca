'use client'

export default function OrderSubPage() {
    return (
        <div className="lg:flex lg:flex-row w-full bg-gray-50">
            
            {/* Add Order Section + View Order */}
            <div className="lg:flex-1/4 h-[70vh] lg:h-[100vh] flex flex-col bg-neutral-900 text-white">
                <div className="flex-1/3 overflow-y-hidden">
                    Add order input + button here...
                </div>
                <div className="flex-2/3 overflow-y-auto">
                    Orders and Search bar here...
                </div>
            </div>
            <div className="lg:flex-3/4 bg-gray-100 text-neutral-700 h-[100vh] overflow-y-auto">
                Order details here...                
            </div>

        </div>
    )
}