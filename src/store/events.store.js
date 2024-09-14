import { create } from "zustand";
import API from "../helpers/api";
import { EVENTS, USERS } from "../helpers/endpoints";
import { useLoginStore } from "./login.store";

export const useEventsStore = create((set, get) => ({
  events: undefined,
  attendees: undefined,
  fetchEvents: async () => {
    try {
      const res = await API.get(EVENTS);
      set({ events: res.data });
    } catch (error) {
      console.log("🚀 ~ fetchEvents: ~ error:", error);
    }
  },
  getAttendees: async () => {
    try {
      const user = useLoginStore.getState().user;
      const res = await API.get(USERS);
      set({ attendees: res.data.filter((att) => att._id !== user._id) });
    } catch (error) {
      console.log("🚀 ~ fetchEvents: ~ error:", error);
    }
  },
  addEvent: async (payload) => {
    try {
      // const user = useLoginStore.getState().user;
      await API.post(EVENTS, payload);
      get().fetchEvents();
    } catch (error) {
      console.log("🚀 ~ fetchEvents: ~ error:", error);
    }
  },
}));
