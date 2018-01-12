'use strict';
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '.env')});
const describe = require('mocha').describe;
const it = require('mocha').it;
const EtxtApi = require('../index');
const chai = require('chai');
const moment = require('moment');

chai.should();
const api = new EtxtApi({ pass: process.env.ETXT_PASS, token: process.env.ETXT_TOKEN });

const checkSaneResult = result => {
  result.should.not.equal('Настройки пользователя для работы с API не верны');
  result.should.not.equal('Подпись не верна');
};

const taskIds = [];

describe('categories', () => {
  describe('listCategories', () => {
    it('should return list of categories', done => {
      api.listCategories()
        .then(categories => {
          checkSaneResult(categories);
          categories = JSON.parse(categories);
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

          tasks = JSON.parse(tasks);
          Object.keys(tasks).forEach(idx => {
            taskIds.push(parseInt(tasks[idx].id));
          });

          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });

  describe('saveTask', () => {
    it('shoud return task id', done => {
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
          task = JSON.parse(task);
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });

  describe('getResults', () => {
    it('should return task result', done => {
      api.getTaskResult({id: taskIds})
        .then(result => {
          checkSaneResult(result);
          result = JSON.parse(result);
          done();
        }).catch(err => {
          done(err);
        });
    });
  });
});
