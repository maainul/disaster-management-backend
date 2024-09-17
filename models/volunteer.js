import pkg from "sequelize";
const { DataTypes } = pkg;
import sequelize from "../config/db.js";

const Volunteer = sequelize.define(
  "Volunteer",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expatriate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emergencyPhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    facebookIdLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nidNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    educationalInformation: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    occupation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    occupationSelected: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    voluntaryWorkInterest: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    specialSkills: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    permanentAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    districtUpazilaPermanent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    currentAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    districtUpazilaCurrent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true
  }
);

export default Volunteer;
