import { DataTypes } from 'sequelize';
import sequelize from '../config/db';

const VolunteerAssignment = sequelize.define('VolunteerAssignment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  volunteerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  crisisId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Crisis',
      key: 'id',
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
