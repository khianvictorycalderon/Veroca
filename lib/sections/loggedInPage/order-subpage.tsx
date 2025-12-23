'use client'

export default function OrderSubPage() {
    return (
        <div className="lg:flex lg:flex-row w-full bg-gray-50">
            
            {/* Add Order Section + View Order */}
            <div className="lg:flex-1/4 h-[70vh] lg:h-[100vh] flex flex-col">
                <div className="flex-1/3 bg-red-600 overflow-y-hidden">
                    
                </div>
                <div className="flex-2/3 bg-blue-600 overflow-y-auto">
                    
                </div>
            </div>
            <div className="lg:flex-3/4 bg-green-600 h-[70vh] lg:h-[100vh] overflow-y-auto">
                
            </div>

        </div>
    )
}