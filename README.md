# sequelize-modelreader
Model reader for Sequelize

## Usage
```bash
npm install sequelize-modelreader

const { Sequelize, Model, DataTypes } = require("sequelize");
const SequelizeExtended = require('sequelize-modelreader')(Sequelize);
const sequelize=new SequelizeExtended('postgres://test:test@localhost:5432/test')
sequelize.loadModels('./test/models',DataTypes)
