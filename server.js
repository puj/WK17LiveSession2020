import express, { request } from "express";
import csvtojson from "csvtojson";

const app = express();

const ERROR_UNIVERSITY_NOT_FOUND = { error: "University not found" };

// Load the data from the CSV
let universities = [];
csvtojson()
  .fromFile("cwurData.csv")
  .then((json) => {
    universities = json;
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (request, response) => {
  response.send("Hello API! I hope this API has good documentation!");
});

app.get("/rankings", (request, response) => {
  response.json(universities);
});

app.get("/rankings/:year/universities", (request, response) => {
  const { year } = request.params;
  const { country, minimumScore, sortBy } = request.query;
  let filteredUniversities = universities;
  if (year) {
    filteredUniversities = filteredUniversities.filter(
      (university) => +university.year === +year
    );
  }
  if (country) {
    filteredUniversities = filteredUniversities.filter(
      (university) => university.country === country
    );
  }
  if (minimumScore) {
    filteredUniversities = filteredUniversities.filter(
      (university) => +university.score > +minimumScore
    );
  }

  if (sortBy) {
    filteredUniversities.sort((a, b) => a[sortBy] - b[sortBy]);
  }

  response.json(filteredUniversities);
});

app.get("/rankings/:year/ranks/:rank", (request, response) => {
  const { year, rank } = request.params;
  const university = universities.find(
    (university) =>
      +university.world_rank === +rank && +university.year === +year
  );

  if (!university) {
    response.status(404).json(ERROR_UNIVERSITY_NOT_FOUND);
  } else {
    response.json(university);
  }
});

app.get("/rankings/:name", (request, response) => {
  const { name } = request.params;
  const filteredUniversities = universities.filter(
    (university) => university.institution === name
  );

  if (filteredUniversities.length === 0) {
    response.status(404).json(ERROR_UNIVERSITY_NOT_FOUND);
  } else {
    response.json(filteredUniversities);
  }
});

app.listen(8080, () => {
  // The server has started, what should it do now?
  console.log("Hello console, the server is now running.");
});
