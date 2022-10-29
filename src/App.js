import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBarCustom from "./components/navigate/NavBarCustom";
import CompanyList from "./components/pages/company/CompanyList";
import CompanyForm from "./components/pages/company/CompanyFrom";
import Login from "./components/pages/Login";
import CompanyPoint from "./components/pages/companyPoint/CompanyPoint";
import PointForm from "./components/pages/companyPoint/PointForm";
import UserList from "./components/pages/users/UserList";
import UserForm from "./components/pages/users/UserForm";
import {setAuthToken} from './helpers/config'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {setDataUser} from './app/slices/userSlice'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role')
    setAuthToken(token)
    dispatch(setDataUser(role))
    
  }, []);

  return (
      <div className="App fst-italic">
        <BrowserRouter>
          <NavBarCustom />

          <Routes>
            {/* Company path */}
            <Route path="/company/list" element={<CompanyList />}></Route>
            <Route path="/company/create" element={<CompanyForm />}></Route>
            <Route path="/login" element={<Login />}></Route>
            {/* point path */}
            <Route
              path="/company/point/list/:id"
              element={<CompanyPoint />}
            ></Route>
            <Route
              path="/company/point/create/:nit"
              element={<PointForm />}
            ></Route>

            {/* path users */}
            <Route path="/users/list" element={<UserList />}></Route>
            <Route path="/users/create/:nit" element={<UserForm />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
