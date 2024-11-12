import express from "express";
import rateLimit from "express-rate-limit";
import routes from "./routes";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});

app.use(limiter);
app.use(express.json());
app.use('/api', routes)

export default app;
