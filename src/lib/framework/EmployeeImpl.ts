import mysql from "mysql2";
import { DbResult } from "../db/DbResult";
import {
  getEmployeeInsertStatement,
  selectEmployeeStatement,
} from "../utility/Utility";

export const saveEmployee = (
  employee: Employee,
  pool: mysql.Pool
): Promise<DbResult> => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err || !connection.query) {
        reject(new Error("Connection error"));
      }

      connection.query(
        getEmployeeInsertStatement(employee),
        (error, result) => {
          connection.release();
          resolve({ error, result });
        }
      );
    });
  });
};

export const getEmployees = (pool: mysql.Pool) => {
  pool.getConnection((err, connection) => {
    if (err) {
      Promise.reject(new Error("Connection error"));
    }

    connection.query(selectEmployeeStatement(), (err, result) => {
      connection.release();
      Promise.resolve({ err, result });
    });
  });
};
