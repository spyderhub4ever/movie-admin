import { useAuthStore } from "@/store/useAuthStore";
import { useGet } from "../api/useApi";
import { useEffect } from "react";

export function useLoadUser() {
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);
  const accessToken = localStorage.getItem("auth_token");

  const { error, execute } = useGet("/auth/profile", {
    immediate: false,
    onSuccess: (data: {
      user: { id: string; name: string; email: string; image?: string };
    }) => {
      setUser(data.user);
    },
  });

  useEffect(() => {
    if (!user && accessToken) {
      execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (error) {
      console.error("Failed to load user:", error);
    }
  }, [error]);
}
