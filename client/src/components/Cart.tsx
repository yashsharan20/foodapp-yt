import { Button } from "./ui/button"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table"
import { Avatar,AvatarImage,AvatarFallback } from "./ui/avatar"
import { Minus, Plus } from "lucide-react"
import { useState } from "react"
import CheckoutConfirmPage from "./CheckoutConfirmPage"
import { useCartStore } from "@/store/useCartStore"
import type { CartItem } from "@/types/cartType";

const Cart = () => {
    const [open,setOpen] = useState(false);
    const {cart,decrementQuantity,incrementQuantity,removeFromTheCart,clearCart} = useCartStore()

    let totalAmount = cart.reduce((acc,ele)=>{
        return acc + ele.price*ele.quantity;
    },0);
    return (
        <div className="flex flex-col max-w-7xl mx-auto my-10">
            <div className="flex justify-end">
                <Button onClick={()=>clearCart()} className="cursor-pointer" variant={'link'}>Clear All</Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Items</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead className="text-right">Remove</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        cart.map((item:CartItem)=>(
                                <TableRow>
                        <TableCell>
                            <Avatar>
                                <AvatarImage src={item.image}/>
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                           <TableCell>{item.price}</TableCell>
                              <TableCell>
                                <div className="w-fit flex items-center rounded-full border border-gray-100 dark:border-gray-800 shadow-bg">
                                    <Button size={'icon'} onClick={()=>decrementQuantity(item._id)} variant={'outline'} className="rounded-full cursor-pointer"><Minus/></Button>
                                    <Button size={'icon'} className="font-bold border-none" disabled variant={'outline'}>{item.quantity}</Button>
                                    <Button size={'icon'} onClick={()=>incrementQuantity(item._id)} className="font-bold cursor-pointer rounded-full border-none bg-[#D19254] hover:bg-[#cf8625]" variant={'outline'}><Plus/></Button>
                                </div>
                              </TableCell>
                                 <TableCell>{item.price * item.quantity}</TableCell>
                                    <TableCell className="text-right">
                                        <Button onClick={()=>removeFromTheCart(item._id)} size={'sm'} className="bg-[#D19254] cursor-pointer hover:bg-[#cf8625]">Remove</Button>
                                    </TableCell>
                     </TableRow>
                        ))
                    }
                 

                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={5}>Total</TableCell>
                        <TableCell className="text-right font-bold text-2xl">{totalAmount}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <div className="flex justify-center my-5">
                <Button disabled={totalAmount<=0} onClick={()=>setOpen(true)} className="bg-[#D19254] hover:bg-[#cf8625] cursor-pointer">Proceed To Checkout</Button>
            </div>
            <CheckoutConfirmPage open={open} setOpen={setOpen}/>
        </div>
    )
}
export default Cart