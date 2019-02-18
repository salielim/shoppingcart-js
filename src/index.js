'use strict';

const app = require('./app');
const PORT = 8080;

app.listen(PORT, () =>
  console.log(`Application is up and running on port ${PORT}!`),
);
