import Joi from 'joi';

// Joi schema for User validation
const userValidationSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    passwordVerify: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'volunteer').default('volunteer'),
    phone: Joi.string().required(),
});

export const validateUser = (data) => {
    return userValidationSchema.validate(data, { abortEarly: false });
};
