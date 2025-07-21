import {
  createBrowserRouter,
} from "react-router";
import Home from "../components/Home/Home";
import HomeLayout from "../Layout/HomeLayout";
import Error from "../Error/Erro";
import About from "../components/ABout/About";
import AddItem from "../components/Add Items/AddItems";
import Login from "../components/Authentication/Login";
import Register from "../components/Authentication/Register";
import BrowsTask from "../components/Browser Task/BrowsTask";
import AUthentication from "../Layout/Authentication";
import MyTask from "../components/My posted Task/MyTask";
import PrivateRoute from "../Routers/PrivateRoute";


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
        element: <PrivateRoute><AddItem></AddItem></PrivateRoute>
      },
      {
        path:'/browser_task',
        element: <PrivateRoute><BrowsTask></BrowsTask></PrivateRoute>
      },
      {
        path: '/my_task',
        element:<PrivateRoute> <MyTask></MyTask></PrivateRoute>
      }
    ],
  },
  {
    path: '/auth',
    element:<AUthentication></AUthentication>,
    children:[
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path:'register',
        element: <Register></Register>
      }
    ]
  }
]);

export default router;