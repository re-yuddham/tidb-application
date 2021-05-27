import mysql from "mysql2";
import { DbResult } from "../db/DbResult";

export const getEmployeeInsertStatement = (employee: Employee) => {
  return `INSERT INTO employee(name, experience, age, position_in_company, reports_to) 
  VALUES("${employee.name}", ${employee.experience}, ${employee.age}, "${employee.position}", ${employee.reportsTo})`;
};

export const selectEmployeeStatement = () => {
  return `SELECT * FROM employee`;
};

/*export const getEmployeeQueryResult = (result: DbResult) => {
    result.forEach(item => {
      console.log(item);
    });
};*/