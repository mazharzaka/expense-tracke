const Joi = require("joi");

const registerValidation = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("(?=.*[a-z])"))
    .pattern(new RegExp("(?=.*[A-Z])"))
    .pattern(new RegExp("(?=.*[0-9])"))
    .pattern(new RegExp("(?=.*[!@#$%^&*])"))
    .required()
    .messages({
      "string.min": "كلمة المرور يجب أن تكون 8 أحرف على الأقل",
      "string.pattern.base":
        "كلمة المرور يجب أن تحتوي على حرف كبير، حرف صغير، رقم، ورمز خاص",
      "string.empty": "كلمة المرور مطلوبة",
    }),
});

module.exports = { registerValidation };
