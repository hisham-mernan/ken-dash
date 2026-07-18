import React from "react";
import Page_Layout from "../../components/layout/Page_Layout";
import Stepper from "../../components/shared/stepper/Stepper";
import { Outlet, useParams } from "react-router-dom";
import {
  BillIconLinear,
  MicroScopeIcon,
  WaletIcon,
} from "../../assets/icons/Icon";

const Event_Container = () => {
  const { id } = useParams();

  const isEdit = id ? true : false;
  const steps = [
    {
      id: 1,
      Icon: MicroScopeIcon,
      title: "about_event",
      link: isEdit ? `/event/${id}/about` : "/event/about",
    },
    {
      id: 2,
      Icon: BillIconLinear,
      title: "activities_details",
      link: isEdit ? `/event/${id}/details` : null,
    },
    {
      id: 3,
      Icon: WaletIcon,
      title: "price_and_date",
      link: isEdit ? `/event/${id}/price-and-date` : null,
    },
  ];
  return (
    <Page_Layout page="events">
      <Stepper steps={steps} />
      <div className="flex flex-col flex-1 gap-11">{<Outlet />}</div>
    </Page_Layout>
  );
};

export default Event_Container;
