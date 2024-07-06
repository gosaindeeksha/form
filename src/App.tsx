// import { useState } from 'react'

import { Routes, Route } from "react-router-dom";
import Signin from "./components/Signin";
import SuccessPage from "./components/Success";
import './index.css';


function App() {

  return (
    <Routes>
    <Route path="/" element={<Signin />} />
    <Route path="/success" element={<SuccessPage />} />
  </Routes>
  )
}

export default App
