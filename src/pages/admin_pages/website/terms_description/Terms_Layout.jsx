import React from "react";
import Website_Navigation_Item from "../component/Website_Navigation_Item";

const list = [
  { title: "terms_description", to: "overview" },
  { title: "terms", to: "terms" },
];
const Terms_Layout = () => {
  return <Website_Navigation_Item list={list} />;
};

export default Terms_Layout;
