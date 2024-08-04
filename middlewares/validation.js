// NEW
const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

// Custom URL validator using validator.js
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// Validation for creating a clothing item
const validateClothingItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required().messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    weather: Joi.string().required().messages({
      "string.empty": 'The "weather" option must be selected',
    }),
    imageUrl: Joi.string().custom(validateURL).required().messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": "You must enter a valid URL",
    }),
  }),
});

// Validation for creating a user
const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required().messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().custom(validateURL).required().messages({
      "string.empty": 'The "Avatar" field must be filled in',
      "string.uri": "You must enter a valid URL",
    }),
    email: Joi.string().email().required().messages({
      "string.empty": 'The "Email" field must be filled in',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "Password" field must be filled in',
    }),
  }),
});

// Validation for editing a user profile
const validateEditUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required().messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().custom(validateURL).required().messages({
      "string.empty": 'The "Avatar" field must be filled in',
      "string.uri": "You must enter a valid URL",
    }),
  }),
});

// Validation for user login
const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().messages({
      "string.empty": 'The "name" field must be filled in',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "Password" field must be filled in',
    }),
  }),
});

// Validation for IDs (User and Clothing Item)
const validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required().messages({
      "string.length": 'The "itemId" field must be 24 characters long',
      "string.hex": 'The "itemId" field must be a hexadecimal value',
      "string.empty": 'The "itemId" field must be filled in',
    }),
    // userId: Joi.string().hex().length(24).required().messages({
    //   "string.length": 'The "itemId" field must be 24 characters long',
    //   "string.hex": 'The "itemId" field must be a hexadecimal value',
    //   "string.empty": 'The "itemId" field must be filled in',
    // }),
  }),
});

module.exports = {
  validateClothingItem,
  validateUser,
  validateLogin,
  validateId,
  validateEditUser,
};
