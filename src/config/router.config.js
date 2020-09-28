import { lazy } from "react";
import BasicLayout from "../layout/BasicLayout";
import LoginLayout from "../layout/LoginLayout";
import Notfound from "../pages/404Page";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import ForgotPassword from "../pages/ForgotPassword";
import ComingSoon from "../pages/ComingSoon";
const SingleChannel = lazy(() => import("../pages/SingleChannel"));
// const Contact = lazy(() => import("../pages/Contact"));
const Home = lazy(() => import("../pages/Home"));
const Profile = lazy(() => import("../pages/Profile"));
const TopRated = lazy(() => import("../pages/TopRated"));
const MostPopular = lazy(() => import("../pages/MostPopular"));
const Detail = lazy(() => import("../pages/Detail"));
const HistoryPoint = lazy(() => import("../pages/HistoryPoint"));
const HistoryExchanges = lazy(() => import("../pages/HistoryExchanges"));
const ResultSearch = lazy(() => import("../pages/ResultSearch"));
const SocialMedia = lazy(() => import("../pages/SocialMedia"));

const routes = [
  {
    path: "/",
    exact: true,
    layout: BasicLayout,
    component: Home,
  },
  {
    path: "/top-rated",
    exact: true,
    layout: BasicLayout,
    component: TopRated,
  },
  {
    path: "/result-search",
    exact: true,
    layout: BasicLayout,
    component: ResultSearch,
  },
  {
    path: "/most-popular",
    exact: true,
    layout: BasicLayout,
    component: MostPopular,
  },
  {
    path: "/channel/:id",
    exact: true,
    layout: BasicLayout,
    component: SingleChannel,
  },
  {
    path: "/detail/:id",
    exact: true,
    layout: BasicLayout,
    component: Detail,
  },
  {
    path: "/history-exchange",
    exact: true,
    layout: BasicLayout,
    component: HistoryExchanges,
  },
  {
    path: "/history-point",
    exact: true,
    layout: BasicLayout,
    component: HistoryPoint,
  },
  {
    path: "/manage-video",
    exact: true,
    layout: BasicLayout,
    component: SocialMedia,
  },
  {
    path: "/contact",
    exact: true,
    layout: BasicLayout,
    component: ComingSoon,
  },
  {
    path: "/profile",
    exact: true,
    layout: BasicLayout,
    component: Profile,
  },
  {
    path: "/signin",
    exact: true,
    layout: LoginLayout,
    component: SignIn,
  },
  {
    path: "/signup",
    exact: true,
    layout: LoginLayout,
    component: SignUp,
  },
  {
    path: "/forgot-password",
    exact: true,
    layout: LoginLayout,
    component: ForgotPassword,
  },
  {
    path: "",
    exact: false,
    layout: BasicLayout,
    component: Notfound,
  },
];

export default routes;
