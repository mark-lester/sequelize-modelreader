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
