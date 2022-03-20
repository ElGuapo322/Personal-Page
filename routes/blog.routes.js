const {Router} = require('express')
const Post = require('../models/Post')
const User = require('../models/User')
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
      const postsList  = await Post.find()
    res.json({postsList})
    
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }
})

module.exports = router;