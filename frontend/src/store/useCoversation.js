import { create } from "zustand";

const useConversation = create((set) => ({
  selected: null,
  setSelected: (selected) => set({ selected }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
