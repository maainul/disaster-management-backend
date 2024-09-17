import pkg from "sequelize";
const { DataTypes } = pkg;
import sequelize from "../config/db.js";
import Crisis from "./crisis.js";
import Volunteer from "./volunteer.js";

const VolunteerAssignment = sequelize.define("VolunteerAssignment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  volunteerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Volunteer,
      key: "id",
    },
  },
  crisisId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Crisis,
      key: "id",
    },
  },
  task: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  assignedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default VolunteerAssignment;
