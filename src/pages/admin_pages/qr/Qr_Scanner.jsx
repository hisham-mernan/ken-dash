import React, { useState } from "react";
import Page_Layout from "../../../components/layout/Page_Layout";
import Page_Header from "../../../components/layout/header/Page_Header";

import Scanner from "./Scanner";
import Qr_Logs_Table from "../../../components/shared/qr_logs_table/Qr_Logs_Table";

import { CheckInOutIcon } from "../../../assets/images/Image";
import Tabs from "../../../components/shared/tabs/Tabs";

const list = [
  {
    value: "check_in",
    title: "check_in",
    des: "user_check_in",
    img: CheckInOutIcon,
  },
  {
    value: "check_out",
    title: "check_out",
    des: "user_check_out",
    img: CheckInOutIcon,
  },
];
const Qr_Scanner = () => {
  const [filter, setFilter] = useState({ status: "check_in" });

  return (
    <Page_Layout page="qr">
      <Page_Header title="scan_qr_code" />
      <Tabs
        list={list}
        variant="equal"
        filter={filter}
        setFilter={setFilter}
        field="status"
      />
      <div>
        <Scanner filter={filter} />
      </div>
      <Qr_Logs_Table />
    </Page_Layout>
  );
};

export default Qr_Scanner;
