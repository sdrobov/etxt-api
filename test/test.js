'use strict';
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '.env')});
const describe = require('mocha').describe;
const it = require('mocha').it;
const EtxtApi = require('../index').EtxtApi;
const chai = require('chai');
const moment = require('moment');

chai.should();
const api = new EtxtApi({ pass: process.env.ETXT_PASS, token: process.env.ETXT_TOKEN });

const checkSaneResult = result => {
  result.should.not.equal('Настройки пользователя для работы с API не верны');
  result.should.not.equal('Подпись не верна');
};

describe('categories', () => {
  describe('listCategories', () => {
    it('should return list of categories', done => {
      api.listCategories()
        .then(categories => {
          checkSaneResult(categories);
          console.log(JSON.parse(categories));
          done();
        }).catch(err => {
          done(err);
        });
    });
  });
});

describe('tasks', () => {
  describe('listTasks', () => {
    it('should return list of tasks', done => {
      api.listTasks()
        .then(tasks => {
          checkSaneResult(tasks);
          console.log(JSON.parse(tasks));
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });

  describe('saveTask', () => {
    it('shoud return ISaveTaskResult', done => {
      api.saveTask({
        public: 0,
        title: 'test task',
        description: 'test task description',
        text: 'test task text',
        price: 1.0,
        price_type: 2,
        whitespaces: 0,
        deadline: moment().add(20, 'd').format('DD.MM.YYYY'),
        id_category: 513
      })
        .then(task => {
          checkSaneResult(task);
          console.log(JSON.parse(task));
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });
});
