import React from "react";
import { Outlet } from "react-router-dom";
import Page_Header from "../../../components/layout/header/Main_Header";

const Index = () => {
  const isSupplier = location.pathname.includes("supplier") ? true : false;
  return (
    <div className="main_grid">
      <Page_Header page={isSupplier ? "supplier" : "users"} />
      <Outlet />
    </div>
  );
};

export default Index;
