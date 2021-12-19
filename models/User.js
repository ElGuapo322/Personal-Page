const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
   email:{type: String, required:true, unique: true},
   password:{type: String, required: true},
   name:{type: String, required:true},
   lastName:{type: String, required:true},
//    comments:[{type: Types.ObjectId, ref: 'Comments'}],
//    likedPosts:[{type: Types.ObjectId, ref:'Post'}],
//    likedComments:[{type: Types.ObjectId, ref: 'Comments'}]
})

module.exports = model('User', schema)