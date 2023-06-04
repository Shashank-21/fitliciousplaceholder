import {
  createRoutesFromElements,
  RouterProvider,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import HomePage from "./pages/homepage";
import NavigationPage from "./pages/NavigationPage";
import RegisterPage from "./pages/RegisterPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "./store";
import BusinessRegisterPage from "./pages/BusinessRegisterPage";
import DashboardPreparationPage from "./pages/DashboardPreparationPage";
import DashboardPage from "./pages/DashboardPage";
import MiddlePage from "./pages/MiddlePage";


function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    const currentUser = localStorage.getItem('user');
    dispatch(loginUser(JSON.parse(currentUser)));
  },[dispatch])
  const routeFromElements = createRoutesFromElements(
    <Route path='/' element={<NavigationPage />}>
      <Route index element={<HomePage />} />
      <Route path='register'>
        <Route index element={<RegisterPage />}/>
        <Route path='business-details' element={<BusinessRegisterPage />} />
      </Route>
      <Route path='dashboard'>
        <Route index element = {<DashboardPreparationPage />}/>
        <Route path='middle' element = {<MiddlePage />}/>
        <Route path=':userId' element = {<DashboardPage />}/>
      </Route>
    </Route>
  );
  const router = createBrowserRouter(routeFromElements);

  return <RouterProvider router={router} />;
}

export default App;
