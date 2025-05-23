"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Auth({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const mail = localStorage.getItem("mail");
    if (!mail) {
      //router.replace("/connexion");
    }
  }, [router]);

  return <>{children}</>;
}