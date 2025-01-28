import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const fetchTodos = async () => {
  const response = await axios.get(`${API_URL}?_limit=10`); 
  return response.data;
};

export const deleteTodo = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};


export const updateTodo = async (id: number, updatedTodo: any) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedTodo);
  return response.data;
};


export const addTodo = async (newTodo: any) => {
  const response = await axios.post(API_URL, newTodo);
  return response.data;
};
