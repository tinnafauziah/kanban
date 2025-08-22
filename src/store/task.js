import { create } from "zustand";
import axios from "axios";

export const useTaskStore = create((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
}));

export async function createTask(body) {
  const response = await axios.post(
    "https://68a5db382a3deed2960f28d3.mockapi.io/api/task",
    body
  );

  if (response?.data) {
    fetchTasks(body.userId);
    return response.data;
  } else {
    return Promise.reject(new Error("Failed to create task"));
  }
}

export async function fetchTasks(userId) {
  const response = await axios.get(
    "https://68a5db382a3deed2960f28d3.mockapi.io/api/task",
    { params: { userId } }
  );

  if (response?.data) {
    useTaskStore.getState().setTasks(response.data);
    return response.data;
  } else {
    return Promise.reject(new Error("Failed to fetch tasks"));
  }
}
