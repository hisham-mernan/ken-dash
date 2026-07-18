import React from "react";
import Main_Header from "./header/Main_Header";

const Page_Layout = ({ page, children, containerClassName }) => {
  return (
    <section className="main_grid">
      <Main_Header page={page} />
      <div
        className={`page main_p overflow-x-hidden flex flex-col gap-7 ${
          containerClassName ?? ""
        } `}
      >
        {children}
      </div>
    </section>
  );
};

export default Page_Layout;
