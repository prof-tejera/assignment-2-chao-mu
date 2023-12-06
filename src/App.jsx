import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Ours
import SiteLayout from "./views/SiteLayout.jsx";
import HomePage from "./views/HomePage.jsx";
import AddPage from "./views/AddPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SiteLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "add",
        element: <AddPage />,
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;
export default App;
