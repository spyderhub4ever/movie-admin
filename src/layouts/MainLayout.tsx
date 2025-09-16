import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/middlewares/ProtectedRoute";
import { protectedRoutes, publicRoutes } from "@/routes";
import GuestRoute from "@/middlewares/GuestRoute";
import AdminLayout from "./AdminLayout";

export const MainLayout = () => {
  return (
    <div>
      <Router>
        <Routes>
          {publicRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<GuestRoute>{route.element}</GuestRoute>}
            />
          ))}

          {protectedRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectedRoute>
                  <AdminLayout>{route.element}</AdminLayout>
                </ProtectedRoute>
              }
            />
          ))}
        </Routes>
      </Router>
    </div>
  );
};
