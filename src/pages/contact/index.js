import Form from "@/components/Form";
import Navbar from "@/components/Navbar";
import * as yup from "yup";

export default function Contact() {
  const initialValues = { email: "", subject: "", message: "" };
  const schema = yup.object().shape({
    email: yup.string().required().email(),
    subject: yup
      .string()
      .required()
      .max(50, "Your subject must contain 50 characters maximum"),
    message: yup
      .string()
      .required()
      .max(700, "Your message must contain 700 characters maximum"),
  });

  return (
    <>
      <Navbar />
      <h2>Contact</h2>
      <Form initialValues={initialValues} schema={schema} />
    </>
  );
}
