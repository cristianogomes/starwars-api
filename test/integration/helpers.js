const chai = require('chai');
const chaiHttp = require('chai-http');
const httpStatus = require('http-status');
const app = require('../../src/config/express');
const should = chai.should();
chai.use(chaiHttp);

global.app = app;
global.chai = chai;
global.expect = chai.expect;
global.httpStatus = httpStatus;
