import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "../components/modals/SignUpModal";
import Home from '../pages/home/Home';

export default function MainRoutes() {
  return (
    <div>
      <Routes>
        {/* main App routing */}
        <Route index path="/" element={<Home />} />
        {/* <Route index path="/signup" element={<SignUp />} /> */}
      </Routes>
    </div>
  );
}
