import { createBrowserRouter } from "react-router-dom";

import App from "../App";

import Dashboard from "../pages/Dashboard";
import Invoices from "../pages/Invoices";
import Customers from "../pages/Customers";
import Transactions from "../pages/Transactions";
import Analytics from "../pages/Analytics";
import AIInsights from "../pages/AIInsights";
import Settings from "../pages/Settings";
import Dash from "../pages/Dash";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
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
      {
        path: "dash",
        element: <Dash/>
      }
    ],
  },
]);

export default router;