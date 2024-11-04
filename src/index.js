import app from "./app.js";
import connectDB from "./config/dbConnection.js";
import dotenv from "dotenv";
dotenv.config();


connectDB().then(()=> {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  })
}).catch((err)=> {
  console.log("Error connecting to DB", err);
})




