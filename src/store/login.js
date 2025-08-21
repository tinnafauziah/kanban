import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

export const useLoginStore = create(
  persist(
    (set) => ({
      loggedUser: {},
      reset: () => set({ loggedUser: {} }),
    }),
    {
      name: "login-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({ loggedUser: state.loggedUser }),
    }
  )
);

export async function login(username, password) {
  const response = await axios.get(
    "https://68a5db382a3deed2960f28d3.mockapi.io/api/user",
    { params: { username } }
  );

  const user = response?.data?.[0];

  if (user && user.password === password) {
    useLoginStore.setState({ loggedUser: user });
    return response?.data?.[0] || null;
  } else {
    return Promise.reject(new Error("Invalid username or password"));
  }
}
