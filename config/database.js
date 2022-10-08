import {Sequelize} from "sequelize";
// const Sequelize = require("sequelize");

const db = new Sequelize('db_cars','root','',{
    host : "localhost",
    dialect: "mysql"
});

export default db;