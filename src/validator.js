import * as yup from "yup";
import "yup-phone";

export const stringValidator = yup.string();

export const idValidator = yup.string().min(1);

// users
export const displayNameValidator = yup.string().min(1).max(255);
export const phoneValidator = yup.string().phone();
export const roleValidator = yup.string().oneOf(["admin", "utilisateur"]);
export const emailValidator = yup.string().email();

export const passwordValidator = yup
  .string()
  .min(8)
  .matches(
    /^(?=.*[\p{Ll}])(?=.*[\p{Lu}])(?=.*[0-9])(?=.*[^0-9\p{Lu}\p{Ll}]).*$/gu,
    "Password must contain at least 1 upper & 1 lower case letters, 1 digit, 1 spe. character"
  )
  .required("This field cannot be empty");

export const createValidator = (object) => yup.object().shape(object);
