import Joi from "joi";

const userAuthSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  ph_no: Joi.number().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  zip_code: Joi.number().required(),
  date_of_birth: Joi.date().required(),
  gender: Joi.string().required(),
}).options({abortEarly: false})

export default { userAuthSchema };
