import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Ours
import SiteLayout from "./views/SiteLayout.jsx";
import HomePage from "./views/HomePage.jsx";
import AddPage from "./views/AddPage.jsx";
import DocumentationPage from "./views/DocumentationPage.jsx";

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
      {
        path: "docs",
        element: <DocumentationPage />,
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;
export default App;
