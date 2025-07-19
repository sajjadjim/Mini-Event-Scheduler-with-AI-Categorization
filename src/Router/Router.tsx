import {
  createBrowserRouter,
} from "react-router";
import Home from "../components/Home/Home";


const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World</div>,
    children:[
        {
            index : true,
            Component : Home
        },
        {

        }
    ]
  },
]);

export default router ;