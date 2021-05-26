export const getEmployeeInsertStatement = (employee: Employee) => {
  return `INSERT INTO employee(id, name, experience, age, position_in_company, reports_to) 
  VALUES(${employee.id}, "${employee.name}", ${employee.experience}, ${employee.age}, "${employee.position}", ${employee.reportsTo})`;
};

export const selectEmployeeStatement = () => {
  return `SELECT * FROM employee`;
};
