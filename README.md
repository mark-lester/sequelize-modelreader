# sequelize-modelreader
Model reader for Sequelize

## Usage
const { Sequelize, Model, DataTypes } = require("sequelize");
const SequelizeExtended = require('../index')(Sequelize);
const sequelize=new SequelizeExtended('postgres://mcl:cantona@localhost:5432/test')
sequelize.loadModels('./test/models',DataTypes)
