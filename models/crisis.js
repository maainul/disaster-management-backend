import { DataTypes } from 'sequelize';
import sequelize from '../config/db';

const Crisis = sequelize.define('Crisis', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    severity: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'in_progress', 'resolved'),
        defaultValue: 'pending',
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

export default Crisis;
