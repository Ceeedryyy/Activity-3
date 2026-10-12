import { Sequelize } from "sequelize";
import { sequelize } from "./models/db.js";
import "./models/userModel.js";
import "./models/Product.js";

const rootSequelize = new Sequelize("mysql://root:@localhost:3306/", {
  logging: false,
});

try {
  // Create the configured database if it does not exist yet.
  await rootSequelize.query("CREATE DATABASE IF NOT EXISTS Activity_3;");
  console.log("Database Activity_3 is ready.");

  await sequelize.authenticate();
  console.log("Connected to MySQL database.");

  await sequelize.sync();
  console.log("Tables created for all models.");
} catch (error) {
  if (error.name === "SequelizeConnectionRefusedError") {
    console.error("Migration failed: MySQL is not accepting connections at localhost:3306. Start your MySQL server (for example, MySQL in XAMPP) and run `npm run migrate` again.");
  } else {
    console.error("Migration failed:", error.message || error);
  }
  process.exitCode = 1;
} finally {
  await Promise.allSettled([rootSequelize.close(), sequelize.close()]);
}
