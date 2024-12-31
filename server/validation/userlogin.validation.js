const joi = require("joi");
const userLoginValidation = joi.object({
    email:joi.string().trim().lowercase().email().required(),
    password:joi.string().trim().required()
})

module.exports = userLoginValidation;