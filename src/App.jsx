import Cookies from "js-cookie";
import React, { lazy, Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { currentLanguageCode, switchLang } from "./utils/switchLang";
import { useAuth } from "./context/Auth_Context";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { landingUrl } from "./constant/urls";
import { getUserRole } from "./utils/auth";

// routes

const Protected_Routes = lazy(() => import("./routes/Protected_Route"));
const Admin_Routes = lazy(() => import("./routes/Admin_Routes"));
// Layouts

const App_Layout = lazy(() => import("./layout/App_Layout"));
const Home = lazy(() => import("./pages/home/Home"));

//product
const Product_List = lazy(() => import("./pages/product/Product_List"));
const Product_Managment = lazy(() =>
  import("./pages/product/Product_Managment")
);
// events
const Event_List = lazy(() => import("./pages/event/Event_List"));
const Event_Container = lazy(() => import("./pages/event/Event_Container"));
const Event_About = lazy(() => import("./pages/event/About_Event"));
const Event_Details = lazy(() => import("./pages/event/Event_Details"));
const Event_Price_And_Date = lazy(() =>
  import("./pages/event/Event_Price_And_Date")
);

//Order
const Order_List = lazy(() => import("./pages/order/Order_List"));
const Order_Details = lazy(() =>
  import("./components/shared/order/Order_Details")
);

// bill
const Bill_List = lazy(() => import("./pages/billing/Billing"));

// support
const Support_List = lazy(() => import("./pages/support/Support_List"));
const Support_Reply = lazy(() => import("./pages/support/Support_Reply"));

// notification
const Notification = lazy(() => import("./pages/notification/Notification"));

// 404
const Page_Not_Found = lazy(() => import("./pages/404/Page_Nout_Found"));

// Languagesimport { landingUrl } from './constant/urls';

const languages = [
  { code: "en", name: "English", country_code: "gb", dir: "ltr" },
  { code: "ar", name: "العربية", country_code: "sa", dir: "rtl" },
];

const App = () => {
  const { t } = useTranslation();
  const { token, login, user } = useAuth();
  const role = getUserRole();
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

  // Set page direction and language cookie
  useEffect(() => {
    document.body.dir = currentLanguage?.dir || "ltr";
    Cookies.set("i18next", currentLanguageCode);
  }, [currentLanguage, t]);
  const allowedUsers = ["supplier", "admin"];
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const tokenFromUrl = params.get("token");
    const roleFromUrl = params.get("role");

    if (tokenFromUrl && roleFromUrl && allowedUsers.includes(roleFromUrl)) {
      login({ token: tokenFromUrl, role: roleFromUrl });

      params.delete("token");
      params.delete("role");

      const newSearch = params.toString();
      const newUrl = `/${newSearch ? `?${newSearch}` : ""}`;
      window.history.replaceState({}, "", newUrl);
    } else {
      if (
        !localStorage.getItem("ken_token") ||
        !allowedUsers.includes(localStorage.getItem("ken_role"))
      ) {
        location.href = `${landingUrl}account/login`;
      }
    }
  }, [allowedUsers, login, token]);
  return (
    <Suspense>
      <Routes location={location} key={location.pathname}>
        {(role === "admin" || role === "supplier") && token && (
          <Route path="/" element={<App_Layout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<Home />} />

            <Route
              path="/admin/*"
              element={
                <Protected_Routes role="admin">
                  <Admin_Routes />
                </Protected_Routes>
              }
            />

            <Route path="product">
              <Route index element={<Product_List />} />
              <Route path="create" element={<Product_Managment />} />
              <Route path=":id/edit" element={<Product_Managment />} />
            </Route>
            <Route path="orders">
              <Route index element={<Order_List />} />
              <Route path=":id/details" element={<Order_Details />} />
            </Route>

            {/* billing */}
            <Route path="bill" element={<Bill_List />} />
            {/* events */}
            <Route path="event">
              <Route index element={<Event_List />} />
              <Route element={<Event_Container />}>
                <Route path="about" element={<Event_About />} />
                <Route path=":id/about" element={<Event_About />} />
                <Route path=":id/details" element={<Event_Details />} />
                <Route
                  path=":id/price-and-date"
                  element={<Event_Price_And_Date />}
                />
              </Route>
            </Route>

            {/* support */}
            <Route path="support">
              <Route index element={<Support_List />} />
              <Route path=":id/reply" element={<Support_Reply />} />
            </Route>

            <Route path="notification" element={<Notification />} />
            <Route path="*" element={<Page_Not_Found />} />
          </Route>
        )}
        <Route path="*" element={<Page_Not_Found />} />
      </Routes>
    </Suspense>
  );
};

export default App;
