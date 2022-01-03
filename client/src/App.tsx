import './App.css';
import { BrowserRouter } from 'react-router-dom';
import {useRoutes} from './routes'
import {useAppSelector} from "../../client/src/hooks/redux"
import { useEffect } from 'react';
import { authSlice } from "../src/store/redusers/authReducer";



function App() {
  const isAuth = useAppSelector(state => state.authReducer.isAuth)
  console.log(isAuth)
  
  
  const routes = useRoutes(isAuth)
  return (
    <BrowserRouter>
    <div className="App">
     {routes}
    </div>
    </BrowserRouter>
  );
}

export default App;
