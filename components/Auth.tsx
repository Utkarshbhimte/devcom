import React, { useState } from "react";
import { useRouter } from "next/router";

function Auth(props) {
  const router = useRouter();
  const [formAlert, setFormAlert] = useState(null);
  // const { handleAuth } = useAuth();

  const handleAuth = (user) => {
    // handle create user after auth
    router.push(props.afterAuthPath);
  };

  const handleFormAlert = (data) => {
    setFormAlert(data);
  };

  return <>Work in Progress</>;
}

export default Auth;
