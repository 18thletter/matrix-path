const mw = require('./lib/matrix-weight');
const test = require('tape');
const request = require('supertest');
const server = require('./lib/app');

const matrix = [
  [8,9,7,6,7],
  [0,6,1,3,5],
  [8,6,4,2,3],
  [2,5,1,1,4],
  [0,0,1,1,9]
];

test('we can build a pre-computed matrix of weights', (t) => {
  const weights = mw.buildWeightMatrix(matrix);
  t.deepEqual(weights, [
    [8,9,7,6,7],
    [8,13,7,9,11],
    [16,13,11,9,12],
    [15,16,10,10,13],
    [15,10,11,11,19]
  ]);

  t.end();
});

test('we can get the path from a matrix and its computed weights', (t) => {
  const path = mw.findPath(matrix);
  t.deepEqual(path, [6,1,2,1,0]);

  t.end();
});

test('we can calculate the total weight from a path', (t) => {
  const weight = mw.getPathWeight([16,2,0,12,6,8]);
  t.equal(weight, 44);

  t.end();
});

test('we can get the minimum path and weight from an API endpoint', (t) => {
  request(server.app).post('/')
    .send(matrix)
    .expect('Content-Type', /json/)
    .expect(200, {
      path: [6,1,2,1,0],
      weight: 10
    })
    .end((err, res) => {
      if (err) throw err;
      t.pass('Got a valid response validated by supertest');
    });

  t.end();
});
