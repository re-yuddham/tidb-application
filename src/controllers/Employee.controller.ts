import express from "express";
import { DbPool } from "../lib/db/DbPool";
import { saveEmployee, getAllEmployees } from "../lib/framework/EmployeeImpl";
import { decode } from "../lib/utility/Coders";
//import { getEmployeeQueryResult } from "../lib/utility/Utility";

const region = process.env.REGION;

export const handleEmployee = async (
  request: express.Request,
  response: express.Response
) => {
  const timeThen = new Date().getMilliseconds();
  const body = JSON.stringify(request.body);
  try {
    const employeeArr = await decode(body, "Employee");
    if (employeeArr.length > 0) {
      const result = await saveEmployee(
        employeeArr[0],
        DbPool.getPoolConnection(region)
      );

      if (result.error) {
        console.log(`error saving employee ${result.error}`);
        response.status(400).set("Content-Type", "appliation/json").send(`{
            "message": "Decode error"
        }`);
      }
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

export const getEmployees = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const result = await getAllEmployees(DbPool.getPoolConnection(region));

    if (result.error) {
      console.log(`error fetching employee ${result.error}`);
      response.status(400).set("Content-Type", "appliation/json").send(`{
            "message": "Decode error"
        }`);
    }

    const employees = await decode(JSON.stringify(result.result), "Employee");
    //console.log(result.result);
    //console.log(`employee fetched ${result.result.toString()}`);
    //getEmployeeQueryResult(result.result);

    response.status(200).set("Content-Type", "appliation/json").send(employees);
  } catch (err) {
    console.log(`Error in decoding employee ${err}`);
    response.status(400).set("Content-Type", "appliation/json").send(`{
            "message": "Decode error"
        }`);
  }
};
