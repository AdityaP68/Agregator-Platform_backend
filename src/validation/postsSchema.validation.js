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
  title: Joi.string(),
  description: Joi.string(),
  category: Joi.string(),
  socials: Joi.object({
    likes: Joi.object({
      count: Joi.number().min(0),
      likedBy: Joi.array().items(Joi.string()),
    }),
    dislikes: Joi.object({
      count: Joi.number().min(0),
      dislikedBy: Joi.array().items(Joi.string()),
    }),
    views: Joi.object({
      count: Joi.number().min(0),
      viewedBy: Joi.array().items(Joi.string()),
    }),
    shares: Joi.object({
      count: Joi.number().min(0),
      sharedBy: Joi.array().items(Joi.string()),
    }),
  }),
  is_media_attachment: Joi.boolean(),
  media: Joi.object({
    media_type: Joi.string(),
    url: Joi.string(),
  }),
});



export default { PostSchemaValidator, PostUpdateValidator};
