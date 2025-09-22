import { Request, Response } from "express";
import { Restaurant } from "../models/restaurant.model";
import { Order } from "../models/order.model";
import Stripe from "stripe";
import { User } from "../models/user.model";

type checkoutSessionRequest = {
    cartItems: {
        menuId: string,
        name: string,
        image: string,
        price: number,
        quantity: number
    }[],
    deliveryDetails: {
        name: string,
        email: string,
        address: string,
        city: string
    },
    restaurantId: string
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find({ user: req.id }).populate("user").populate("restaurant")
        return res.status(200).json({
            success: true,
            orders
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const createCheckoutSession = async (req: Request, res: Response) => {

    try {
        const checkoutSessionRequest: checkoutSessionRequest = req.body
        const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId).populate('menus')
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found."
            });
        }
        const menuItems = restaurant.menus as any[]
        const totalAmount = checkoutSessionRequest.cartItems.reduce((acc, cartItem) => {
            const menuItem = menuItems.find(item => item._id.toString() === cartItem.menuId);
            if (!menuItem) throw new Error(`Menu item not found`);
            return acc + (menuItem.price * cartItem.quantity); 
        }, 0);

        const order: any = new Order({
            restaurant: restaurant._id,
            user: req.id,
            deliveryDetails: checkoutSessionRequest.deliveryDetails,
            cartItems: checkoutSessionRequest.cartItems,
            status: "pending",
            totalAmount: totalAmount
        })
        const lineItems = createLineItems(checkoutSessionRequest, menuItems)

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            shipping_address_collection: {
                allowed_countries: ['GB', 'US', 'CA']
            },
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}order/status`,
            cancel_url: `${process.env.FRONTEND_URL}cart`,
            metadata: {
                orderId: order._id.toString(),
                images: JSON.stringify(menuItems.map((item: any) => item.image))
            }
        })
        if (!session.url) {
            return res.status(400).json({
                success: false,
                message: "Error while creating session"
            })
        }
        await order.save();
        return res.status(200).json({
            session
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const stripeWebhook = async(req:Request,res:Response)=>{
    let event: Stripe.Event | undefined;
    try {
        const signature = req.headers["stripe-signature"] as string | undefined;
        const payloadString = JSON.stringify(req.body,null,2);
        const secret = process.env.WEBHOOK_ENDPOINT_SECRET!;
        event = stripe.webhooks.constructEvent(payloadString,signature!,secret);
    } catch (error:any) {
        console.log("webhook error",error.message);
    }
    if(event && event.type === "checkout.session.completed"){
        try {
            const session = event.data.object as Stripe.Checkout.Session;
            const order = await Order.findById(session.metadata?.orderId)
            if(!order){
                return res.status(404).json({message:"Order not found"});
            }
            if(session.amount_total){
                order.totalAmount = session.amount_total/100;
            }
            order.status = "confirmed"
            await order.save();
        } catch (error) {
            console.log('Error handling event:',error);
            return res.status(500).json({message:"Internal server error"});
        }
    }
    res.status(200).send();
}

export const createLineItems = (checkoutSessionRequest: checkoutSessionRequest, menuItems: any) => {
    const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
        const menuItem = menuItems.find((item: any) => item._id.toString() == cartItem.menuId)
        if (!menuItem) throw new Error(`Menu item id not found`);
        return {
            price_data: {
                currency: 'inr',
                product_data: {
                    name: menuItem.name,
                    images: [menuItem.image]
                },
                unit_amount: menuItem.price * 100,
            },
            quantity: cartItem.quantity
        }
    })
    return lineItems;
}