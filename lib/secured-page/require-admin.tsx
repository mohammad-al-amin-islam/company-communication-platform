import Loading from "@/components/shared/loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import useAdmin from "../hooks/useAdmin";

const RequireAdmin = ({ children }: any) => {
  const { data: session, status } = useSession();
  // const email = session?.user?.email;
  // const [role,isLoading] = useAdmin(email);
  const router = useRouter();
  const admminFS = session?.user?.role;

  if ( status === "loading") {
    return <Loading />;
  }

  if (admminFS!="admin" || !session) {
    router.replace("/");
    return;
  }

  return children;
};

export default RequireAdmin;
