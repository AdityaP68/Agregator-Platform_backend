import Joi from "joi";

const userAuthSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
});

export default { userAuthSchema };
