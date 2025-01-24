import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import TaskDetails from "./pages/TaskDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/task/:id",
    element: <TaskDetails />,
  },
]);

export default router;
