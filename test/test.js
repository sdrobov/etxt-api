'use strict';
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '.env')});
const describe = require('mocha').describe;
const it = require('mocha').it;
const EtxtApi = require('../index').EtxtApi;
const chai = require('chai');

chai.should();
const api = new EtxtApi({ pass: process.env.ETXT_PASS, token: process.env.ETXT_TOKEN });

describe('tasks', () => {
  describe('listTasks', () => {
    it('should return IListTasksResultItem[]', done => {
      api.listTasks()
        .then(result => {
          result.should.not.equal('Настройки пользователя для работы с API не верны');
          result.should.not.equal('Подпись не верна');
          console.log(result);
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });

  describe('saveTask', () => {
    it('shoud return ISaveTaskResult', done => {
      api.saveTask({})
        .then(result => {
          result.should.not.equal('Настройки пользователя для работы с API не верны');
          result.should.not.equal('Подпись не верна');
          console.log(result);
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });
});
