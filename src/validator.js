import * as yup from "yup";
import "yup-phone";

export const stringValidator = yup.string();

export const idValidator = yup.string().min(1);

export const numberValidator = yup.string().min(0);

export const dateValidator = yup.date();

export const arrayValidator = yup.array();

export const booleanValidator = yup.boolean();

export const stringArrayValidator = yup.array().of(
  yup.object().shape({
    value: yup.string(),
  })
);

  
// pagination
export const indexValidator = yup.string().min(1);
  

// users
export const displayNameValidator = yup.string().min(1).max(255);
export const phoneValidator = yup
  .string()
  .phone("FR", false, "The phone number has to be valid in France.");
export const roleValidator = yup.string().oneOf(["admin", "utilisateur"]);
export const emailValidator = yup.string().email();

export const confirmPasswordValidator = yup
  .string()
  .oneOf([yup.ref("password")], "Passwords must be identical");

export const passwordValidator = yup
  .string()
  .min(8)
  .matches(
    /^(?=.*[\p{Ll}])(?=.*[\p{Lu}])(?=.*[0-9])(?=.*[^0-9\p{Lu}\p{Ll}]).*$/gu,
    "Password must contain at least 1 upper & 1 lower case letters, 1 digit, 1 spe. character"
  );

export const createValidator = (object) => yup.object().shape(object);
