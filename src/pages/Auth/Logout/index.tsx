import React, { useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useAdmin } from "hooks";

export default function Logout() {
  const { removeUser } = useAdmin();
  const { push } = useHistory();

  const logout = async () => {
    await removeUser()
    push('/')
  }
  useEffect(() => {
    logout()
    // eslint-disable-next-line
  }, [])
  return (
    <>
    </>
  );
}
