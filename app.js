import express from 'express';      
import cors from 'cors';           
import colors from 'colors';        
import dotenv from 'dotenv';        
import sequelize from './config/db.js';  
import userRoutes from './routes/userRoutes.js';
import donationRoutes from './routes/donationRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());
// Parse incoming JSON requests     
app.use(express.json());

// Register Routes
// User-routes
app.use('/api/users', userRoutes);
// Crisis-routes
//app.use('/api/crises', crisisRoutes);
app.use('/api/donation', donationRoutes);

// Sync Database Models
sequelize.sync()
    .then(() => {
        console.log(`Database synced successfully.`.bgGreen);
    })
    .catch(err => {
        console.error(`Unable to sync the database:`.bgRed, err);
    });
    
// Define Port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
