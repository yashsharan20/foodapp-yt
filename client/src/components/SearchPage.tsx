import { Link, useParams } from "react-router-dom"
import FilterPage from "./FilterPage";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Globe, MapPin, X } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import { Skeleton } from "./ui/skeleton";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import type { Restaurant } from "@/types/restaurantTypes";


const SearchPage = () => {
    const params = useParams();
    const searchText = params.text!;  
    const [searchQuery, setSearchQuery] = useState<string>("");
    const {
        searchedRestaurant,
        loading,
        searchRestaurant,
        appliedFilter,
        setAppliedFilter 
    } = useRestaurantStore();

    useEffect(() => {
        if (searchText) {
            searchRestaurant(searchText, searchQuery, appliedFilter);
        }
    }, [searchText, searchQuery, appliedFilter]);

    const handleSearch = () => {
        searchRestaurant(searchText, searchQuery, appliedFilter);
    };

    return (
        <div className="max-w-7xl mx-auto my-10">
            <div className="flex flex-col md:flex-row justify-between gap-10">
                <FilterPage />
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <Input
                            type="text"
                            placeholder="Search by restaurant & cuisines"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button
                            onClick={handleSearch}
                            className="bg-[#c08538] hover:bg-[#cf8625] cursor-pointer"
                        >
                            Search
                        </Button>
                    </div>

                    <div>
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
                            <h1 className="font-medium text-lg">
                                ({searchedRestaurant?.data.length}) Search result found
                            </h1>
                            <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                                {appliedFilter.map((selectedFilter: string, idx: number) => (
                                    <div
                                        key={idx}
                                        className="relative inline-flex items-center max-w-full"
                                    >
                                        <Badge 
                                            className="text-[#D19254] rounded-md hover:cursor-pointer pr-5 whitespace-nowrap"
                                            variant={"outline"}
                                        >
                                            {selectedFilter}
                                        </Badge>
                                        <X onClick={()=>setAppliedFilter(selectedFilter)}
                                            size={13}
                                            className="absolute text-[#D19254] right-1 hover:cursor-pointer"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            {loading ? (
                                <SearchPageSkeleton />
                            ) : searchedRestaurant?.data.length === 0 ? (
                                <NoResultFound searchText={searchText} />
                            ) : (
                                searchedRestaurant?.data.map((restaurant: Restaurant) => (
                                    <Card
                                        key={restaurant._id}
                                        className="bg-white py-0 dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                                    >
                                        <div className="relative">
                                            <AspectRatio ratio={16 / 6}>
                                                <img
                                                    src={restaurant.imageUrl}
                                                    className="w-full h-full object-cover"
                                                    alt={restaurant.restaurantName}
                                                />
                                            </AspectRatio>
                                            <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-lg py-1 px-3">
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Featured
                                                </span>
                                            </div>
                                        </div>
                                        <CardContent className="py-2">
                                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                                {restaurant.restaurantName}
                                            </h1>
                                            <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                                                <MapPin size={16} />
                                                <p className="text-sm">City: </p>
                                                <span className="font-medium">{restaurant.city}</span>
                                            </div>
                                            <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                                                <Globe size={16} />
                                                <p className="text-sm">Country: </p>
                                                <span className="font-medium">{restaurant.country}</span>
                                            </div>
                                            <div className="flex gap-2 mt-4 flex-wrap">
                                                {restaurant.cuisines.map((cuisine: string, index: number) => (
                                                    <Badge
                                                        className="font-medium px-2 py-1 rounded-full shadow-sm"
                                                        key={index}
                                                    >
                                                        {cuisine}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </CardContent>
                                        <CardFooter className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 text-white flex justify-end">
                                            <Link to={`/restaurant/${restaurant._id}`}>
                                                <Button className="bg-[#c08538] font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-200 hover:bg-[#cf8625] cursor-pointer">
                                                    View Menus
                                                </Button>
                                            </Link>
                                        </CardFooter>
                                    </Card>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;

const SearchPageSkeleton = () => {
    return (
        <div className="grid md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex flex-col space-y-3">
                    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            ))}
        </div>
    );
};

const NoResultFound = ({ searchText }: { searchText: string }) => {
    return (
        <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-700">No results found</h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
                We couldn't find any results for "{searchText}".<br />
                Try searching with a different term.
            </p>
            <Link to="/">
                <Button className="bg-[#c08538] hover:bg-[#cf8625]">Go Back to Home</Button>
            </Link>
        </div>
    );
};
