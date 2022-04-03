const {Router} = require('express')
const Post = require('../models/Post')
const User = require('../models/User')
const Comment = require('../models/Comment')
const router = Router()
const {check, validationResult} = require('express-validator')
const { find } = require('../models/Post')
const { findById } = require('../models/User')
const auth = require('../middlewares/auth.middleware')

router.post('/post', auth,
    [
      check('text', 'Your post have to contain text').exists(),
      check('title', 'Your post have to contain title').exists(),
    ],
    async(req, res)=>{
 try {
      const errors = validationResult(req)
      if(!errors.isEmpty()){
          return res.status(400).json({
            errors: errors.array(),
            message: "Invalid post data"
            })
        }

        const {author, text, title} = req.body
        const post = new Post({author, text, title, owner: author})
        const userId = req.user.userId
        const user = await User.findById(author)
        const updated = await User.findByIdAndUpdate(author, {posts: [...user.posts, post._id]})
        
        await post.save()
        res.status(201).json({message:'Post is created'})
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }
})
router.get('/getAllPosts',

    async(req, res)=>{
 try {
      const postsList  = await Post.find().populate({
        path: "comments", // populate blogs
        populate: {
           path: "replies" // in blogs, populate comments
        }
     }).exec()
    res.json({postsList})
    
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }
})

router.post('/comment', auth,
    [
      check('text', 'Your post have to contain text').exists(),
    ],
    async(req, res)=>{
 try {
      const errors = validationResult(req)
      if(!errors.isEmpty()){
          return res.status(400).json({
            errors: errors.array(),
            message: "Invalid comment data"
            })
        }
        const {text, replyFor} = req.body
        
        const userId = req.user.userId
        
        const comment = new Comment({author: userId, text, parentId: replyFor})
       
        const user = await User.findById(userId)
       
        const updated = await User.findByIdAndUpdate(userId, {comments: [...user.comments, comment._id]})

        const post = await Post.findById(replyFor)
        console.log('huy', replyFor)
        if(post){
            const updatedPost = await Post.findByIdAndUpdate(replyFor, {comments: [...post.comments, comment._id]})
        }
        const parentComment = await Comment.findById(replyFor)
        if(parentComment){
            const updatedComment = await Comment.findByIdAndUpdate(parentId, {replies: [...parentComment.replies, comment._id]})
        }
        
        await comment.save()
        res.status(201).json({message:'Comment is created'})
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }
})
module.exports = router;