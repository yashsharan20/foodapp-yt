

import { IndianRupee } from "lucide-react";
import { Separator } from "./separator";
import { Link } from "react-router-dom";
import { Button } from "./button";
import { useOrderStore } from "@/store/useOrderStore";
import { useEffect } from "react";
const Success = () => {
    const { orders, getOrderDetails } = useOrderStore();
    useEffect(() => {
        getOrderDetails();
        console.log(orders);
    }, []);
    if (orders.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="font-bold text-2xl text-gray-700 dark:text-gray-300">Order not found</h1>
            </div>
        )
    }
    return (
        <div className="flex items-center justify-center min-h-screen dark:gray-900 px-4">
            <div className="dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg w-full">
                {
                    orders.map((order: any,index:number) => (
                        <div key={index}>
                            <h1 className="text-2xl font-bold text-center mb-5 text-gray-800 dark:text-gray-200">Order Status: {" "}
                                <span className="text-[#FF5A5A]">{order.status.toUpperCase()}</span>
                            </h1>
                            {
                                order.cartItems.map((item:any) => (
                                    <div className="mb-6">
                                         
                                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Order Summary</h2>
                                        <div className="mb-4">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center">
                                                    <img src={item.image} className="w-14 h-14 rounded-md object-cover" />
                                                    <h3 className="ml-2 text-gray-800 dark:text-gray-200 font-medium text-2xl">{item.name}</h3>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-gray-800 dark:text-gray-200 flex items-center">
                                                        <span className="text-lg font-medium">{item.price}</span><IndianRupee />
                                                    </div>
                                                </div>
                                            </div>
                                            <Separator className="my-4" />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }

                <Link to="/cart">
                    <Button className="bg-[#c08538] hover:bg-[#cf8625] cursor-pointer w-full py-3 rounded-md shadow-lg">Continue Shopping</Button>
                </Link>
            </div>
        </div>
    )
}
export default Success