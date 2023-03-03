import Joi from "joi";

const userAuthSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } }) // validate email address format
    .trim()
    .lowercase()
    .required(),
  password: Joi.string()
    // validate password format (alphanumeric, 8-30 characters)
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@_#$])[A-Za-zd@_#$]{8,30}$"
      )
    )
    .required(),
  first_name: Joi.string().trim().min(2).max(50).required(),
  last_name: Joi.string().trim().min(2).max(50).required(),
  ph_no: Joi.string()
    .trim()
    .pattern(new RegExp("^[0-9]{10}$")) // validate phone number format (10 digits)
    .required(),
  address: Joi.string().trim().min(10).max(100).required(),
  city: Joi.string().trim().min(2).max(50).required(),
  state: Joi.string().trim().min(2).max(50).required(),
  zip_code: Joi.string()
    .trim()
    .pattern(new RegExp("^[0-9]{5}$")) // validate zip code format (5 digits)
    .required(),
  date_of_birth: Joi.date()
    .max("now") // validate date of birth is not in the future
    .required(),
  gender: Joi.string()
    .trim()
    .valid("male", "female", "other") // validate gender is one of the allowed values
    .required(),
}).options({ abortEarly: false });

const updateUserSchema = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
  ph_no: Joi.number(),
  address: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
  zip_code: Joi.number(),
  date_of_birth: Joi.date(),
  gender: Joi.string(),
}).options({ abortEarly: false });

export default { userAuthSchema };
