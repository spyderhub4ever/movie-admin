import type { ReactElement } from "react";
import Dashboard from "./pages/Dashboard";

interface AppRoute {
  path: string;
  element: ReactElement;
}

export const publicRoutes: AppRoute[] = [];

export const protectedRoutes: AppRoute[] = [
  { path: "/", element: <Dashboard /> },
];
