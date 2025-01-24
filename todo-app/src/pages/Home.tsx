/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import TodoItem from "../components/toDoItem";

const Home = () => {
  const [todos, setTodos] = useState<any[]>([]); // Estado local para las tareas
  const [newTask, setNewTask] = useState(""); // Para manejar el input de nuevas tareas

  // Función para agregar una nueva tarea
  const addTodo = () => {
    if (newTask.trim() === "") return;
    const newTodo = {
      id: Date.now(), // Generar un ID único basado en la fecha
      title: newTask,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setNewTask(""); // Limpiar el input
  };

  // Función para eliminar una tarea
  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Función para marcar una tarea como completada
  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">To-Do List</h1>

      {/* Input para agregar nuevas tareas */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="p-2 border rounded flex-1"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      {/* Lista de tareas */}
      <div className="space-y-4">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={deleteTodo}
              onToggle={toggleTodo}
            />
          ))
        ) : (
          <p className="text-gray-500">No tasks added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
