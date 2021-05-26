import mysql from "mysql2";
import { getDbConfig } from "../../config/DbConfig";

export class DbPool {
  private static poolConnection: mysql.Pool;

  private constructor() {}

  public static getPoolConnection() {
    if (!this.poolConnection) {
      const { host, user, port, password, database } = getDbConfig();
      this.poolConnection = mysql.createPool({
        host,
        user,
        port,
        password,
        database,
        connectionLimit: 10,
      });
    }

    return this.poolConnection;
  }
};