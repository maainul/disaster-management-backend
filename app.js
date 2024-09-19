import cors from "cors";
import colors from "colors";
import dotenv from "dotenv";
import express from "express";
import sequelize from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import crisisRoutes from "./routes/crisisRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import volunteerAssignmentRoutes from "./routes/volunteerAssignmentRoutes.js";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());
// Parse incoming JSON requests
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

// Register Routes

// User-routes
app.use("/api/users", userRoutes);
// Crisis-routes
app.use("/api/crises", crisisRoutes);
// Donation-routes
app.use("/api/donation", donationRoutes);
// volunteers-routes
app.use("/api/volunteers", volunteerRoutes);
// assignments-routes
app.use("/api/assignments", volunteerAssignmentRoutes);
// inventory-routes
app.use("/api/inventory", inventoryRoutes);

// Sync Database Models
sequelize
  .sync()
  .then(() => {
    console.log(`Database synced successfully.`.bgGreen);
  })
  .catch((err) => {
    console.error(`Unable to sync the database:`.bgRed, err);
  });

// Define Port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
