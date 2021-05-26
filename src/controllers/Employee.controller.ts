import express from "express";
import { DbPool } from "../lib/db/DbPool";
import { saveEmployee } from "../lib/framework/EmployeeImpl";
import { decoder } from "../lib/utility/Coders";

export const handleEmployee = async (
  request: express.Request,
  response: express.Response
) => {
  const body = JSON.stringify(request.body);
  try {
    const employee = await decoder(body, "Employee");
    const result = await saveEmployee(employee, DbPool.getPoolConnection());

    if (result.error) {
      console.log(`error saving employee ${result.error}`);
      response.status(400).set("Content-Type", "appliation/json").send(`{
            "message": "Decode error"
        }`);
    }
    console.log(`employee saved ${result}`);

    response.status(200).set("Content-Type", "appliation/json").send(`{
            "message": "Employee saved successfully"
        }`);
  } catch (err) {
    console.log(`Error in decoding employee ${err}`);
    response.status(400).set("Content-Type", "appliation/json").send(`{
            "message": "Decode error"
        }`);
  }
};
