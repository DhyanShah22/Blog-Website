const express = require('express')
const mongoose = require('mongoose')
const Article = require('./Models/articleModels')
const articleRouter = require('./Routes/articleRoutes')
const methodOverride = require('method-override')
const app = express()
require('dotenv').config()



app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

mongoose.connect(process.env.MONG_URI) 
    .then( () => {
        app.listen((process.env.PORT) ,() => {
            console.log('Connected to DB and listening to port ', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })