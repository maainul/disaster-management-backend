import { DataTypes } from 'sequelize';
import sequelize from '../config/db';

const Report = sequelize.define('Report', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: DataTypes.ENUM('donation', 'expense', 'inventory'),
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    fileUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Report;
