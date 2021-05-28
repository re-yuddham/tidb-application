import express from "express";
import { DbPool } from "../lib/db/DbPool";
import { saveEmployee, getAllEmployees } from "../lib/framework/EmployeeImpl";
import { decoder } from "../lib/utility/Coders";
//import { getEmployeeQueryResult } from "../lib/utility/Utility";

const region = process.env.REGION;

export const handleEmployee = async (
  request: express.Request,
  response: express.Response
) => {
  const timeThen = new Date().getMilliseconds();
  const body = JSON.stringify(request.body);
  try {
    const employee = await decoder(body, "Employee");
    const result = await saveEmployee(employee, DbPool.getPoolConnection(region));

    if (result.error) {
      console.log(`error saving employee ${result.error}`);
      response.status(400).set("Content-Type", "appliation/json").send(`{
            "message": "Decode error"
        }`);
    }

    response.status(200).set("Content-Type", "appliation/json").send(`{
            "message": "Employee saved successfully"
        }`);
    
        const timeNow = new Date().getMilliseconds();
        console.log(`time spent in request ${timeNow - timeThen}`);
  } catch (err) {
    console.log(`Error in decoding employee ${err}`);
    response.status(400).set("Content-Type", "appliation/json").send(`{
            "message": "Decode error"
        }`);
  }
};



/*export const getEmployees = async(request: express.Request, response: express.Response) => {

  try {
    const result = await getAllEmployees(DbPool.getPoolConnection());

    if (result.error) {
      console.log(`error fetching employee ${result.error}`);
      response.status(400).set("Content-Type", "appliation/json").send(`{
            "message": "Decode error"
        }`);
    }
    //console.log(result.result);
    console.log(`employee fetched ${result}`);
    //getEmployeeQueryResult(result.result);

    response.status(200).set("Content-Type", "appliation/json").send(`{
            "message": "Employee fetched successfully"
        }`);
  } catch (err) {
    console.log(`Error in decoding employee ${err}`);
    response.status(400).set("Content-Type", "appliation/json").send(`{
            "message": "Decode error"
        }`);
  }
}*/
