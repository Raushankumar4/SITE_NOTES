import { app } from "./app.js";
import dotenv from "dotenv";
import { dbConnection } from "./database/db.js";

dotenv.config();

const PORT = process.env.PORT || 2000;

dbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})