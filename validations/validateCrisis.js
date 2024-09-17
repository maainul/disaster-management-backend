import Joi from "joi";

export const validateCrisis = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required().label("Crisis Title"),
    location: Joi.string().min(3).required().label("Location"),
    severity: Joi.string()
      .valid("low", "medium", "high")
      .required()
      .label("Severity"),
    description: Joi.string().allow("").label("Description"),
    status: Joi.string()
      .valid("ongoing", "resolved")
      .default("ongoing")
      .label("Status"),
  });

  return schema.validate(data, { abortEarly: false });
};
