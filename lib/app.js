const express = require('express');
const parser = require('body-parser');
const mw = require('./matrix-weight');

const app = express();

app.use(parser.json());

app.post('/', (req, res) => {
  const path = mw.findPath(req.body);
  const weight = mw.getPathWeight(path);

  res.json({
    path: path,
    weight: weight
  });
});

exports.app = app;
