import { useEffect } from "react";
import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { getCurrentUser } from "./store/slices/authSlice";
import Layout from "./layout";
import publicRoutes from "./routes/public";
import adminRoutes from "./routes/admin";
import { ThemeProvider } from "@mui/material";
import theme from "./assets/theme";

function App() {
  const { isAuthenticated, initializing, initialized } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!initialized) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, initialized]);

  if (initializing) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={isAuthenticated ? "/dashboard" : "/login"}
              replace
            />
          }
        />
        <Route path="/" element={isAuthenticated ? <Navigate to={"/dashboard"} replace /> : <Outlet />}>
          {publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.component} />
          ))}
        </Route>
        <Route path="/" element={isAuthenticated ? <Layout /> : <Navigate to={"/login"} replace />}>
          {adminRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.component} />
          ))}
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;