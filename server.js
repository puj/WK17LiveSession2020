import express, { request } from 'express';
import csvtojson from 'csvtojson';

const csvFilePath = './data/cwurData.csv';
const ERROR_RANKINGS_NOT_FOUND = { error: 'No ranking results were found.' };

let rankings = [];
csvtojson()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    rankings = jsonObj;
    console.log(jsonObj.length);
  });

const app = express();

// app.get('/', (request, response) => {
//   response.send('Hello API! I hope this API has good documentation!');
// });

app.get('/rankings', (request, response) => {
  response.json(rankings);
});

app.get('/rankings/:name', (request, response) => {
  const { name } = request.params;
  const filteredRankings = rankings.filter(
    (ranking) => ranking.institution === name
  );

  if (filteredRankings.length === 0) {
    response.status(404).json(ERROR_RANKINGS_NOT_FOUND);
  } else {
    response.json(filteredRankings);
  }
});

app.get('/rankings/:year/ranks/:rank', (request, response) => {
  const { year, rank } = request.params;
  const ranking = rankings.find(
    (ranking) => +ranking.year === +year && +ranking.world_rank === +rank
  );

  if (!ranking) {
    response.status(404).json(ERROR_RANKINGS_NOT_FOUND);
  } else {
    response.json(ranking);
  }
});

// localhost:8080/rankings/2013/universities?country=China
app.get('/rankings/:year/universities', (request, response) => {
  const { year } = request.params;
  const { country } = request.query;

  let filteredRankings = rankings;

  filteredRankings = filteredRankings.filter(
    (ranking) => +ranking.year === +year
  );

  filteredRankings = filteredRankings.filter(
    (ranking) => ranking.country === country
  );

  if (filteredRankings.length === 0) {
    response.status(404).json(ERROR_RANKINGS_NOT_FOUND);
  } else {
    response.json(filteredRankings);
  }
});

app.listen(8080, () => {
  console.log('Hello console, the server is now running.');
});
