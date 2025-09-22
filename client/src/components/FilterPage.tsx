
import { useRestaurantStore } from "@/store/useRestaurantStore"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"

export type FilterOptionState = {
    id:string,
    label:string
}[]

const filterOptions:FilterOptionState= [
    {id:"burger",  label:"Burger"},
    {id:"thali", label:"Thali"},
    {id:"biryani",  label:"Biryani"},
    {id:"momos", label:"momos"},
    {id:"pizza", label:"pizza"},
]

const FilterPage = () =>{
    const {setAppliedFilter,appliedFilter,resetAppliedFilter } = useRestaurantStore();
    const appliedFilterHandler = (value:string) =>{
       setAppliedFilter(value); 
    }
    return (
        <div className="md:w-72">
            <div className="flex items-center justify-between">
                <h1 className="font-medium text-lg">Filter by cuisines</h1>
                <Button onClick={()=>resetAppliedFilter()} variant={"link"}>Reset</Button>
            </div>
            {
                filterOptions.map((option)=>(
                    <div key={option.id} className="flex items-center space-x-2 my-5">
                        <Checkbox id={option.id} checked={appliedFilter.includes(option.label)} onClick={()=>appliedFilterHandler(option.label)}  />
                        <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-0">{option.label}</Label>
                    </div>
                ))
            }
        </div>
    )
}
export default FilterPage