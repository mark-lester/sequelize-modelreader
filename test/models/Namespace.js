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

