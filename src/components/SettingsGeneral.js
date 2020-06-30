import React, { useState } from "react";
import FormAlert from "components/FormAlert";
import FormField from "components/FormField";
import SectionButton from "components/SectionButton";
import { useAuth } from "util/auth.js";
import { useForm } from "react-hook-form";

function SettingsGeneral(props) {
  const auth = useAuth();
  const [pending, setPending] = useState(false);
  const [formAlert, setFormAlert] = useState(null);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    // Show pending indicator
    setPending(true);

    return auth
      .updateProfile(data)
      .then(() => {
        // Show success alert message
        setFormAlert({
          type: "success",
          message: "Your profile has been updated",
        });
      })
      .catch((error) => {
        if (error.code === "auth/requires-recent-login") {
          // Remove existing alert message
          setFormAlert(null);

          // Show re-authentication modal and
          // then re-call onSubmit() when done.
          props.onRequireReauth(() => {
            onSubmit(data);
          });
        } else {
          // Show error alert message
          setFormAlert({
            type: "error",
            message: error.message,
          });
        }
      })
      .finally(() => {
        // Hide pending indicator
        setPending(false);
      });
  };

  return (
    <>
      {formAlert && (
        <FormAlert
          type={formAlert.type}
          message={formAlert.message}
        ></FormAlert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="name"
          type="text"
          label="Name"
          defaultValue={auth.user.name}
          placeholder="Name"
          error={errors.name}
          inputRef={register({
            required: "Please enter your name",
          })}
        ></FormField>
        <FormField
          name="email"
          type="email"
          label="Email"
          defaultValue={auth.user.email}
          placeholder="Email"
          error={errors.email}
          inputRef={register({
            required: "Please enter your email",
          })}
        ></FormField>
        <div className="field">
          <div className="control">
            <SectionButton
              parentColor={props.parentColor}
              size="medium"
              state={pending ? "loading" : "normal"}
            >
              Save
            </SectionButton>
          </div>
        </div>
      </form>
    </>
  );
}

export default SettingsGeneral;
