const Joi = require('@hapi/joi');

module.exports = Joi.object({
  region: Joi.object(),
  periodType: Joi.string(),
  timeToElapse: Joi.number(),
  reportedCases: Joi.number().min(1),
  population: Joi.number().min(1),
  totalHospitalBeds: Joi.number()
});