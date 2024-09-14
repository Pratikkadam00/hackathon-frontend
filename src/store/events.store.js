import { create } from "zustand";
import API from "../helpers/api";
import { EVENTS } from "../helpers/endpoints";

export const useEventsStore = create((set) => ({
  events: undefined,
  fetchEvents: async () => {
    try {
      const res = await API.get(EVENTS);
      set({ events: res.data });
    } catch (error) {
      console.log("🚀 ~ fetchEvents: ~ error:", error);
    }
  },
}));
