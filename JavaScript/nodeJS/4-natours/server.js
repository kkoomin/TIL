const mongoose = require("mongoose");

const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  // .connect(process.env.DATABASE_LOCAL, {
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("DB connection successful!"));

// Testing the model
// const testTour = new Tour({
//   name: "The Park Camper",
//   price: 997
// });

// testTour
//   .save()
//   .then(doc => {
//     console.log(doc);
//   })
//   .catch(err => {
//     console.log("Error! 🔥", err);
//   });

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
