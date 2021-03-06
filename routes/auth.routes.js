const {Router} = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const router = Router()
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middlewares/auth.middleware')
const { findById } = require('../models/User')

// /api/auth/register
router.post(
    '/register',
    [
      check('email', "Invalid email").isEmail(),
      check('password', "Invalid password").isLength({min:6}),
      check('name', "Name is required").exists(),
      check('lastName', "Last name is required").exists()
    ],
     async(req, res)=>{
try {
    console.log('Body',req.body)
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array(),
            message: "Invalid registration data"
        })
    }
    const {email, password, name, lastName} = req.body

    const candidate = await User.findOne({email})
    if(candidate){
        return res.status(400).json({message: 'User with this email already exist'})
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({name, lastName, email, password: hashedPassword})
     await user.save()
   
    res.status(201).json({message:'User is created'})

} catch (e) {
    res.status(500).json({message: 'Something went wrong'})
}

})

// /api/auth/login
router.post('/login',
    [
      check('email', 'Please, input correct email').normalizeEmail().isEmail(),
      check('password', 'Input password').exists(),
    ],
    async(req, res)=>{
 try {
      const errors = validationResult(req)
      if(!errors.isEmpty()){
          return res.status(400).json({
            errors: errors.array(),
            message: "Invalid login data"
            })
        }

        const {email, password} = req.body
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({message:"User does not exist"})
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({message:"Incorrect password, try again"})
        }
        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn:'1h'}
        )
        res.json({token, userId: user.id})

    
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }
})
router.get('/getUser', auth,
    
    async(req, res)=>{
 try {
     const userId = req.user.userId
     const user = await User.findById(userId).populate("posts").exec()
     res.json({user})
 
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }
})

module.exports = router