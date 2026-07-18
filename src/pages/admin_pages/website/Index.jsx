import React from "react";
import Page_Layout from "../../../components/layout/Page_Layout";
import { Outlet } from "react-router-dom";

import Page_Header from "../../../components/layout/header/Page_Header";

const Index = () => {
  return (
    <Page_Layout page="website">
      <Page_Header title="website_title" />
      <Outlet />
    </Page_Layout>
  );
};

export default Index;
