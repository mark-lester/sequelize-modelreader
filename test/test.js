const { Sequelize, Model, DataTypes } = require("sequelize");
const SequelizeExtended = require('../index')(Sequelize);
const sequelize=new SequelizeExtended('postgres://mcl:cantona@localhost:5432/test')
sequelize.loadModels('./test/models',DataTypes)

var assert = require('assert');
describe('Load', function () {
	describe('Test Table', function () {
		it('Should exist', function () {
			assert.equal(sequelize.models['Namespace'].name,'Namespace')
			assert.equal(sequelize.models['Phrase'].name,'Phrase')
			assert.equal(sequelize.models['Translation'].name,'Translation')
		});
	});
});

