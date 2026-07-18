import React from "react";
import Page_Layout from "../../../components/layout/Page_Layout";
import { BillIconLinear, HutIcon, WaletIcon } from "../../../assets/icons/Icon";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Stepper from "../../../components/shared/stepper/Stepper";

const Hut_Managment_Container = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const isEdit = id ? true : false;
  const steps = [
    {
      id: 1,
      Icon: HutIcon,
      title: "about_hut",
      link: isEdit ? `/admin/huts/${id}/about` : "/admin/huts/about",
    },
    {
      id: 2,
      Icon: BillIconLinear,
      title: "details",
      link: isEdit ? `/admin/huts/${id}/details` : null,
    },
    {
      id: 3,
      Icon: WaletIcon,
      title: "prices",
      link: isEdit ? `/admin/huts/${id}/prices` : null,
    },
  ];

  return (
    <Page_Layout page="huts">
      <Stepper steps={steps} />
      <div className="flex flex-col flex-1 gap-11">{<Outlet />}</div>
    </Page_Layout>
  );
};

export default Hut_Managment_Container;
