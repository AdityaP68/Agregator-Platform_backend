import Joi from "joi";

const userAuthSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
  first_name: Joi.string(),
  last_name: Joi.string(),
  ph_no: Joi.number(),
  address: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
  zip_code: Joi.number(),
  date_of_birth: Joi.date(),
  gender: Joi.string(),
});

export default { userAuthSchema };
