const TodoItem = ({
  todo,
  onDelete,
  onToggle,
}: {
  todo: any;
  onDelete: (id: number) => void;
  onToggle: (id: number, completed: boolean) => void;
}) => {
  return (
    <div className={`flex justify-between items-center p-4 rounded-lg shadow-md 
      ${todo.completed ? "bg-green-100 dark:bg-green-800" : "bg-green-100 dark:bg-gray-800"}
      text-gray-900 dark:text-green-100`}>
      <span
         className={`flex-1 cursor-pointer ${
          todo.completed ? "line-through text-gray-500 dark:text-gray-400" : ""
        }`}
        onClick={() => onToggle(todo.id, todo.completed)}
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
