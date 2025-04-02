import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import {
  publicRoutes,
  privateRoutes,
  adminPrivateRoutes,
} from "./routes/index";
import DefaultLayout from "./layouts/default";
import AdminLayout from "./layouts/admin-layout";
import useAuthToken from "./utils/auth";
import HandleReloading from "./utils/navigation";
import LoadingPage from "./containers/loading/loading";
import NotFound from "./containers/not-found/not-found";

function App() {
  const { userToken, isLoading } = useAuthToken();

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Router>
      <div className="App">
        <HandleReloading />
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout;
            if (route.layout) {
              Layout = route.layout;
            } else {
              Layout = DefaultLayout;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    {userToken &&
                    (route.path === "/vn-en" ||
                      route.path === "/auth/login" ||
                      route.path === "/auth/register") ? (
                      <Navigate to="/" />
                    ) : (
                      <Page />
                    )}
                  </Layout>
                }
              />
            );
          })}

          {privateRoutes.map((route, index) => {
            const Page = route.component;
            let Layout;
            if (route.layout) {
              Layout = route.layout;
            } else {
              Layout = DefaultLayout;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    {userToken ? <Page /> : <Navigate to="/vn-en" />}
                  </Layout>
                }
              />
            );
          })}

          {adminPrivateRoutes.map((route, index) => {
            const Page = route.component;
            let Layout;
            if (route.layout) {
              Layout = route.layout;
            } else {
              Layout = AdminLayout;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <>
                    {userToken ? (
                      <Layout>
                        <Page />
                      </Layout>
                    ) : (
                      <div>
                        <NotFound />
                      </div>
                    )}
                  </>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
