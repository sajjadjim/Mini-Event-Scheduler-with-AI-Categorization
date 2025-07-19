import {
  createBrowserRouter,
} from "react-router";
import Home from "../components/Home/Home";
import HomeLayout from "../Layout/HomeLayout";
import Error from "../Error/Erro";


const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/*',
        Component: Error,
      }
    ]
  },
]);

export default router;