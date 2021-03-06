const express = require('express')
const config = require('config') 
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json({extended:true}))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/blog', require('./routes/blog.routes'))



const PORT = config.get('port') || 5000

async function start(){
    try {
       await mongoose.connect(config.get('mongoUri'),{
           useNewUrlParser: true,
          
       })
       app.listen(5000, ()=>console.log(`App has been started on port ${5000}`)) 
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}
start()



