import Joi from "joi";

const userAuthSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  ph_no: Joi.number().required(),
  address: Joi.string().min(10).required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  zip_code: Joi.number().required(),
  date_of_birth: Joi.date().required(),
  gender: Joi.string().required(),
}).options({abortEarly: false})


const updateUserSchema = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
  ph_no: Joi.number(),
  address: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
  zip_code: Joi.number(),
  date_of_birth: Joi.date(),
  gender: Joi.string()
}).options({abortEarly: false})

export default { userAuthSchema };
