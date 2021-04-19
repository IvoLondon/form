import * as React from "react";
import { Formik, Field } from "formik";
import {
  Form,
  Heading,
  Button,
  InputField,
  Message,
  Loading
} from "../components/";
import { validateEmail, validateMobileNumber } from "../utils/validationSchema";
import { successMessage } from "../utils/const";

/**
 * See README.md for instructions
 */
export default function IndexPage() {
  const [formSubmitState, setFormToSubmit] = React.useState(false);
  const [formError, setFormError] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);

  const handlerOnSubmit = async (values, { setSubmitting }) => {
    // Show Loading animation
    setLoading(true);

    try {
      const formBody = JSON.stringify(values);
      const res = await fetch("/api/waiting-list", {
        method: "POST",
        body: formBody
      });
      //Handle result
      if (res.status === 200) {
        handleSuccessfulSubmit();
      } else {
        const err = await res.json();
        handleErrorSubmit(err);
      }
    } catch (e) {
      console.log(e);
    }
    //Enable submit button
    setSubmitting(false);
    // Hide Loading animation
    setLoading(false);
  };

  const handleSuccessfulSubmit = () => {
    setFormToSubmit(true);
    setTimeout(() => {
      setFormToSubmit(false);
    }, 3000);
  };

  const handleErrorSubmit = ({ message }) => {
    setFormError(message);
    setTimeout(() => {
      setFormError("");
    }, 3000);
  };

  return (
    <div>
      <Formik
        initialValues={{ emailAddress: "", mobileNumber: "" }}
        onSubmit={handlerOnSubmit}
      >
        {({ values, errors, touched, handleSubmit, isSubmitting }) => {
          return (
            <Form role="form" onSubmit={handleSubmit}>
              <Heading>Join the waiting list.</Heading>
              <Field type="email" name="emailAddress" validate={validateEmail}>
                {({ field, meta }) => {
                  return (
                    <>
                      <InputField required {...field} {...meta}>
                        Email Address
                      </InputField>
                    </>
                  );
                }}
              </Field>

              <Field
                type="tel"
                name="mobileNumber"
                validate={validateMobileNumber}
              >
                {({ field, meta }) => {
                  return (
                    <>
                      <InputField required {...field} {...meta}>
                        Mobile Number
                      </InputField>
                    </>
                  );
                }}
              </Field>

              <Button
                type="submit"
                disabled={Object.keys(errors).length > 0 || isSubmitting}
              >
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>

      {/* Show message if form is succesfully submitted */}
      {formSubmitState ? (
        <Message>{successMessage}</Message>
      ) : null}

      {/* Show message if form submission has errors */}
      {formError ? <Message>{formError}</Message> : null}

      <Loading loading={isLoading} />
    </div>
  );
}
