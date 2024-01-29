// apiService.ts

import axios from 'axios';
import { Todo } from '../pages/types';

// Define API base URL and endpoints
const API_BASE_URL = 'http://localhost:5000/api';
const TODO_API_URL = `${API_BASE_URL}/todos`;
const USER_API_URL = `${API_BASE_URL}/auth`;

export const getAllTodos = async () => {
  try {
    const response = await axios.get(TODO_API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createTodo = async (todoData: Todo) => {
  try {
    const response = await axios.post(TODO_API_URL, todoData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTodo = async (todoId: string) => {
  try {
    const response = await axios.delete(`${TODO_API_URL}/${todoId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const Completed = async () => {
  try {
    const response = await axios.get(`${TODO_API_URL}/completed`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const Incomplete = async () => {
  try {
    const response = await axios.get(`${TODO_API_URL}/incomplete`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const markComplete = async (todoId: string) => {
  try {
    const response = await axios.put(`${TODO_API_URL}/${todoId}/complete`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const PastWeek = async () => {
  try {
    const response = await axios.get(`${TODO_API_URL}/past-week`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// user login and signup

export const login = async (userData: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${USER_API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signup = async (userData: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${USER_API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export {};