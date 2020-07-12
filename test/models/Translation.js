module.exports = function(sequelize, DataTypes) {
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
