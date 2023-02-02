import Form from "@/components/Form";
import * as yup from "yup";
import YupPassword from "yup-password";

YupPassword(yup);

export default function SignUp() {
  const initialValues = { email: "", password: "" };

  const yup = require("yup");
  require("yup-password")(yup);

  const schemaValues = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
  });
  return (
    <>
      <Form initialValues={initialValues} schemaValues={schemaValues} />
    </>
  );
}
