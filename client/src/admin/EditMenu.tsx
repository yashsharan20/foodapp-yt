import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { menuSchema, type MenuFormSchema } from "@/schema/menuSchema";
import { useMenuStore } from "@/store/useMenuStore";
import { Label } from "@radix-ui/react-menubar"
import { Loader2 } from "lucide-react";
import { useEffect, useState,type Dispatch,type FormEvent, type SetStateAction } from "react";

type SelectedMenu = MenuFormSchema & { _id: string };
const EditMenu = ({ selectedMenu, editOpen, setEditOpen }: { selectedMenu: SelectedMenu, editOpen: boolean, setEditOpen: Dispatch<SetStateAction<boolean>> }) => {
   const [input,setInput] = useState<MenuFormSchema>({
        name:"",
        description:"",
        price:0,
        image:undefined
   });
   const [error,setError] = useState<Partial<MenuFormSchema>>({});
   const {loading,editMenu} = useMenuStore();
   const changeEventHandler =  (e:React.ChangeEvent<HTMLInputElement>) =>{
        const {name,value,type} = e.target
        setInput({...input,[name]:type === 'number'?Number(value):value});
   }
    const submitHandler = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const result = menuSchema.safeParse(input);
        if(!result.success){
            const fieldErrors = result.error.flatten().fieldErrors;
            setError(fieldErrors as Partial<MenuFormSchema>);
            return;
        }
        console.log(input);
        try {
            const formData = new FormData();
            formData.append("name",input.name);
            formData.append("description",input.description);
            formData.append("price",input.price.toString());
            if(input.image){
                formData.append("image",input.image);
            }
            await editMenu(selectedMenu._id,formData);
        } catch (error) {
            console.log(error);
        }
   }
   useEffect(()=>{
        setInput({
            name:selectedMenu?.name || "",
            description:selectedMenu?.description || "",
            price:selectedMenu?.price || 0,
            image:undefined
        })
   },[selectedMenu]);
    return (
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Menu</DialogTitle>
                    <DialogDescription>
                        Update your menu to keep your offerings fresh and exciting!
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={submitHandler} className="space-y-4">
                    <div className="mt-2">
                        <Label>Name</Label>
                        <Input type="text" name="name" onChange={changeEventHandler} value={input.name} placeholder="Enter menu name" />
                        {error && <span className="text-xs font-medium text-red-600">{error.name}</span>}
                    </div>

                    <div className="mt-2">
                        <Label>Description</Label>
                        <Input
                            type="text" value={input.description}
                            name="description" onChange={changeEventHandler}
                            placeholder="Enter menu description"
                        />
                         {error && <span className="text-xs font-medium text-red-600">{error.description}</span>}
                    </div>

                    <div className="mt-2">
                        <Label>Price</Label>
                        <Input
                            type="number" value={input.price}
                            name="price" onChange={changeEventHandler}
                            placeholder="Enter menu price"
                        />
                         {error && <span className="text-xs font-medium text-red-600">{error.price}</span>}
                    </div>

                    <div className="mt-2">
                        <Label>Upload Menu Image</Label>
                        <Input type="file" name="image" onChange={(e) => setInput({ ...input, image: e.target.files?.[0] || undefined })} accept="image/*" />
                      {error && <span className="text-xs font-medium text-red-600">{error.image?.name}</span>}
                    </div>

                    <DialogFooter>
                        {loading ? (
                            <Button
                                disabled
                                className="bg-[#c08538] hover:bg-[#cf8625] cursor-pointer mt-5 w-full"
                            >
                                <Loader2 className="animate-spin mr-2" />
                                Please wait
                            </Button>
                        ) : (
                            <Button className="bg-[#c08538] hover:bg-[#cf8625] cursor-pointer mt-5 w-full">
                                Submit
                            </Button>
                        )}
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}
export default EditMenu