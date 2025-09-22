
import type { Orders } from "@/types/orderType";
import type { MenuItem, RestaurantState } from "@/types/restaurantTypes";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const API_END_POINT = "https://foodapp-yt.onrender.com/api/v1/restaurant";
axios.defaults.withCredentials = true;

export const useRestaurantStore = create<RestaurantState>()(
  persist(
    (set,get) => ({
      loading: false,
      restaurant: null,
      searchedRestaurant: null,
      appliedFilter: [],
      singleRestaurant:null,
      restaurantOrder:[],
      createRestaurant: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || "Failed to create restaurant");
          set({ loading: false });
        }
      },

      getRestaurant: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_END_POINT}/`);
          if (response.data.success) {
            set({ loading: false, restaurant: response.data.restaurant });
          }
        } catch (error: any) {
          if (error?.response?.status === 404) {
            set({ restaurant: null });
          }
          set({ loading: false });
        }
      },

      updateRestaurant: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.put(`${API_END_POINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || "Failed to update restaurant");
          set({ loading: false });
        }
      },

      searchRestaurant: async (
        searchText: string,
        searchQuery: string,
        selectedCuisines: string[]
      ) => {
        try {
          set({ loading: true });
          const params = new URLSearchParams();
          params.set("searchQuery", searchQuery);
          params.set("selectedCuisines", selectedCuisines.join(","));
          await new Promise((resolve)=>setTimeout(resolve,500));
          const response = await axios.get(
            `${API_END_POINT}/search/${searchText}?${params.toString()}`
          );
          if (response.data.success) {
            console.warn(response.data);
            set({ loading: false, searchedRestaurant: response.data || [] });
          }
        } catch (error) {
          console.error(error);
          set({ loading: false });
        }
      },

      addMenuToRestaurant: (menu: MenuItem) => {
        set((state) => ({
          restaurant: state.restaurant
            ? { ...state.restaurant, menus: [...state.restaurant.menus, menu] }
            : null,
        }));
      },

      updateMenuToRestaurant: (updatedMenu: MenuItem) => {
        set((state) => {
          if (state.restaurant) {
            const updatedMenuList = state.restaurant.menus.map((menu) =>
              menu._id === updatedMenu._id ? updatedMenu : menu
            );
            return {
              restaurant: {
                ...state.restaurant,
                menus: updatedMenuList,
              },
            };
          }
          return state;
        });
      },

      setAppliedFilter: (value: string) => {
        set((state) => {
          const isAlreadyApplied = state.appliedFilter.includes(value);
          const updatedFilter = isAlreadyApplied
            ? state.appliedFilter.filter((item) => item !== value)
            : [...state.appliedFilter, value];
          return { appliedFilter: updatedFilter };
        });
      },
      resetAppliedFilter:()=>{
        set({appliedFilter:[]});
      },
      getSingleRestaurant:async(restaurantId:string)=>{
        try {
          const response = await axios.get(`${API_END_POINT}/${restaurantId}`);
           if(response.data.success){
              set({singleRestaurant:response.data.restaurant})
           }
        } catch (error) {
          console.log(error);
        }
      },
      getRestaurantOrders:async ()=>{
        try {
          const response = await axios.get(`${API_END_POINT}/order`);
          if(response.data.success){
            set({restaurantOrder:response.data.orders})
          }
        } catch (error) {
          console.log(error);
        }
      },
      updateRestaurantOrder:async(orderId:string,status:string)=>{
        try {
          const response = await axios.put(`${API_END_POINT}/order/${orderId}/status`,{status},{
            headers:{
              'Content-Type':'application/json'
            }
          })
          if(response.data.success){
              const updatedOrder = get().restaurantOrder.map((order:Orders)=>{
                return order._id == orderId ? {...order,status:response.data.status} : order;
              })
              set({restaurantOrder:updatedOrder})
              toast.success(response.data.message);
          }
        } catch (error:any) {
          toast.error(error.response.data.message);
        }
      }
    }),
    {
      name: "restaurant-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
