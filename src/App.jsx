import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Link,BrowserRouter, Routes, Route, } from "react-router-dom";
import CountryList from "./Pages/CountryList";
import CountryDetails from "./Pages/CountryDetails";
import { CountryProvider } from "./Context/CountryContext";


function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CountryList />} />
          <Route path="/country/:name" element={<CountryDetails />} />
          <Route path="*" element={<CountryList />} />
        </Routes>
      </BrowserRouter>

     
    </>
  );
}

export default App;
