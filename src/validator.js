import * as yup from "yup";
import "yup-phone";

// Base
export const stringValidator = yup.string(); 
export const numberValidator = yup.number();
export const idValidator = yup.string().min(1);

// users
export const displayNameValidator = yup.string().min(1).max(255);
export const phoneValidator = yup.string().phone("FR", false, "The phone number has to be valid in France.");
export const roleValidator = yup.string().oneOf(["admin", "utilisateur"]);
export const emailValidator = yup.string().email("Incorrect email address format. Please enter a valid email address.");
export const boolValidator = yup.boolean();
export const passwordValidator = yup
  .string()
  .min(8)
  .matches(
    /^(?=.*[\p{Ll}])(?=.*[\p{Lu}])(?=.*[0-9])(?=.*[^0-9\p{Lu}\p{Ll}]).*$/gu,
    "Password must contain at least 1 upper & 1 lower case letters, 1 digit, 1 spe. character"
  )
  .required("This field cannot be empty");

// products 


export const createValidator = (object) => yup.object().shape(object);

// collection (pagination, order, etc.)
export const limitValidator = yup.number().integer().min(1).max(100);
export const pageValidator = yup.number().integer().min(1).default(1);
export const orderFieldValidator = (fields) => yup.string().oneOf(fields);
export const orderValidator = yup.string().lowercase().oneOf(["asc", "desc"]);
export const searchValidator = yup.string().lowercase().default(""); 
