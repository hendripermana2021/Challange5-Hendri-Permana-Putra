import express from "express";
import db from "./config/database.js";
import bodyParser from "body-parser";
import multer from "multer";
import cors from "cors";
import { createCar, carsBySize, listCar, CarsByKeyword, getCar, updateCar, deleteCar } from "./handler/controller.js";
import { listCars, AddCar, editCar, listCarsFilter, listCarsByKeyword } from "./handler/viewcontroller.js";
const app = express();
import path from "path";

app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
// import tblCars from "./models/userModels.js";
// import {addCars, getCars} from "./handler/controller.js";
// import ejs from "ejs";

// setting image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage: storage });

//TESTING
// const publicDirectory = path.join(__dirname, "public");
// const uploadDirectory = path.join(publicDirectory, "uploads");

// // Mendefinisikan gimana cara nyimpen file-nya
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDirectory);
//   },

//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
//     );
//   },
// });

try {
    db.authenticate();
    console.log('Database was Connected...');
    // await tblCars.sync();
} catch (error){
    console.error(Error);
}

//FOR VIEW ENGINE
app.get("/", listCars);
app.get("/add-car", AddCar);
app.get("/edit-car/:id", editCar);
app.get("/cars/size/:size", listCarsFilter);
app.get("/cars/keyword/:keyword", listCarsByKeyword);


//FOR API
// app.get('/cars', getCars);
// app.post('/cars', addCars);
app.get("/cars", listCar);
app.get("/cars/:id", getCar);
app.get("/cars/filter/:size", carsBySize);
app.get("/cars/search/:keyword", CarsByKeyword);
app.post("/cars", upload.single("image"), createCar);
app.put("/cars/:id", upload.single("image"), updateCar);
app.delete("/cars/:id", deleteCar);

app.listen(8000, ()=> {
    console.log(`Server is Running at http://localhost:8000`)
});