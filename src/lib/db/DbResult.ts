import mysql from "mysql2";

export class DbResult {
  error: mysql.QueryError;
  result:
    | mysql.RowDataPacket[]
    | mysql.RowDataPacket[][]
    | mysql.OkPacket
    | mysql.OkPacket[]
    | mysql.ResultSetHeader;
}
