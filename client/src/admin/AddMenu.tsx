import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { useState,type FormEvent } from "react";
import EditMenu from "./EditMenu";
import { menuSchema, type MenuFormSchema } from "@/schema/menuSchema";
import { useMenuStore } from "@/store/useMenuStore";
import { useRestaurantStore } from "@/store/useRestaurantStore";



const AddMenu = () => {
  const [input,setInput] = useState<MenuFormSchema>({
    name:"",
    description:"",
    price:0,
    image:undefined
  });
  const [open, setOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<any>();
  const [error,setError] = useState<Partial<MenuFormSchema>>({}); 
  const [editOpen,setEditOpen] = useState<boolean>(false);
  const {loading,createMenu} = useMenuStore();
  const {restaurant} = useRestaurantStore();

  const changeEventHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
    e.preventDefault();
    const {name,value,type} = e.target 
    setInput({...input,[name]:type === 'number'?Number(value):value});
  }

  const submitHandler = async(e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    const result = menuSchema.safeParse(input);
    if(!result.success){
      const fieldErrors = result.error.flatten().fieldErrors;
      setError(fieldErrors as Partial<MenuFormSchema>);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name",input.name);
      formData.append("description",input.description);
      formData.append("price",input.price.toString());
      if(input.image){
        formData.append("image",input.image);
      }
      await createMenu(formData);
    } catch (error) {
       console.log(error);      
    }

    console.log(input);
  }

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex justify-between">
        <h1 className="font-bold md:font-extrabold text-lg md:text-2xl">
          Available Menus
        </h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#c08538] hover:bg-[#cf8625] cursor-pointer">
              <Plus className="h-4 w-4" />
              Add Menus
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add A New Menu</DialogTitle>
              <DialogDescription>
                Create a menu that will make your restaurant stand out.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={submitHandler} className="space-y-4">
              <div className="mt-2">
                <Label htmlFor="name">Name</Label>
                <Input type="text" name="name" onChange={changeEventHandler} value={input.name} placeholder="Enter menu name" />
                {error && <span className="text-xs font-medium text-red-600">{error.name}</span> }
              </div>

              <div className="mt-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  type="text" value={input.description}
                  name="description" onChange={changeEventHandler}
                  placeholder="Enter menu description"
                />
                 {error && <span className="text-xs font-medium text-red-600">{error.description}</span> }
              </div>

              <div className="mt-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  type="number" value={input.price}
                  name="price" onChange={changeEventHandler}
                  placeholder="Enter menu price"
                />
                {error && <span className="text-xs font-medium text-red-600">{error.price}</span> }
              </div>

              <div className="mt-2">
                <Label htmlFor="image">Upload Menu Image</Label>
                <Input type="file" name="image" onChange={(e)=>setInput({...input,image:e.target.files?.[0] || undefined})} accept="image/*" />
                {error && <span className="text-xs font-medium text-red-600">{error.image?.name}</span> }
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
      </div>

      <div className="mt-6 space-y-4">
        {restaurant?.menus.map((menu:any, idx:number) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-lg border"
          >
            <img
              src={menu.image}
              className="md:h-24 md:w-24 h-16 w-full object-cover rounded-lg"
              alt="Menu item"
            />
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-800">{menu.name}</h1>
              <p className="text-sm text-gray-600">
                {menu.description}
              </p>
              <h2 className="text-md font-semibold mt-2">
                Price: <span>₹{menu.price}</span>
              </h2>
            </div>
            <Button
              size={"sm"} onClick={()=>{
                setSelectedMenu(menu)
                setEditOpen(true);
              }}
              className="bg-[#c08538] hover:bg-[#cf8625] mt-2 cursor-pointer"
            >
              Edit
            </Button>
          </div>
        ))}
      </div>
      <EditMenu selectedMenu={selectedMenu} editOpen={editOpen} setEditOpen={setEditOpen} />
    </div>
  );
};

export default AddMenu;
