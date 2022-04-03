import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom'
import { BlogPage } from "./pages/BlogPage";
import { HomePage } from "./pages/HomePage";
import { PortfolioPage } from "./pages/PortfolioPage";
import {LoginPage} from '../src/pages/LoginPage/LoginPage'
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { Header } from "./components/Header/Header";

export const useRoutes = (isAuth:boolean) =>{
    console.log(isAuth)
//   if (isAuth){
      return(
          <>
          <Header auth={isAuth}/>
      <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/blog" element={<BlogPage/>}/>
          <Route path="/portfolio" element={<PortfolioPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
      </Routes>
      </>
      )
}

//   } else return(
//       <Routes>
//            <Route path="/" element={<HomePage/>}/>
//       </Routes>
//   )
// }