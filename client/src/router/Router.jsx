import Dashboard from "@/pages/Dashboard";
import { createBrowserRouter } from "react-router";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard/>,
  },
]);