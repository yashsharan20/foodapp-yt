import { Dialog } from "@radix-ui/react-dialog"
import { useState, type Dispatch, type FormEvent, type SetStateAction } from "react"
import { DialogContent, DialogDescription, DialogFooter, DialogTitle } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useUserStore } from "@/store/useUserStore"
import type { CheckoutSessionRequest } from "@/types/orderType"
import { useCartStore } from "@/store/useCartStore"
import { useRestaurantStore } from "@/store/useRestaurantStore"
import { useOrderStore } from "@/store/useOrderStore"
import { Loader2 } from "lucide-react"

const CheckoutConfirmPage = ({ open, setOpen }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) => {
    const { user } = useUserStore();
    const {createCheckoutSession,loading} = useOrderStore();
    const [input, setInput] = useState({
        name: user?.fullname || "",
        email: user?.email || "",
        contact: user?.contact.toString() || "",
        address: user?.address || "",
        city: user?.city || "",
        country: user?.country || "",
    });
    const { cart } = useCartStore()
    const { singleRestaurant  } = useRestaurantStore()
    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setInput({ ...input, [name]: value })
    }
    const checkoutHandler = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const checkoutData: CheckoutSessionRequest = {
                cartItems: cart.map((cartItem) => ({
                    menuId: cartItem._id,
                    name: cartItem.name,
                    image: cartItem.image,
                    price: cartItem.price.toString(),
                    quantity: cartItem.quantity.toString(),
                })),
                deliveryDetails: input,
                restaurantId: singleRestaurant?._id as string
            }
            await createCheckoutSession(checkoutData);
        } catch (error) {
            console.log(error);
        }
        console.log(input);
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogTitle className="font-semibold">Review Your Order</DialogTitle>
                <DialogDescription>
                    Double check your delivery details and ensure everything is in order.
                    When you are ready, hit confirm button to finalize your order.
                </DialogDescription>
                <form onSubmit={checkoutHandler} className="">
                    <div className="mt-3">
                        <Label>Fullname</Label>
                        <Input type="text" className="w-full" name="name" value={input.name} onChange={changeEventHandler} />
                    </div>
                    <div className="mt-3">
                        <Label>Email</Label>
                        <Input type="email" disabled className="w-full" name="email" value={input.email} onChange={changeEventHandler} />
                    </div>
                    <div className="mt-3">
                        <Label>Contact</Label>
                        <Input type="text" className="w-full" name="contact" value={input.contact} onChange={changeEventHandler} />
                    </div>
                    <div className="mt-3">
                        <Label>Address</Label>
                        <Input type="text" className="w-full" name="address" value={input.address} onChange={changeEventHandler} />
                    </div>
                    <div className="mt-3">
                        <Label>City</Label>
                        <Input type="text" className="w-full" name="city" value={input.city} onChange={changeEventHandler} />
                    </div>
                    <div className="mt-3">
                        <Label>Country</Label>
                        <Input type="text" className="w-full" name="country" value={input.country} onChange={changeEventHandler} />
                    </div>
                    <DialogFooter className="col-span-2 pt-5">
                      {
                        loading ? (
                              <Button disabled className="cursor-pointer bg-[#c08538] hover:bg-[#cf8625] w-full"><Loader2 className="animate-spin"/>Please wait...</Button>
                        ):(
                              <Button className="cursor-pointer bg-[#c08538] hover:bg-[#cf8625] w-full">Continue To Payment</Button>
                        )
                      }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
export default CheckoutConfirmPage