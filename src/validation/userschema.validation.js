import Joi from "joi";

const userAuthSchema = Joi.object({
  role: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  username: Joi.string().required(),
  password: Joi.string().required().min(6),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  mobileNumber: Joi.number().required(),
  address: Joi.string().required(),
  dateOfBirth: Joi.date().max('now').required(),
})


// const updateUserSchema = Joi.object({
//   first_name: Joi.string(),
//   last_name: Joi.string(),
//   ph_no: Joi.number(),
//   address: Joi.string(),
//   city: Joi.string(),
//   state: Joi.string(),
//   zip_code: Joi.number(),
//   date_of_birth: Joi.date(),
// }).options({ abortEarly: false });

export default { userAuthSchema };
