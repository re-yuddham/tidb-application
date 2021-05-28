import mysql from "mysql2";
import { getDbConfig } from "../../config/DbConfig";

export class DbPool {
  private static poolConnection: mysql.Pool;

  private constructor() {}

  public static getPoolConnection(region: string) {
    if (!this.poolConnection) {
      const { host, user, port, password, database } = getDbConfig(region);
      this.poolConnection = mysql.createPool({
        host,
        user,
        port,
        password,
        database,
        connectionLimit: 50,
      });
    }

    return this.poolConnection;
  }
}
