const requireDir=require('require-dir')
const path = require('path');
const _ = require('underscore');
const DEFAULT_DIRECTORY='./models'

module.exports=(Sequelize)=>{

Sequelize=Sequelize || require('sequelize')

class Extended extends Sequelize {

/*
constructor(connect,options){
	super(connect,options)
	this.loadModels(options)
	return this
}
*/


loadModels(modeldir,DataTypes){
	var factories= requireDir(modeldir || DEFAULT_DIRECTORY)
	var defs=this.manufactureDefinitions(factories,DataTypes||this.DataTypes)
	this.defineModels(defs)
	this.relateModels(defs)
}

manufactureDefinitions(factories,datatypes){
	var defs={}
	_.each(factories,(factory,model_name)=>{
		var def= typeof factory  =='function' ? factory(this,datatypes) : factory
		defs[model_name]=def
	})
	return defs
}

defineModels(defs){
	_.each(defs,((def,model_name)=>{
		var model
		def.timestamps = def.timestamps ? true : false
		try {
			model=this.define(model_name,def.attributes,{indexes:def.indexes,timestamps:def.timestamps})
		} catch (err) {
			throw new Error("Bad model definition execution: "+
				err+
				". Attributes="+JSON.stringify(def.attributes)+
				". In model "+full_name)
		}
	}).bind(this))
}
		
relateModels(defs){
	_.each(defs,((def,name)=>{
		var model=this.models[name]
		if (!Array.isArray( def.relations ))
			def.relations=[def.relations]

		if (!def.relations)
			return

		def.relations.forEach((rel)=>{
			if (typeof rel != 'object'){
				throw new Error("Bad relation definition "+JSON.stringify(rel)+". In model "+name)
			}
			if (typeof model[rel.type] != 'function'){
				throw new Error("Bad relation, missing method for type "+JSON.stringify(rel)+". In model "+name)
			}

			var target=this.models[rel.relatedModel]
			if (!target){
				throw new Error("Missing relatedModel "+JSON.stringify(rel)+". In model "+name)
			}
			var options={}
			if (rel.key)
				options.through=rel.key
			if (rel.as)
				options.as=rel.as

			try {
				model[rel.type](target, options)
			} catch (err) {
				throw new Error("Bad relation execution: "+ err+
					". Relation="+ JSON.stringify(rel)+
					". In model " +name)
			}
		})
	}).bind(this))
}

}//class

return Extended
}//module.exports
