"use client";
import { create } from "zustand";
import axios from "axios";
import { STATUSES, TODO, DOING, DONE } from "@/type/task";

const URL = "https://68a5db382a3deed2960f28d3.mockapi.io/api/task";

export const useTaskStore = create((set) => ({
  [TODO]: [],
  [DOING]: [],
  [DONE]: [],
  selectedTask: {},
  setTasks: (status, tasks) =>
    set((state) => ({
      ...state,
      [status]: tasks,
    })),
  setSelectedTask: (task) => set({ selectedTask: task }),
}));

export async function createTask(body) {
  const response = await axios.post(URL, body);

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
    response = await axios.get(URL, { params: { userId, status } });
  } catch {
    useTaskStore.getState().setTasks(status, []);
  }

  if (response?.data) {
    useTaskStore.getState().setTasks(status, response.data);
  }
  return response?.data || [];
}

export async function fetchTaskById(id) {
  let response = null;
  try {
    response = await axios.get(`${URL}/${id}`);
  } catch {
    useTaskStore.getState().setSelectedTask({});
  }

  if (response?.data) {
    useTaskStore.getState().setSelectedTask(response.data);
  }
  return response?.data || {};
}

export async function updateTask(id, body) {
  const response = await axios.put(`${URL}/${id}`, body);

  if (response?.data) {
    useTaskStore.getState().setTasks(response.data, body.status);
    fetchTaskById(id);
    return response.data;
  } else {
    return Promise.reject(new Error("Failed to update task"));
  }
}

export async function deleteTask(id) {
  await axios.delete(`${URL}/${id}`);
}
