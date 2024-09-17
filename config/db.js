import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
});

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection to MySQL has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the MySQL database:', err);
    });

export default sequelize;
