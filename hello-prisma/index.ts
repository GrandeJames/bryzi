import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

const port = 3000;

app.get("/", async (req, res) => {
  res.send("Hello World!");
});


  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  