import {
  createBrowserRouter,
} from "react-router";
import Home from "../components/Home/Home";
import HomeLayout from "../Layout/HomeLayout";
import Error from "../Error/Erro";
import About from "../components/ABout/About";
import AddItem from "../components/Add Items/AddItems";


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
      },
      {
        path:'/about',
        Component:About
      },
      {
        path:'/add_items',
        element: <AddItem></AddItem>
      }
    ]
  },
]);

export default router;