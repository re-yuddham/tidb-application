const uuid = require("uuid");
const loadtest = require("loadtest");
const positions = [
  "Manager",
  "Developer",
  "Scrum-Master",
  "Architect",
  "Product-Owner",
  "Vice-President",
  "Associate-Developer",
];

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const getRandomPosition = () => {
  return positions[randomIntFromInterval(0, positions.length - 1)];
};

function generateEmployee() {
  const name = "Dave" + uuid.v4();
  const position = getRandomPosition();
  const age = randomIntFromInterval(21, 60);
  const experience = age - 21;
  const reportsTo = randomIntFromInterval(0, 100000);

  return {
    id: "123",
    name,
    position,
    age,
    experience,
    reportsTo,
  };
}

const regions = [
  {
    url: "http://localhost:8080",
    region: "IND",
  },
  {
    url: "http://localhost:8081",
    region: "USA",
  },
  {
    url: "http://localhost:8082",
    region: "EU",
  },
];

const regionToTest = regions;

const options = regionToTest.map((region) => {
  return {
    url: "http://localhost:8080/employee",
    concurrency: 10,
    method: "POST",
    body: generateEmployee(),
    maxRequests: 100,
    contentType: "application/json",
  };
});

options.forEach(option => loadtest.loadTest(option, (error, results) => {
  if (error) {
    return console.error("Got an error: %s", error);
  }
  console.log(results);
  console.log("Tests run successfully");
}));
