import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Landing from "../components/Landing";
import RegistrationModal from "../components/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      // {
      //   path: "/register",
      //   element: <RegistrationModal />,
      // },
    ],
  },
]);

export default router;
