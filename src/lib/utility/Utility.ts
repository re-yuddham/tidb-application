import mysql from "mysql2";

export const createConnection = ({
  host,
  user,
  password,
  database,
}: mysql.ConnectionOptions) => {
  return mysql.createConnection({
    host,
    user,
    password,
    database,
  });
};