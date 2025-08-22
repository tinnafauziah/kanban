"use client";
import { create } from "zustand";
import axios from "axios";
import { STATUSES, TODO, DOING, DONE } from "@/type/task";

export const useTaskStore = create((set) => ({
  [TODO]: [],
  [DOING]: [],
  [DONE]: [],
  setTasks: (status, tasks) =>
    set((state) => ({
      ...state,
      [status]: tasks,
    })),
}));

export async function createTask(body) {
  const response = await axios.post(
    "https://68a5db382a3deed2960f28d3.mockapi.io/api/task",
    body
  );

  if (response?.data) {
    useTaskStore.getState().setTasks(response.data, body.status);
    STATUSES.forEach((status) => {
      fetchTasks(body.userId, status.value);
    });
    return response.data;
  } else {
    return Promise.reject(new Error("Failed to create task"));
  }
}

export async function fetchTasks(userId, status) {
  let response = null;
  try {
    response = await axios.get(
      "https://68a5db382a3deed2960f28d3.mockapi.io/api/task",
      { params: { userId, status } }
    );
  } catch {
    useTaskStore.getState().setTasks(status, []);
  }

  if (response?.data) {
    useTaskStore.getState().setTasks(status, response.data);
  }
  return response?.data || [];
}
