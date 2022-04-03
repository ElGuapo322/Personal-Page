const {Schema, model, Types} = require('mongoose').set('debug', true);

const schema = new Schema({
    created_at: {type:Date, default: Date.now()},
    parentId:{type: Types.ObjectId},
    author:{type: Types.ObjectId, ref: 'User'},
    text:{type: String, required:true},
    replies:[{type: Types.ObjectId, ref: 'Comment'}],
    likes:[{type: Types.ObjectId, ref: 'User'}],
 })
 
 module.exports = model('Comment', schema)