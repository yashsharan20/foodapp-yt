import type { MenuItem } from "@/types/restaurantTypes"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter } from "./ui/card"
import { useCartStore } from "@/store/useCartStore"
import { useNavigate } from "react-router-dom"
const AvailableMenu = ({menus}:{menus:MenuItem[]}) =>{
    const {addToCart} = useCartStore()
    const navigate = useNavigate()
    return (
        <div className="md:p-4">
            <h1 className="text-xl md:text-2xl font-extrabold mb-6">Available Menus</h1>
            <div className="grid md:grid-cols-3 space-y-4 md:space-y-0">

               {menus.map((menu:MenuItem)=>(
                 <Card className="md:max-w-xs mx-auto py-0 my-3 shadow-lg rounded-lg overflow-hidden">
                    <img src={menu.image} className="w-full h-50 object-cover"/>
                    <CardContent className="p-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{menu.name}</h2>
                        <p className="text-sm text-gray-600 mt-2">{menu.description}</p>
                        <h3 className="text-lg font-semibold">Price: <span className="text-[#D19254] mt-4">{menu.price}₹</span> </h3>
                    </CardContent>
                    <CardFooter className="p-4">
                        <Button onClick={()=>{
                            addToCart(menu)
                            navigate('/cart')
                        }} className="bg-[#c08538] hover:bg-[#cf8625] w-full">Add to Cart</Button>
                    </CardFooter>
                </Card>
               ))}

            </div>
        </div>
    )
}
export default AvailableMenu