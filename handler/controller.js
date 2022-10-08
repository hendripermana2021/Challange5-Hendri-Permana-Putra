import tblCars from "../models/userModels.js";
import fs from "fs";
import Sequelize from "sequelize";
const Op = Sequelize.Op;

export const deleteImage = async (id) => {
  const car = await tblCars.findOne({
    where: {
      id: id,
    },
  });
  const image = car.image;
  fs.unlink(`./public/uploads/${image}`, (err) => {
    if (err) {
      return err;
    }
  });
};

const rupiah = (number)=>{
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(number);
}

export const createCar = (req, res) => {
  const { name, price, size } = req.body;
  const image = req.file ? req.file.filename : "";
  tblCars.create({
    name,
    price,
    size,
    image,
  })
    .then(() => {
      res.status(200).json({
        message: "Image Car Success Uplouded",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error Uploud Image",
      });
    });
};

export const carsBySize = (req, res) => {
  const { size } = req.params;
  tblCars.findAll({
    where: {
      size: size,
    },
  })
    .then((car) => {
      res.status(200).json(car);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error getting cars by size",
      });
    });
};

export const CarsByKeyword = (req, res) => {
  const { keyword } = req.params;
  tblCars.findAll({
    where: {
      name: {
        [Op.iLike]: `%${keyword}%`,
      },
    },
  })
    .then((car) => {
      res.status(200).json(car);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error getting cars by keyword",
      });
    });
};


export const listCar = (req, res) => {
  tblCars.findAll({
    order: [["id", "DESC"]],
  })
    .then((car) => {
      res.status(200).json(car);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error getting cars",
      });
    });
};

export const getCar = (req, res) => {
  tblCars.findOne({
    where: {
      id: req.params.id,
    },
  }).then((car) => {
    res.status(200).json(car);
  });
};

export const updateCar = async (req, res) => {
  if (req.file) await deleteImage(req.params.id);
  const { name, price, size } = req.body;
  const image = req.file ? req.file.filename : req.body.oldImage;
  const query = {
    where: {
      id: req.params.id,
    },
  };

  tblCars.update(
    {
      name,
      price,
      size,
      image,
    },
    query
  )
    .then(() => {
      res.status(200).json({
        message: "Car updated",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error updating car",
      });
    });
};

export const deleteCar = async (req, res) => {
  await deleteImage(req.params.id);
  tblCars.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({
        message: "Car deleted successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error deleting car",
      });
    });
};

//DIBUANG SAYANG
// LAST CODING

// // const tblCars = require("../models/userModels.js");
// import tblCars from "../models/userModels.js";
// // import bcrypt from "bcrypt";
// // import jwt from "jsonwebtoken";


// export const getCars = async(req, res) => {
//     try{
//         const Cars = await tblCars.findAll();
//         res.json(Cars);
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const addCars = async(req, res) => {
//     const {name, price, size, image} = req.body;
//     try{
//         await tblCars.create({
//             name : name,
//             price : price,
//             size : size,
//             image : image
//         });
//         res.json({msg : "Data Success Created"})
//     }catch (error) {
//         console.log(error);
//     }
// }

// // export const UploudFiles = async(req, res) => {
// //     const url = `/uploads/${req.file.filename}`;
// //     res
// //         .status(200)
// //         .json({ message: "Foto berhasil di-upload, silahkan cek URL", url });
// //     };

// // export const UploudOnMemory = async(req, res) => {
// //     const fileBase64 = req.file.buffer.toString("base64");
// //     const file = `data:${req.file.mimetype};base64,${fileBase64}`;

// //     cloudinary.uploader.upload(file, function (err, result) {
// //       if (!!err) {
// //         console.log(err);
// //         return res.status(400).json({
// //           message: "Gagal upload file!",
// //         });
// //       }

// //       res.status(201).json({
// //         message: "Upload image berhasil",
// //         url: result.url,
// //       });
// //     });
// //   }
  


// //STUCK IN HERE, FOR LOGIN 
// // export const Login = async(req, res) => {
// //     try {
// //         const user = await Users.findAll({
// //             where:{
// //                 email: req.body.email
// //             }
// //         });
// //         const match = await bcrypt.compare(req.body.password, user[0].password);
// //         if(!match) return res.status(400).json({msg: "Wrong Password"});
// //         const userId = user[0].id;
// //         const name = user[0].name;
// //         const email = user[0].email;
// //         const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
// //             expiresIn: '20s'
// //         });
// //         const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET,{
// //             expiresIn: '1d'
// //         });
// //         await Users.update({refresh_token: refreshToken},{
// //             where: {
// //                 id: userId  
// //             }
// //         });
// //         res.cookie('refreshToken', refreshToken,{
// //             httpOnly: true,
// //             maxAge: 24 * 60 * 60 * 1000
// //         });
// //         res.json({accessToken});
// //     }catch (error) {
// //         res.status(404).json({msg: "Email tidak ditemukan"});
// //     }
// // }
