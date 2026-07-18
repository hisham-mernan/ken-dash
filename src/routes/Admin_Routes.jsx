import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// _________________________ admin route _____________________-

//Order

const Order_Details = lazy(() =>
  import("../components/shared/order/Order_Details")
);

// qr
const Admin_Qr_List = lazy(() => import("../pages/admin_pages/qr/Qr_List"));
const Admin_Qr_Scannar = lazy(() =>
  import("../pages/admin_pages/qr/Qr_Scanner")
);

// user
const Admin_User_Container = lazy(() =>
  import("../pages/admin_pages/users/Index")
);
const Admin_User_List = lazy(() =>
  import("../pages/admin_pages/users/User_List")
);
const Admin_User_Crud = lazy(() =>
  import("../pages/admin_pages/users/Crud_User")
);

// huts
const Hut_List = lazy(() => import("../pages/admin_pages/hut/Hut_List"));
const Hut_Container = lazy(() =>
  import("../pages/admin_pages/hut/Hut_Managment_Container")
);
const Hut_Details = lazy(() => import("../pages/admin_pages/hut/Hut_Details"));
const Hut_About = lazy(() => import("../pages/admin_pages/hut/Hut_About"));
const Hut_Price = lazy(() => import("../pages/admin_pages/hut/Hut_Price"));

// Ken special items
const Ken_Special_Items_List = lazy(() =>
  import("../pages/product/Product_List")
);
const Ken_Special_Items_Managment = lazy(() =>
  import("../pages/product/Product_Managment")
);

//product
const Product_List = lazy(() => import("../pages/product/Product_List"));
const Product_Managment = lazy(() =>
  import("../pages/product/Product_Managment")
);
// feedback
const Feedback_List = lazy(() =>
  import("../pages/admin_pages/feedback/Feedback")
);

// website
const Website_container = lazy(() =>
  import("../pages/admin_pages/website/Index")
);
const Website_Route = lazy(() =>
  import("../pages/admin_pages/website/Website")
);
const Website_About = lazy(() =>
  import("../pages/admin_pages/website/about/About")
);
const Website_About_Crud = lazy(() =>
  import("../pages/admin_pages/website/about/About_Crud")
);
const Website_Terms_Layout = lazy(() =>
  import("../pages/admin_pages/website/terms_description/Terms_Layout")
);
const Website_Terms_Descriptoin_view = lazy(() =>
  import("../pages/admin_pages/website/terms_description/Terms_Description")
);
const Website_Terms_Descriptoin_Crud = lazy(() =>
  import(
    "../pages/admin_pages/website/terms_description/Terms_Description_Managment"
  )
);

// content
const Website_Content = lazy(() =>
  import("../pages/admin_pages/website/content_management/Content_Management")
);
const Website_Content_Crud = lazy(() =>
  import(
    "../pages/admin_pages/website/content_management/Content_Management_Crud"
  )
);

// 404
const Page_Not_Found = lazy(() => import("../pages/404/Page_Nout_Found"));

const Admin_Routes = () => {
  return (
    <Routes>
      {" "}
      <Route path="supplier" element={<Admin_User_Container />}>
        <Route index element={<Admin_User_List />} />
        <Route path=":role/create" element={<Admin_User_Crud />} />
        <Route path=":role/:id/edit" element={<Admin_User_Crud />} />
      </Route>
      <Route path="users" element={<Admin_User_Container />}>
        <Route index element={<Admin_User_List />} />
        <Route path=":role/create" element={<Admin_User_Crud />} />
        <Route path=":role/:id/edit" element={<Admin_User_Crud />} />
      </Route>
      {/* hut */}
      <Route path="huts">
        <Route index element={<Hut_List />} />
        <Route element={<Hut_Container />}>
          <Route path="about" element={<Hut_About />} />
          <Route path=":id/about" element={<Hut_About />} />
          <Route path=":id/details" element={<Hut_Details />} />
          <Route path=":id/prices" element={<Hut_Price />} />
        </Route>
      </Route>
      {/* Special items */}
      <Route path="special-items">
        <Route index element={<Ken_Special_Items_List />} />
        <Route path="create" element={<Ken_Special_Items_Managment />} />
        <Route path=":id/edit" element={<Ken_Special_Items_Managment />} />

        <Route path="product">
          <Route index element={<Product_List />} />
          <Route path="create" element={<Product_Managment />} />
          <Route path=":id/edit" element={<Product_Managment />} />
        </Route>
      </Route>
      {/* qr */}
      <Route path="qr">
        <Route index element={<Admin_Qr_List />} />
        <Route path="scannar" element={<Admin_Qr_Scannar />} />
        <Route path=":id/details" element={<Order_Details />} />
      </Route>
      {/* feebacks */}
      <Route path="feadback" element={<Feedback_List />} />
      {/* webiste */}
      <Route path="website" element={<Website_container />}>
        <Route index element={<Website_Route />} />
        {/* about */}
        <Route path="about">
          <Route index element={<Website_About />} />
          <Route path="create" element={<Website_About_Crud />} />
          <Route path=":id/edit" element={<Website_About_Crud />} />
        </Route>
        {/* ken story */}
        <Route path="ken-story">
          <Route index element={<Website_Content />} />
          <Route path="create" element={<Website_Content_Crud />} />
          <Route path=":id/edit" element={<Website_Content_Crud />} />
        </Route>

        {/* terms and conditions */}
        <Route path="terms-and-conditions">
          <Route index element={<Website_Terms_Layout />} />
          <Route path="overview">
            <Route index element={<Website_Terms_Descriptoin_view />} />
            <Route path="create" element={<Website_Terms_Descriptoin_Crud />} />
            <Route
              path=":id/edit"
              element={<Website_Terms_Descriptoin_Crud />}
            />
          </Route>
          <Route path="terms">
            <Route index element={<Website_Content />} />
            <Route path="create" element={<Website_Content_Crud />} />
            <Route path=":id/edit" element={<Website_Content_Crud />} />
          </Route>
        </Route>
        {/* faq */}
        <Route path="faq">
          <Route index element={<Website_Content />} />
          <Route path="create" element={<Website_Content_Crud />} />
          <Route path=":id/edit" element={<Website_Content_Crud />} />
        </Route>
        {/* our services */}
        <Route path="our-services">
          <Route index element={<Website_Content />} />
          <Route path="create" element={<Website_Content_Crud />} />
          <Route path=":id/edit" element={<Website_Content_Crud />} />
        </Route>
        {/* Special about us */}
        <Route path="special-about-us">
          <Route index element={<Website_Content />} />
          <Route path="create" element={<Website_Content_Crud />} />
          <Route path=":id/edit" element={<Website_Content_Crud />} />
        </Route>
      </Route>
      <Route path="*" element={<Page_Not_Found />} />
    </Routes>
  );
};

export default Admin_Routes;
