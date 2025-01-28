import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTodos, updateTodo } from "../services/toDoApi";

const TodoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTodo = async () => {
      try {
        const todos = await fetchTodos();
        const foundTodo = todos.find((t: any) => t.id === Number(id));
        if (!foundTodo) {
          setError("Task not found.");
        } else {
          setTodo(foundTodo);
        }
      } catch (error) {
        setError("Failed to load task.");
      } finally {
        setLoading(false);
      }
    };

    getTodo();
  }, [id]);

  const handleToggleStatus = async () => {
    if (!todo) return;

    try {
      const updatedData = await updateTodo(todo.id, { completed: !todo.completed });
      setTodo((prevTodo: any) => ({ ...prevTodo, completed: updatedData.completed }));
    } catch (error) {
      setError("Failed to update status.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Task Details</h1>
      {todo && (
        <div className="p-4 border rounded bg-gray-100 dark:bg-gray-800">
          <h2 className="text-xl font-semibold">{todo.title}</h2>
          <p className="mt-2">
            Status:{" "}
            <span className={todo.completed ? "text-green-500" : "text-red-500"}>
              {todo.completed ? "Completed" : "Pending"}
            </span>
          </p>
          <button
            onClick={handleToggleStatus}
            className={`mt-4 px-4 py-2 rounded text-white ${
              todo.completed ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {todo.completed ? "Mark as Pending" : "Mark as Completed"}
          </button>
        </div>
      )}
      <button
        onClick={() => navigate(-1)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go Back
      </button>
    </div>
  );
};

export default TodoDetails;
