import React, { useState } from "react";
import FormAlert from "components/FormAlert";
import AuthForm from "components/AuthForm";
import AuthSocial from "components/AuthSocial";
import AuthFooter from "components/AuthFooter";
import { useRouter } from "next/router";
import "components/Auth.scss";
import { useAuth } from "util/auth";

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

  return (
    <>
      {formAlert && (
        <FormAlert
          type={formAlert.type}
          message={formAlert.message}
        ></FormAlert>
      )}

      {/* <AuthForm
        type={props.type}
        typeValues={props.typeValues}
        parentColor={props.parentColor}
        onAuth={handleAuth}
        onFormAlert={handleFormAlert}
      ></AuthForm> */}

      {["signup", "signin"].includes(props.type) && (
        <>
          {props.providers && props.providers.length && (
            <>
              {/* <div className="Auth__social-divider has-text-centered is-size-7">
                OR
              </div> */}
              <AuthSocial
                type={props.type}
                buttonText={props.typeValues.buttonText}
                showLastUsed={true}
                providers={props.providers}
                onAuth={handleAuth}
                onError={(message) => {
                  handleFormAlert({
                    type: "error",
                    message: message,
                  });
                }}
              ></AuthSocial>
            </>
          )}

          {/* <AuthFooter
            type={props.type}
            typeValues={props.typeValues}
          ></AuthFooter> */}
        </>
      )}
    </>
  );
}

export default Auth;
