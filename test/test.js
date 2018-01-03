'use strict';
require('dotenv').config();
const EtxtApi = require('../index').EtxtApi;

describe('tasks.listTasks', () => {
  it('should return IListTasksResultItem[]', (done) => {
    const api = new EtxtApi({ pass: process.env.ETXT_PASS, token: process.env.ETXT_TOKEN });
    api.listTasks().then(result => {
      console.log(result);
      done();
    });
  });
});
