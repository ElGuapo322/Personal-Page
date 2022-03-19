const {Schema, model, Types} = require('mongoose').set('debug', true);

const schema = new Schema({
    author:{type: Types.ObjectId, ref: 'User'},
    title:{type: String, required:true},
    text:{type: String, required:true},
    comments:[{type: Types.ObjectId, ref: 'Comments'}],
    likes:[{type: Types.ObjectId, ref: 'User'}],
 })
 
 module.exports = model('Post', schema)