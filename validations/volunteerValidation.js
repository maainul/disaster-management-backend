import Joi from "joi";

// Volunteer validation schema
export const validateVolunteer = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required().label("Name"),
    expatriate: Joi.boolean(),
    phoneNumber: Joi.string().required().label("Phone Number"),
    emergencyPhoneNumber: Joi.string()
      .required()
      .label("Emergency Phone Number"),
    email: Joi.string().email().required().label("Email"),
    facebookIdLink: Joi.string()
      .uri()
      .allow("", null)
      .label("Facebook ID Link"),
    nidNumber: Joi.string().allow("", null).label("NID Number"),
    educationalInformation: Joi.string()
      .allow("", null)
      .label("Educational Information"),
    occupation: Joi.string().allow("", null).label("Occupation"),
    voluntaryWorkInterest: Joi.string()
      .allow("", null)
      .label("Voluntary Work Interest"),
    specialSkills: Joi.string().allow("", null).label("Special Skills"),
    permanentAddress: Joi.string().allow("", null).label("Permanent Address"),
    districtUpazilaPermanent: Joi.string()
      .allow("", null)
      .label("District / Upazila Permanent"),
    currentAddress: Joi.string().allow("", null).label("Current Address"),
    districtUpazilaCurrent: Joi.string()
      .allow("", null)
      .label("District / Upazila Current"),
  });

  return schema.validate(data, { abortEarly: false });
};
