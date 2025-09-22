import {z} from "zod"

export const restaurantFormSchema = z.object({
    restaurantName:z.string().nonempty({message:"Restaurant name is required"}),
    city:z.string().nonempty({message:"City is required"}),
    country:z.string().nonempty({message:"Country is required"}),
    deliveryTime:z.number().min(0,{message:"Delivery time can not be negative"}),
    cuisines:z.array(z.string()),
    imageFile:z.instanceof(File).optional().refine((file)=>file?.size !== 0,{message:"Image file is required"})
});

export type restaurantFormSchema = z.infer<typeof restaurantFormSchema>
