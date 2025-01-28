import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchTodos } from "../services/toDoApi";

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState<any | null>(null);

  useEffect(() => {
    const getTask = async () => {
      const data = await fetchTodos();
      const foundTask = data.find((todo: any) => todo.id === Number(id));
      setTask(foundTask);
    };

    getTask();
  }, [id]);

  if (!task) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Task Details</h1>
      <p className="text-lg">
        <strong>Title:</strong> {task.title}
      </p>
      <p className="text-lg">
        <strong>Status:</strong>{" "}
        {task.completed ? "Completed" : "Not Completed"}
      </p>
    </div>
  );
};

export default TaskDetails;
