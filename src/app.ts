import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import dashboardRoutes from "./routes/dashboard.routes.js";
import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js";
import healthRoutes from "./routes/health.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "BusinessOS Backend Running 🚀",
  });
});

//Routes
app.use("/health", healthRoutes);
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/dashboard", dashboardRoutes);

app.use(errorMiddleware);
export default app;