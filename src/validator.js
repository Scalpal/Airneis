import * as yup from "yup"
import "yup-phone"

export const stringValidator = yup.string()

export const idValidator = yup.string().min(1)

export const numberValidator = yup.string().min(0)

export const dateValidator = yup.date()

export const booleanValidator = yup.boolean()

// Base
export const cryptValidator = yup.array().of(
  yup.object().shape({
    value: yup.string(),
  })
)

// pagination
export const indexValidator = yup.string().min(1)
export const arrayValidator = yup.array().of(stringValidator)
export const arrayOrStringValidator = yup
  .mixed()
  .test("isArrayOfStrings", "Invalid values", (value) => {
    if (typeof value === "string") {
      return true // Accepts a single string
    }

    if (
      Array.isArray(value) &&
      value.every((item) => typeof item === "string")
    ) {
      return true // Accepts an array of strings
    }

    if (typeof value === "undefined") {
      return true
    }

    return false
  })

// users
export const displayNameValidator = yup.string().min(1).max(255)
export const phoneValidator = yup
  .string()
  .phone("FR", false, "The phone number has to be valid in France.")
export const roleValidator = yup.string().oneOf(["admin", "utilisateur"])
export const emailValidator = yup.string().email()

export const passwordValidator = yup
  .string()
  .min(8)
  .matches(
    /^(?=.*[\p{Ll}])(?=.*[\p{Lu}])(?=.*[0-9])(?=.*[^0-9\p{Lu}\p{Ll}]).*$/gu,
    "Password must contain at least 1 upper & 1 lower case letters, 1 digit, 1 spe. character"
  )

// products
export const materialsValidator = yup
  .mixed()
  .oneOf([arrayValidator, stringValidator])
export const categoriesValidator = yup
  .mixed()
  .oneOf([arrayValidator, stringValidator])

export const createValidator = (object) => yup.object().shape(object)

// collection (pagination, order, etc.)
export const limitValidator = yup.number().integer().min(1).max(100)
export const pageValidator = yup.number().integer().min(1).default(1)
export const orderFieldValidator = (fields) => yup.string().oneOf(fields)
export const orderValidator = yup.string().lowercase().oneOf(["asc", "desc"])
export const searchValidator = yup.string().lowercase().default("")
