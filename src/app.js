import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./db/ConnectDB.js";
import authRoute from "./routes/auth.route.js";
import CartRoutes from "./routes/cart.route.js";

dotenv.config();

const app = express();
ConnectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/cart", CartRoutes);

app.get('/', (req, res) => {
    res.send("Hello World");
})

export default app;
