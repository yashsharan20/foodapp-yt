import { Link } from "react-router-dom"
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HandPlatter, Loader2, Menu, Moon, PackageCheck, ShoppingCart, SquareMenu, Sun, User, Utensils } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "./separator"
import { useUserStore } from "@/store/useUserStore"
import { useCartStore } from "@/store/useCartStore"
import { useThemeStore } from "@/store/useThemeStore"

const Navbar = () => {
    const {user,loading,logout} = useUserStore()
    const {cart} = useCartStore();
    const {setTheme} = useThemeStore()
    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between h-14">
                <Link to="/">
                    <h1 className="font-bold md:font-extrabold text-2xl">Sharan Hotels</h1>
                </Link>
                <div className="hidden md:flex items-center gap-10">
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/">Home</Link>
                        <Link to="/profile">Profile</Link>
                        <Link to="/order/status">Order</Link>
                    </div>
                    {
                        user?.admin && (
                            <Menubar>
                                <MenubarMenu>
                                    <MenubarTrigger>Dashboard</MenubarTrigger>
                                    <MenubarContent>
                                        <Link to="/admin/restaurant"><MenubarItem>Restaurant</MenubarItem></Link>
                                        <Link to="/admin/menu"> <MenubarItem>Menu</MenubarItem></Link>
                                        <Link to="/admin/orders"> <MenubarItem>Order</MenubarItem></Link>
                                    </MenubarContent>
                                </MenubarMenu>
                            </Menubar>
                        )
                    }

                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                                    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                                    <span className="sr-only">Toggle theme</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={()=>setTheme('light')}>
                                    Light
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={()=>setTheme('dark')}>
                                    Dark
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <Link to="/cart" className="relative cursor-pointer">
                        <ShoppingCart />
                          {cart.length > 0 && (
                                 <Button size={'icon'} className="absolute -inset-y-3 left-2 text-sm rounded-full h-4 w-4 bg-red-500 hover:bg-red-500">{cart.length}</Button>  
                          )} 
                    </Link>
                    <div>
                        <Avatar>
                            <AvatarImage src={user?.profilePicture} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                    <div>
                        {
                            loading ? (
                                <Button className="bg-[#c08538] hover:bg-[#cf8625]"><Loader2 className="animate-spin" />Please wait</Button>
                            ) : (
                                <Button onClick={logout} className=" bg-[#c08538] cursor-pointer hover:bg-[#cf8625]">Logout</Button>
                            )
                        }
                    </div>
                </div>
                <div className="md:hidden lg:hidden">
                    <MobileNavbar />
                </div>
            </div>

        </div>
    )
}
export default Navbar

const MobileNavbar = () => {
    const {user,loading,logout} = useUserStore()
    const {setTheme} = useThemeStore()
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size={'icon'} className="rounded-full bg-gray-200 text-black hover:bg-gray-200" variant="outline">
                    <Menu size={'18'} />
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader className="flex flex-row items-center justify-between mt-2">
                    <SheetTitle>Sharan Hotels</SheetTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={()=>setTheme('light')}>
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={()=>setTheme('dark')}>
                                Dark
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SheetHeader>
                <Separator className="my-2" />
                <SheetDescription className="flex-1">
                    <Link to="/profile" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium">
                        <User />
                        <span>Profile</span>
                    </Link>
                    <Link to="/order/status" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium">
                        <HandPlatter />
                        <span>Order</span>
                    </Link>
                    <Link to="/profile" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium">
                        <ShoppingCart />
                        <span>Cart (0)</span>
                    </Link>
                    {user?.admin  && (
                        <>
                            <Link to="/admin/restaurant" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium">
                                <Utensils />
                                <span>Restaurant</span>
                            </Link>
                            <Link to="/admin/menu" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium">
                                <SquareMenu />
                                <span>Menu</span>
                            </Link>
                            <Link to="/admin/orders" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium">
                                <PackageCheck />
                                <span>Restaurant Orders</span>
                            </Link>
                        </>
                    )}
                </SheetDescription>
                <SheetFooter className="flex flex-col gap-5">
                    {
                        <>
                            <div className="flex flex-row items-center gap-2">
                                    <Avatar>
                                        <AvatarImage src={user?.profilePicture}/>
                                        <AvatarFallback></AvatarFallback>
                                    </Avatar>
                                    <h1 className="font-bold">Sharan Hotels</h1>
                                </div>
                                {
                                    loading ? (
                                        <Button className="bg-[#c08538] hover:bg-[#cf8625]"><Loader2 className="animate-spin" />Please wait</Button>
                                    ) : (
                                        <Button onClick={logout} className=" bg-[#c08538] cursor-pointer hover:bg-[#cf8625]">Logout</Button>
                                    )
                                }
                         </>
                    }
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}