const {Schema, model, Types} = require('mongoose').set('debug', true);

const schema = new Schema({
   email:{type: String, required:true, unique: true},
   password:{type: String, required: true},
   name:{type: String, required:true},
   lastName:{type: String, required:true},
   comments:[{type: Types.ObjectId, ref: 'Comment'}],
   role:{type: String, required:true, default:'user'},
   posts:[{
      type: Schema.Types.ObjectId,
      ref: "Post"
   }],
   likedPosts:[{type: Types.ObjectId, ref:'Post'}],
   likedComments:[{type: Types.ObjectId, ref: 'Comment'}],
})

module.exports = model('User', schema)