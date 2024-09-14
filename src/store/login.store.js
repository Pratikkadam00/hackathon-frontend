import { create } from "zustand";
import API from "../helpers/api";
import { LOGIN } from "../helpers/endpoints";
import toast from "react-hot-toast";

export const useLoginStore = create((set) => ({
  user: undefined,
  token: undefined,
  login: async (payload) => {
    try {
      const res = await API.post(LOGIN, payload);
      const { email, _id, name, token, role } = res.data;
      const user = { email, _id, name, role };
      set({ user, token: token });
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      toast.error("Invalid email or password!");
    }
  },
  logout: () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    set({
      user: undefined,
      token: undefined,
    });
  },
  loadLogin: () => {
    const token = sessionStorage.getItem("token");
    const user = sessionStorage.getItem("user");

    if (user && token) {
      set({ user: JSON.parse(user), token: token });
    }
  },
}));
