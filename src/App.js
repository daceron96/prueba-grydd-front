import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBarCustom from "./components/navigate/NavBarCustom";
import Company from "./components/pages/Company";
import Login from "./components/pages/Login";
import CompanyPoint from "./components/pages/CompanyPoint";
import UserList from "./components/pages/User";
import PersonDetail from './components/pages/PersonDetail'
import {setAuthToken} from './helpers/config'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {setDataUser} from './app/slices/userSlice'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'))
    if(user !== null){
      dispatch(setDataUser(user))
    }
    setAuthToken(token)
    
  }, []);

  return (
      <div className="App fst-italic">
        <BrowserRouter>
          <NavBarCustom />

          <Routes>
            <Route path="/company/list" element={<Company />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route
              path="/company/point/list/:nit"
              element={<CompanyPoint />}
            ></Route>
            
            <Route path="/users/list/:nit" element={<UserList />}></Route>
            <Route path="/users/detail" element={<PersonDetail />}></Route> 
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
