import express from "express";
import { handleEmployee, getEmployees } from "./controllers/Employee.controller";

const app = express();

const port = process.env.PORT || 8080;

const region = process.env.REGION;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/employee", handleEmployee);

app.get("/employee", getEmployees);

app.listen(port, () => {
  console.log(`server started on ${port} region : ${region}`);
});
