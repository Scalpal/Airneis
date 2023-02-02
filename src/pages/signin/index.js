import Form from "@/components/Form";
import * as yup from "yup";
import YupPassword from "yup-password";

YupPassword(yup);

export default function SignIn() {
  const initialValues = { name: "", email: "", password: "" };

  const yup = require("yup");
  require("yup-password")(yup);
  const schema = yup.object().shape({
    name: yup
      .string()
      .required()
      .min(3, "password must contain 3 or more characters"),

    email: yup.string().required().email(),

    password: yup
      .string()
      .min(8, "password must contain 8 or more characters")
      .minLowercase(1, "password must contain at least 1 lower case letter")
      .minUppercase(1, "password must contain at least 1 upper case letter")
      .minNumbers(1, "password must contain at least 1 number")
      .minSymbols(1, "password must contain at least 1 special character")
      .required(),
  });
  return (
    <>
      <Form initialValues={initialValues} schema={schema} />
    </>
  );
}
