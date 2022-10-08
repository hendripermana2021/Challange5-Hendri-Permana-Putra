import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } = Sequelize;

const tblCars = db.define('cars',{
    name:{
        type: DataTypes.STRING
    },
    price:{
        type: DataTypes.INTEGER
    },
    size:{
        type: DataTypes.STRING
    },
    image:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true
});

export default tblCars;

