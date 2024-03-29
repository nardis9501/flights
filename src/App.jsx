import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/Home/HomePage";
import FlightsPage from "./pages/Flifhts/FlightsPage";
// import NotFound from "./pages/NotFound/NotFound";
import BadRequestPage from "./pages/BadRequestPage/BadRequestPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path={"/flights"} element={<FlightsPage />} />
            <Route path="/bad-request" element={<BadRequestPage />} />
            {/* <Route path="*" component={<NotFound />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
