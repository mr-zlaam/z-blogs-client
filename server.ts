import express from "express";
const app = express();
app.get("/", (req, res) => {
  res.send("hello world");
});
app.listen(8000, () => {
  console.log(`server is running on ${8000}`);
});
