import { lazy } from "react";

export * from "./ResetPassword";
export const Privacy = lazy(() =>
  import("./PrivacyPolicy").then(module => {
    return { default: module.Privacy };
  })
);
export const FAQ = lazy(() => import("./FAQ"));
export const Team = lazy(() => import("./Team"));
export const Terms = lazy(() => import("./Terms"));
export const Error = lazy(() => import("./Error"));
export const Career = lazy(() => import("./Career"));
export const AboutUs = lazy(() => import("./AboutUs"));
export const Preview = lazy(() => import("./Preview"));
export const Pricing = lazy(() => import("./Pricing"));
export const EditBulk = lazy(() => import("./EditBulk"));
export const Checkout = lazy(() => import("./Checkout"));
export const Dashboard = lazy(() => import("./Dashboard"));
export const Templates = lazy(() => import("./Templates"));
export const ContactUs = lazy(() => import("./contactUs"));
export const UploadCSV = lazy(() => import("./UploadCSV"));
export const ComingSoon = lazy(() => import("./ComingSoon"));
export const BulkStep = lazy(() => import("./Home/BulkStep"));
export const ProfilePage = lazy(() => import("./ProfilePage"));
export const BulkPreview = lazy(() => import("./BulkPreview"));
export const Layout = lazy(() => import("../Component/Layout"));
export const SinglePreview = lazy(() => import("./SinglePreview"));
export const Generate = lazy(() => import("./Dashboard/Generate"));
export const Certificate = lazy(() => import("./Home/Certificate"));
export const Choice = lazy(() => import("./Choice(single or bulk)"));
export const GroupCollection = lazy(() => import("./GroupCollection"));

export const Home = lazy(() => import("./Home"));
