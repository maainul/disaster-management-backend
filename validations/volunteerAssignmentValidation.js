import Joi from "joi";

// Assignment validation schema
export const volunteerAssignmentValidation = (data) => {
  const schema = Joi.object({
    volunteerId: Joi.number().integer().required().label("Volunteer ID"),
    crisisId: Joi.number().integer().required().label("Crisis ID"),
    task: Joi.string().max(255).allow(null, "").label("Task"),
  });

  return schema.validate(data, { abortEarly: false });
};
