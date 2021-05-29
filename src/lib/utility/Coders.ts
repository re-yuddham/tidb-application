
 const keyList = [
  "id",
  "name",
  "experience",
  "age",
  "position",
  "reportsTo",
  "reports_to",
  "position_in_company",
];

export const encoder = (dbType: DbTypes) => {
  return `{
            "id": "${dbType.id}",
            "name": "${dbType.name}",
            "experience": "${dbType.experience}",
            "age": "${dbType.age}",
            "position": "${dbType.position}",
            "reportsTo": "${dbType.reportsTo}",
        }`;
};

export const decode = async(
  jsonString: string,
  dbType: string
): Promise<Employee[]> => {
  
  if(dbType === "Employee") {
    const parsed = await JSON.parse(jsonString);

    if(Array.isArray(parsed)) {
        if(!parsed.every(item => validateJSON(item, dbType))) {
          await Promise.reject(new Error("decoding error"));
        }

         const empArray =  parsed.map(item => {
          const emp: Employee = {
            id: item.id,
            name: item.name,
            experience: item.experience,
            age: item.age,
            position: item.position || item.position_in_company,
            reportsTo: item.reportsTo || item.reports_to,
          };
          return emp;
        });
        return empArray;
    }
    else {
      if(!validateJSON(parsed, dbType)) {
        await Promise.reject(new Error("decoding error"));
      }

      return [{
        id: parsed.id,
      name: parsed.name,
      experience: parsed.experience,
      age: parsed.age,
      position: parsed.position || parsed.position_in_company,
      reportsTo: parsed.reportsTo || parsed.reports_to,
      }];
    }

  }
  return [];
};


const validateJSON = (json: any, dbType: string): boolean => {
  
  if(dbType === "Employee") {
    if (Object.keys(json).length === 0) {
      return false;
    }

    const errorKeys = Object.keys(json).every(item => item in json);

    return errorKeys;
  }

  return false;
};
