const express = require("express");
const env = require("dotenv");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//*Routes
const adminAuthRoutes = require("./routes/admin/auth");
const customerAuthRoutes = require("./routes/customer/auth");


//*Env Variables
env.config();

//*Mongo DB Connection
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.dsnoz.gcp.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex:true,
    }
  )
  .then(() => {
    console.log("Mongo DB Connected");
  });

app.use(bodyParser());
app.use("/auth/admin/", adminAuthRoutes);
app.use("/auth/user/", customerAuthRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});