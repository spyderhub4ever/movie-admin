import type { ReactElement } from "react";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";

interface AppRoute {
  path: string;
  element: ReactElement;
}

export const publicRoutes: AppRoute[] = [
  { path: "/auth", element: <AuthPage /> },
];

export const protectedRoutes: AppRoute[] = [
  { path: "/", element: <Dashboard /> },
];
