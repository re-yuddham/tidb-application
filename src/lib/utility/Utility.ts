import mysql from "mysql2";
import { DbResult } from "../db/DbResult";
import { Filter } from "../db/Filter";

export const getEmployeeInsertStatement = (employee: Employee) => {
  return `INSERT INTO employee(name, experience, age, position_in_company, reports_to) 
  VALUES("${employee.name}", ${employee.experience}, ${employee.age}, "${employee.position}", ${employee.reportsTo})`;
};

export const selectEmployeeStatement = (columns: string[], filters: Filter[]) => {

  const effectiveColumns = columns.reduce((prev, curr)=> prev+`, ${curr}`, "");

  const cols = effectiveColumns === "" ? "*" : effectiveColumns;

  const filts = () => {
    if(filters.length > 0) {
      return filters.reduce((prev, curr)=> prev + `${curr.toString()}`,"WHERE ");
    }
    return ""; 
  };

  console.log(`SELECT ${cols} FROM employee ${filts()}`);

  return `SELECT ${cols} FROM employee ${filts()}`;
};

/*export const getEmployeeQueryResult = (result: DbResult) => {
    result.forEach(item => {
      console.log(item);
    });
};*/