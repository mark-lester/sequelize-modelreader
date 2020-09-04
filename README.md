# sequelize-modelreader
Model reader for Sequelize
Loads models and performs performs relationship operations

## Usage
```
npm install sequelize-modelreader

const { Sequelize, Model, DataTypes } = require("sequelize");
const SequelizeExtended = require('sequelize-modelreader')(Sequelize);
const sequelize=new SequelizeExtended('postgres://test:test@localhost:5432/test')
sequelize.loadModels('./test/models',DataTypes)
``````
## Examples
```
//Phase.js
module.exports = function(sequelize, DataTypes) {
  return  {
	  attributes:{
		key: { type: DataTypes.STRING(1024), allowNull: false, unique: true, unique:"defaultPrimary" },
		language: { type: DataTypes.STRING(8), allowNull: false,unique:true, unique:"defaultPrimary"},
		source: { type: DataTypes.STRING(256), allowNull: false  },
		singlar: { type: DataTypes.BLOB, allowNull: false },
		plural: { type: DataTypes.BLOB, allowNull: false },
		empty: { type: DataTypes.BLOB, allowNull: false },
	},
	relations:[{
		relatedModel:'Namespace',
		type:'hasMany',
	},{
		relatedModel:'Translation',
		type:'hasMany',
	}]
  }
}

//Namespace
module.exports = function(sequelize, DataTypes) {
  return  {
	  attributes:{
		namespace: { type: DataTypes.TEXT(64), allowNull: false, primaryKey: true, },
		context: { type: DataTypes.BLOB, allowNull: false },
	},
	relations:[{
		relatedModel:'Phrase',
		type:'hasMany',
	},{
		relatedModel:'Translation',
		type:'hasMany',
	}]
  }
}

//Tranmodule.exports = function(sequelize, DataTypes) {
  return  {
	  attributes:{
		language: { type: DataTypes.STRING(8), allowNull: false,unique:true, unique:"defaultPrimary"},
		source: { type: DataTypes.STRING(256), allowNull: false  },
		singlar: { type: DataTypes.BLOB, allowNull: false },
		plural: { type: DataTypes.BLOB, allowNull: false },
		empty: { type: DataTypes.BLOB, allowNull: false },
	},
	relations:[{
		relatedModel:'Phrase',
		type:'belongsTo',
	},{
		relatedModel:'Namespace',
		type:'belongsTo',
	}]
  }
}



```
