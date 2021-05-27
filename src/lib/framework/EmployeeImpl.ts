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

export const getAllEmployees = (pool: mysql.Pool): Promise<DbResult> => {

  return new Promise((resolve, reject) => {

    pool.getConnection((err, connection) => {
      if (err) {
        reject(new Error("Connection error"));
      }
  
      connection.query(selectEmployeeStatement(), (error, result) => {
        connection.release();
        resolve({ error, result });
      });
    });
  });
};
