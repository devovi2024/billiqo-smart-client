import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Invoices from "../pages/Invoices";
import Customers from "../pages/Customers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/invoices",
    element: <Invoices />,
  },
  {
    path: "/customers",
    element: <Customers />,
  },
]);

export default router;