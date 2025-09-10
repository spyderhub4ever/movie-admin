import { Navigate } from "react-router-dom";

interface GuestRouteProps {
  children: React.ReactNode;
}

export default function GuestRoute({ children }: GuestRouteProps) {
  const token = localStorage.getItem("auth_token");

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
