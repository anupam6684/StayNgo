// ================= Joi Schemas =================
const Joi = require("joi");

// Listing Joi validation schema
const ListingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().min(0).required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    image: Joi.string().allow("", null),
  }).required(),
});

// Review Joi validation schema
const ReviewSchema = Joi.object({
  review: Joi.object({
    comment: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required(),
  }).required(),
});

module.exports = { ListingSchema, ReviewSchema }; // ✅ both exported together
