import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom'
import { BlogPage } from "./pages/BlogPage";
import { HomePage } from "./pages/HomePage";
import { PortfolioPage } from "./pages/PortfolioPage";


export const useRoutes = (isAuth:boolean) =>{
  if (isAuth){
      return(
      <Routes>
          <Route path="/" element={<BlogPage/>}/>
          <Route path="/portfolio" element={<PortfolioPage/>}/>
      </Routes>
      )

  } else return(
      <Routes>
           <Route path="/" element={<HomePage/>}/>
      </Routes>
  )
}