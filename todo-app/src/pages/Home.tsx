import { useEffect, useState } from "react";
import { fetchTodos, addTodo, deleteTodo, updateTodo } from "../services/toDoApi";
import { Link } from "react-router-dom";

const Home = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editedTask, setEditedTask] = useState("");

  useEffect(() => {
    const getTodos = async () => {
      setLoading(true);
      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (error) {
        setError("Failed to load tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getTodos();
  }, []);

  const handleAddTodo = async () => {
    if (newTask.trim() === "") {
      setError("Task title cannot be empty.");
      return;
    }

    setError(null);
    const newTodo = {
      title: newTask,
      completed: false,
    };

    try {
      const addedTodo = await addTodo(newTodo);
      setTodos((prevTodos) => [...prevTodos, addedTodo]);
      setNewTask("");
    } catch (error) {
      setError("Failed to add task. Please try again.");
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      setError("Failed to delete task. Please try again.");
    }
  };

  const handleToggleTodo = async (id: number, completed: boolean) => {
    const updatedTodo = { completed: !completed };

    try {
      const updatedData = await updateTodo(id, updatedTodo);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: updatedData.completed } : todo
        )
      );
    } catch (error) {
      setError("Failed to update task. Please try again.");
    }
  };

  const handleSaveEdit = async () => {
    if (editedTask.trim() === "") {
      setError("Task title cannot be empty.");
      return;
    }

    setError(null);
    if (editingTodoId !== null) {
      const updatedTodo = { title: editedTask };

      try {
        const updatedData = await updateTodo(editingTodoId, updatedTodo);
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === editingTodoId ? { ...todo, title: updatedData.title } : todo
          )
        );
        setEditingTodoId(null);
        setEditedTask("");
      } catch (error) {
        setError("Failed to update task. Please try again.");
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">To-Do List</h1>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded">
          {error}
        </div>
      )}

      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="p-2 border rounded flex-1 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading tasks...</div>
      ) : (
        <div className="space-y-4">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <div key={todo.id} className="flex justify-between items-center p-4 rounded shadow dark:shadow-gray-500">
                {editingTodoId === todo.id ? (
                  <div className="flex items-center gap-4 flex-1">
                    <input
                      type="text"
                      value={editedTask}
                      onChange={(e) => setEditedTask(e.target.value)}
                      className="p-2 border rounded flex-1 dark:bg-gray-800 dark:border-gray-600"
                    />
                    <button
                      onClick={handleSaveEdit}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingTodoId(null);
                        setEditedTask("");
                      }}
                      className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <span
                      className={`flex-1 ${
                        todo.completed ? "line-through text-gray-500" : ""
                      } cursor-pointer`}
                      onClick={() => handleToggleTodo(todo.id, todo.completed)}
                    >
                       <Link to={`/todo/${todo.id}`} className="hover:underline">
                       
                      {todo.title}
                       </Link>
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingTodoId(todo.id);
                          setEditedTask(todo.title);
                        }}
                        className="bg-yellow-500  text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="px-3 py-1 rounded bg-red-500 dark:bg-red-700 text-white hover:bg-red-600 dark:hover:bg-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No tasks available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
