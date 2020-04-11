const request = require('supertest');
const app = require('../app');

const apiEndpoint = '/api/v1/on-covid-19';
const sampleReq = {
  region: {
    name: "Africa",
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: "days",
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
}

describe('Route /json test', () => {
  it('should respond 200 status code', async () => {
    const resp = await request(app)
      .post(apiEndpoint + '/json')
      .send(sampleReq);

    expect(resp.header['content-type']).toMatch(/application\/json/);
    expect(resp.statusCode).toBe(200);
  });
});

describe('Route /api/v1/on-covid-19/xml test', () => {
  it('should respond with text/xml mime type', async () => {
    const resp = await request(app)
      .post(apiEndpoint + '/xml')
      .send(sampleReq);

    expect(resp.header['content-type']).toMatch(/application\/xml/);
  });
});

describe('Route /api/v1/on-covid-19/logs test', () => {
  it('should respond with text/html mime type', async () => {
    const resp = await request(app)
      .get(apiEndpoint + '/logs');
    expect(resp.header['content-type']).toMatch(/text\/plain/);
  });
});