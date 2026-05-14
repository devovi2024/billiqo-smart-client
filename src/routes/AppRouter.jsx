import { createBrowserRouter } from "react-router-dom";

import App from "../App";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

import ProtectedRoute from "./ProtectedRoute";

import Dashboards from "../pages/Dashboards";
import Invoices from "../pages/Invoices";
import Customers from "../pages/Customers";
import Transactions from "../pages/Transactions";
import Analytics from "../pages/Analytics";
import AIInsights from "../pages/AIInsights";
import Settings from "../pages/Settings";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <App />,
        children: [
          {
            path: "/",
            element: <Dashboards />,
          },
          {
            path: "invoices",
            element: <Invoices />,
          },
          {
            path: "customers",
            element: <Customers />,
          },
          {
            path: "transactions",
            element: <Transactions />,
          },
          {
            path: "analytics",
            element: <Analytics />,
          },
          {
            path: "ai-insights",
            element: <AIInsights />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
]);

export default router;