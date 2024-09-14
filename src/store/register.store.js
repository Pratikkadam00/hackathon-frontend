import { create } from "zustand";
import API from "../helpers/api";
import { REGISTER } from "../helpers/endpoints";
import toast from "react-hot-toast";

export const useRegisterStore = create((set) => ({
  user: undefined,
  registerFn: async (payload) => {
    try {
      await API.post(REGISTER, payload);
      toast.success("User registered successfully!");
      //   set((state) => ({ bears: state.bears + 1 }));
    } catch (error) {
      toast.error("Something went wrong!");
    }
  },
}));
