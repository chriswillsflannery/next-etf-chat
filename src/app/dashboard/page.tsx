'use client';

import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { authToken, logout, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const refreshAuthToken = async () => {
      const res = await fetch("/api/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        login(data.authToken);
      } else {
        // refresh fails, push to login
        logout();
        router.push("/login");
      }
    };

    // if no auth token, refresh it
    if (!authToken) {
      refreshAuthToken();
    }
  }, [authToken, login, logout, router]);

  if (!authToken) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard - Protected Content</h1>
      <p>You have a valid auth token in memory that was issued recently.</p>
    </div>
  );
}
