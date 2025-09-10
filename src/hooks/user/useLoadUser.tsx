import { useAuthStore } from "@/store/useAuthStore";
import { useGet } from "../api/useApi";
import { useEffect } from "react";

export function useLoadUser() {
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);
  const accessToken = localStorage.getItem("auth_token");

  const { data, error, execute } = useGet("/auth/me", {
    immediate: false,
  });

  useEffect(() => {
    if (!user && accessToken) {
      execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (data?.user) {
      setUser(data.user);
    }
  }, [data, setUser]);

  useEffect(() => {
    if (error) {
      console.error("Failed to load user:", error);
    }
  }, [error]);
}
