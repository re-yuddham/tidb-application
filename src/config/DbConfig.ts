export const getDbConfig = (region: string) => {

  if(region === "IND" || region === "EU") {
    return {
      host: "localhost",
      user: "root",
      port: 4000,
      password: "",
      database: "company",
    };
  } 
  return {
    host: "localhost",
    user: "root",
    port: 4001,
    password: "",
    database: "company",
  };
};
