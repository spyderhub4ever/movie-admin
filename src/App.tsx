import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import { protectedRoutes, publicRoutes } from "./routes";

function App() {
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<AdminLayout>{route.element}</AdminLayout>}
          />
        ))}

        {protectedRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<AdminLayout>{route.element}</AdminLayout>}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
