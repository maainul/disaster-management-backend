import pkg from "sequelize";
const { DataTypes } = pkg;
import sequelize from "../config/db.js";
import Crisis from "./crisis.js";

const Donation = sequelize.define(
  "Donation",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    donorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    crisisId: {
      type: DataTypes.INTEGER,
      references: {
        model: Crisis,
        key: "id",
      },
      allowNull: true, // This field can be null if the donation is not linked to any specific crisis
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Donation;
