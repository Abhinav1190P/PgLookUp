import { lazy } from "react";
import Loadable from "../Loadable";
import UserLayout from "@components/layouts/user";
import AuthGuard from "../AuthGuard";
import PropertyDetails from "@pages/user/PropertyDetails";
import ContactForm from "@pages/user/Contact";
const Profile = Loadable(lazy(() => import("@pages/user/Profile")));
const Dashboard = Loadable(lazy(() => import("@pages/user/Dashboard")));
const Listings = Loadable(lazy(() => import('@pages/user/Listings')))


const UserRoutes = {
  element: (
    <AuthGuard allowRole="user">
      <UserLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: "user/dashboard",
      element: <Dashboard />,
    },
    {
      path: "user/profile",
      element: <Profile />,
    },
    {
      path: "user/listings",
      element: <Listings />,
    },
    {
      path: "user/listings/:id",
      element: <PropertyDetails />
    },
    {
      path:"user/contact",
      element: <ContactForm/>
    }
  ],
};

export default UserRoutes;
