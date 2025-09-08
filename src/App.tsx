import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import { protectedRoutes, publicRoutes } from "./routes";
import ProtectedRoute from "./middlewares/ProtectedRoute";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
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
      <Toaster />
    </>
  );
}

export default App;
