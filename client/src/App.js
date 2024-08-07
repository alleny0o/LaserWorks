import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AdminLayout from './layouts/AdminLayout';
import MainScreen from "./screens/Admin/MainScreen/MainScreen";
import CreateProductScreen from "./screens/Admin/CreateProduct/CreateProductScreen";
import CategoriesScreen from "./screens/Admin/CategoriesScreen/CategoriesScreen";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AdminLayout/>}>
        <Route path="/admin" element={<MainScreen />}></Route>
        <Route path="/admin/create-product" element={<CreateProductScreen/>} />
        <Route path="/admin/categories" element={<CategoriesScreen />}/>
      </Route>

    </>
  )
)

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  )
}

export default App;
