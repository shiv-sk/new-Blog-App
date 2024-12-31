const joi = require("joi");
const blogValidation = joi.object({
    title:joi.string().trim().lowercase().min(3).required(),
    body:joi.string().required(),
    author:joi.string().required()
})
module.exports = blogValidation