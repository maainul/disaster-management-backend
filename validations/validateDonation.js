import Joi from 'joi';

// Donation validation schema
export const validateDonation = (data) => {
    const schema = Joi.object({
        donorName: Joi.string().min(3).max(100).required().label('Donor Name'),
        email: Joi.string().email().required().label('Email'),
        phone: Joi.string().required().label('Phone'),
        amount: Joi.number().positive().precision(2).required().label('Amount'),
    });

    return schema.validate(data, { abortEarly: false });
};
