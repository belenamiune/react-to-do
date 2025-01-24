/* eslint-disable @typescript-eslint/no-explicit-any */
const TodoItem = ({
  todo,
  onDelete,
  onToggle,
}: {
  todo: any;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}) => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 rounded shadow">
      <span
        className={`flex-1 ${todo.completed ? "line-through text-gray-500" : ""}`}
        onClick={() => onToggle(todo.id)}
      >
        {todo.title}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
