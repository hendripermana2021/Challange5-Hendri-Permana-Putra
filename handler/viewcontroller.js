import axios from "axios";
import moment from "moment";

export const listCars = (req, res) => {
  axios.get(`http://localhost:8000/cars`).then((response) => {
    const cars = response.data;
    cars.forEach((car) => {
      car.updatedAt = moment(car.updatedAt).format("DD MMM YYYY, HH:mm");
    });
    res.render("index", {
      cars,
      size: "all",
      page: "List Cars"
    });
  });
};

export const AddCar = (req, res) => {
  res.render("carForm", {
    page: "Add New Car",
    method: "POST",
    id: "",
    size: "",
    sizes: ["small", "medium", "large"],
    action: "addCar()",
  });
};

export const editCar = (req, res) => {
  axios.get(`http://localhost:8000/cars/${req.params.id}`).then((response) => {
    const car = response.data;
    res.render("carForm", {
      page: "Update Car Information",
      method: "PUT",
      id: req.params.id,
      car,
      size: "",
      sizes: ["small", "medium", "large"],
      action: `editCar(${req.params.id})`,
    });
  });
};

export const listCarsFilter = (req, res) => {
  axios.get(`http://localhost:8000/cars/filter/${req.params.size}`).then((response) => {
    const cars = response.data;
    const size = req.params.size;
    cars.forEach((car) => {
      car.updatedAt = moment(car.updatedAt).format("DD MMM YYYY, HH:mm");
    });
    res.render("index", {
      cars,
      size,
      page: `List Cars by Size: ${size[0].toUpperCase() + size.slice(1)}`,
    });
  });
};

export const listCarsByKeyword = (req, res) => {
  axios.get(`http://localhost:8000/cars/search/${req.params.keyword}`).then((response) => {
    const cars = response.data;
    const keyword = req.params.keyword;
    cars.forEach((car) => {
      car.updatedAt = moment(car.updatedAt).format("DD MMM YYYY, HH:mm");
    });
    res.render("index", {
      cars,
      keyword,
      size: "",
      page: `List Cars by Keyword: ${keyword}`,
    });
  });
};
