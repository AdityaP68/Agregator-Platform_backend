import Joi from "joi";

const PostSchemaValidator = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  created_by: Joi.string().required(),
  socials: Joi.object({
    likes: Joi.number().integer().min(0).default(0),
    dislikes: Joi.number().integer().min(0).default(0),
    saves: Joi.number().integer().min(0).default(0),
    shares: Joi.number().integer().min(0).default(0),
  }).default(),
  is_media_attachment: Joi.boolean().default(false),
  media: Joi.object({
    media_type: Joi.string().required(),
    url: Joi.string().required(),
  }).when("is_media_attachment", { is: true, then: Joi.required() }),
  updated_at: Joi.date().default(Date.now),
});

const PostUpdateValidator = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  is_media_attachment: Joi.boolean().optional(),
  media: Joi.object({
    media_type: Joi.string(),
    url: Joi.string(),
  }).optional(),
  updated_at: Joi.date().default(Date.now),
});

export default { PostSchemaValidator, PostUpdateValidator};
