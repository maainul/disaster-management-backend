import Joi from "joi";

export const validateInventoryItem = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required().label("Name"),
    type: Joi.string().valid("relief", "expense").required().label("Type"),
    quantity: Joi.number().integer().positive().required().label("Quantity"),
    unit: Joi.string().min(1).max(20).required().label("Unit"),
    addedBy: Joi.number().integer().required().label("Added By (User ID)"),
  });

  return schema.validate(data, { abortEarly: false });
};
