import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/client";
import { useRouter } from "next/router";

//Estado del usuario, no logueado, indefinido.
export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined,
};

export default function useUser() {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(setUser);
  }, []);

  //Si no está logueado se lo manda al index
  useEffect(() => {
    user === USER_STATES.NOT_LOGGED && router.push("/");
  }, [user]);

  return user;
}
