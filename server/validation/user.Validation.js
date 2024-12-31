const joi = require("joi");
const userValidationSchema = joi.object({
    username:joi.string().trim().lowercase().min(3).max(30).required(),
    email:joi.string().trim().lowercase().email().required(),
    password:joi.string().trim().min(6).required()
});

module.exports = userValidationSchema;