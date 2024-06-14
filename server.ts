import connectDB from "./src/db";

connectDB().catch((err) =>
  console.log(`Error while connecting to the data basae`)
);
