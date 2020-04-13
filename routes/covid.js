var express = require('express');
var xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');

var requestSchema = require('../schemas/request');
const estimator = require('../util/estimator');

var router = express.Router();

var builder = new xml2js.Builder({
  xmldec: {
    encoding: 'UTF-8'
  }
});

/* GET main endpoint. */
router.post('/:mimeType?', async function (req, res, next) {
  const mimeType = req.params.mimeType || 'json';
  try {
    await requestSchema.validateAsync(req.body);
    const resp = estimator(req.body);
    
    if (mimeType == 'json') {
      res.json(resp);
    } else if (mimeType == 'xml') {
      res.set('Content-Type', 'application/xml');
      res.send(builder.buildObject(resp));
    } else {
      return next(new Error('Invalid mime type argument'));
    }
  } catch (err) {
    next(err);
  }
});

/* GET logs. */
router.get('/logs', function (req, res, next) {
  fs.readFile(
    path.join(__dirname, '..', 'access.txt'),
    // 'r',
    function (err, data) {
      res.set('Content-Type', 'text/plain');
      res.send(data.toString());
    }
  );
});

module.exports = router;
