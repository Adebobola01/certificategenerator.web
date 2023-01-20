import * as Sentry from "@sentry/react";
import { Route, Routes } from "react-router-dom";
import { useState, lazy, Suspense } from "react";

import {
  AboutUs,
  BulkStep,
  BulkPreview,
  Career,
  Choice,
  ComingSoon,
  ContactUs,
  Dashboard,
  EditBulk,
  Error,
  FAQ,
  Layout,
  Pricing,
  Preview,
  Team,
  Templates,
  Terms,
  ProfilePage,
  UploadCSV,
  ChangePassword,
  ForgotPassword,
  PasswordLinkSent,
  ResetPassword,
  PasswordChangeSuccessfully,
  Home,
  Privacy,
  Checkout,
  Generate
} from "./pages";
import "./Style/App.scss";
import Certificate from "./pages/Home/Certificate";
import GroupCollection from "./pages/GroupCollection";
import CollectionFiles from "./pages/CollectionFiles";
import { DashboardContainer, LazyLoader } from "./Component";
import { IsAuthProtectedRoutes } from "./Component/ProtectedRoutes";

const Login = lazy(() => import("./Component/Auth/Login"));
const Signup = lazy(() => import("./Component/Auth/Signup"));
const ProtectedRoutes = lazy(() => import("./Component/ProtectedRoutes"));

function App() {
  const [amount, setAmount] = useState(2.99);
  const [per, setPer] = useState("month");
  const [header, setHeader] = useState("More features customised for you");
  const [type, setType] = useState("Standard");
  const [text, setText] = useState("Everything in Basic +");
  const [subText, setSubText] = useState([]);

  function amountHandler(type, price, per, header, text, subText) {
    setType(type);
    setAmount(price);
    setPer(per);
    setHeader(header);
    setText(text);
    setSubText(subText);
  }
  return (
    <>
      <div className="App">
        <Layout>
          <Routes>
            <Route
              path="/"
              index
              element={
                <Suspense fallback={<LazyLoader />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/signup"
              element={
                <IsAuthProtectedRoutes>
                  <Suspense fallback={<LazyLoader />}>
                    <Signup />
                  </Suspense>
                </IsAuthProtectedRoutes>
              }
            />
            <Route
              path="/login"
              element={
                <IsAuthProtectedRoutes>
                  <Suspense fallback={<LazyLoader />}>
                    <Login />
                  </Suspense>
                </IsAuthProtectedRoutes>
              }
            />
            <Route
              path="/comingsoon"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <ComingSoon />
                </Suspense>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoutes>
                  <DashboardContainer />
                </ProtectedRoutes>
              }
            >
              <Route
                index
                element={
                  <Suspense fallback={<LazyLoader />}>
                    <Dashboard />
                  </Suspense>
                }
              />
              <Route
                path="/dashboard/group-collections"
                element={
                  <Suspense fallback={<LazyLoader />}>
                    <GroupCollection />
                  </Suspense>
                }
              />
              <Route
                path="/dashboard/group-collections/:fileSlug"
                element={
                  <Suspense fallback={<LazyLoader />}>
                    <CollectionFiles />
                  </Suspense>
                }
              />
            </Route>
            <Route
              path="/generate/:generateId"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <Generate />
                </Suspense>
              }
            />
            <Route
              path="/templates"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <Templates />
                </Suspense>
              }
            />
            <Route
              path="/career"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <Career />
                </Suspense>
              }
            />
            <Route
              path="choice"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <Choice />
                </Suspense>
              }
            />
            <Route
              path="/team"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <Team />
                </Suspense>
              }
            />
            <Route
              path="/terms"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <Terms />
                </Suspense>
              }
            />
            <Route
              path="/preview"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <Preview />
                </Suspense>
              }
            />
            <Route
              path="/aboutUs"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <AboutUs />
                </Suspense>
              }
            />
            <Route
              path="/FAQ"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <FAQ />
                </Suspense>
              }
            />
            <Route
              path="/bulk_step"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <BulkStep />
                </Suspense>
              }
            />
            <Route
              path="/edit_bulk"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <EditBulk />
                </Suspense>
              }
            />
            <Route
              path="/bulk_preview"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <BulkPreview />
                </Suspense>
              }
            />
            <Route
              path="/pricing"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <Pricing amountHandler={amountHandler} />
                </Suspense>
              }
            />
            <Route
              path="/contact-us"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <ContactUs />
                </Suspense>
              }
            />
            <Route
              path="/payment"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <Checkout
                    type={type}
                    amount={amount}
                    per={per}
                    header={header}
                    text={text}
                    subText={subText}
                  />
                </Suspense>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoutes>
                  <Suspense fallback={<LazyLoader />}>
                    <ProfilePage />
                  </Suspense>
                </ProtectedRoutes>
              }
            />
            <Route
              path="/upload"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <UploadCSV />
                </Suspense>
              }
            />
            <Route
              path="/certificate"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <Certificate />
                </Suspense>
              }
            />
            <Route
              path="/privacy"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <Privacy />
                </Suspense>
              }
            />
            {/* ResetPassword */}
            <Route
              path="/fff5"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <PasswordChangeSuccessfully />
                </Suspense>
              }
            />
            <Route
              path="/changepassword/:userId/:token"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <ResetPassword />
                </Suspense>
              }
            />
            <Route
              path="/fff3"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <ChangePassword />
                </Suspense>
              }
            />
            <Route
              path="/fff2"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <PasswordLinkSent />
                </Suspense>
              }
            />
            <Route
              path="/resetpassword"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <ForgotPassword />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <Error />
                </Suspense>
              }
            />
          </Routes>
        </Layout>
      </div>
    </>
  );
}

export default Sentry.withProfiler(App);
