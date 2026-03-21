import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import type { SignInForm } from "@/components/login-form";
import {
  clearAccessTokenCookie,
  getAccessTokenFromCookie,
  setAccessTokenCookie,
} from "@/lib/auth-session";
import { useEffect, useState, type SubmitEvent } from "react";
import type { LoggedUser } from "@/types";

const baseURL = "https://dummyjson.com";

export function useAuth() {
  const [loggedUser, setLoggedUser] = useState<LoggedUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAuthenticatedUser() {
      const token = getAccessTokenFromCookie();
      if (!token) return;

      const response = await fetch("https://dummyjson.com/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return toast.error("Something went wrong");
      }

      setLoggedUser(await response.json());
    }

    getAuthenticatedUser();
  }, []);

  async function handleLogout() {
    clearAccessTokenCookie();

    navigate({ to: "/login" });
  }

  async function handleLogin(
    event: SubmitEvent<HTMLFormElement>,
    data: SignInForm,
  ) {
    event.preventDefault();

    const response = await fetch(`${baseURL}/auth/login`, {
      body: JSON.stringify({
        expiresInMins: 30,
        username: data.username,
        password: data.password,
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    const json = await response.json();

    if (!response.ok) {
      return toast.error(json.message);
    }

    toast.success("Welcome...");

    setAccessTokenCookie(json.accessToken);

    navigate({ to: "/dashboard" });
  }

  return {
    loggedUser,
    handleLogin,
    handleLogout,
  };
}
